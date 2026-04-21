import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../api/axiosInstance";
import { motion, AnimatePresence } from "framer-motion";

import {
  getDashboard,
  updateProfile,
  changeProfilePhoto,
  sendNewEmailOtp,
  verifyNewEmailOtp,
  verifyOldEmailOtp,
} from "../../api/authApi";

export default function Profile() {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const SPECIALIZATIONS = [
    "General Physician",
    "Cardiologist",
    "Dermatologist",
    "Neurologist",
    "Orthopedic",
    "Pediatrician",
    "Gynecologist",
    "Psychiatrist",
    "Ophthalmologist",
    "ENT Specialist",
    "Urologist",
    "Oncologist",
    "Endocrinologist",
    "Gastroenterologist",
    "Pulmonologist",
    "Nephrologist",
    "Rheumatologist",
    "Hematologist",
    "Allergist / Immunologist",
    "Anesthesiologist",
    "Radiologist",
    "Pathologist",
    "Plastic Surgeon",
    "Neurosurgeon",
    "Cardiothoracic Surgeon",
    "General Surgeon",
    "Dentist",
    "Prosthodontist",
    "Periodontist",
    "Orthodontist",
    "Oral Surgeon",
    "Sports Medicine",
    "Pain Management",
    "Geriatrician",
    "Sleep Specialist",
    "Emergency Medicine",
    "Rehabilitation Medicine",
    "Critical Care Specialist",
  ];

  const QUALIFICATIONS = [
    "MBBS",
    "MD",
    "MS",
    "DM",
    "MCh",
    "DNB",
    "BDS",
    "MDS ",
    "BAMS (Ayurveda)",
    "BHMS (Homeopathy)",
    "BUMS (Unani Medicine)",
    "BNYS (Naturopathy & Yoga)",
    "BPT",
    "MPT",
    "BPharm",
    "MPharm",
    "PharmD",
    "DGO",
    "DCH",
    "DA",
    "DTCD",
    "DOMS",
    "DLO",
    "DPM",
    "MSc Nursing",
    "BSc Nursing",
    "ANM",
    "GNM",
  ];

  const [bioSuggestions, setBioSuggestions] = useState([]);
  const [aboutSuggestions, setAboutSuggestions] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);

  const [tab, setTab] = useState("personal");
  const [profileImg, setProfileImg] = useState(null);
  const [loading, setLoading] = useState(false);

  const [emailPopup, setEmailPopup] = useState(false);
  const [emailStep, setEmailStep] = useState(1);

  const [newOtp, setNewOtp] = useState("");
  const [oldOtp, setOldOtp] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    gender: "",
    dob: "",
    specialization: [],
    experience: "",
    city: "",
    state: "",
    clinicAddress: "",
    clinicLocation: "",
    qualification: [],
    medicalRegNumber: "",
    clinicName: "",
    consultationFee: "",
    zipCode: "",
    bio: "",
    availableDays: [],
    onlineConsultation: false,
    startTime: "",
    endTime: "",
    about: "",
    email: "",
  });

  // FETCH PROFILE
  const fetchProfile = async () => {
    try {
      const data = await getDashboard();

      const doctor = data.doctor || data;

      setFormData({
        fullName: doctor.fullName || "",
        phone: doctor.phone || "",
        gender: doctor.gender || "",
        dob: doctor.dob ? doctor.dob.split("T")[0] : "",
        specialization: doctor.specialization || [],
        experience: doctor.experience || "",
        city: doctor.city || "",
        state: doctor.state || "",
        clinicAddress: doctor.clinicAddress || "",
        clinicLocation: doctor.clinicLocation || "",
        qualification: doctor.qualification || [],
        medicalRegNumber: doctor.medicalRegNumber || "",
        clinicName: doctor.clinicName || "",
        consultationFee: doctor.consultationFee || "",
        zipCode: doctor.zipCode || "",
        bio: doctor.bio || "",
        availableDays: doctor.availableDays || [],
        onlineConsultation: doctor.onlineConsultation || false,
        startTime: doctor.startTime || "",
        endTime: doctor.endTime || "",
        about: doctor.about || "",
        email: doctor.email || "",
      });

      if (doctor.profilePhoto) {
        setProfileImg(doctor.profilePhoto);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // CHANGE IMAGE
  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setProfileImg(URL.createObjectURL(file));

    try {
      const data = new FormData();
      data.append("profilePhoto", file);

      setLoading(true);

      await changeProfilePhoto(data);

      toast.success("Profile photo updated");
    } catch (err) {
      toast.error(err.message || "Photo update failed");
    } finally {
      setLoading(false);
    }
  };

  const removeItem = (field, item) => {
    const updated = formData[field].filter((i) => i !== item);
    handleChange(field, updated);
  };

  const MAX_WORDS = 80;

  const handleWordLimit = (key, text) => {
    const words = text.trim().split(/\s+/);

    if (words.length <= MAX_WORDS) {
      handleChange(key, text);
    } else {
      toast.error("Maximum 80 words allowed");
    }
  };

  const generateAI = async (field) => {
    try {
      setAiLoading(true);

      // 👇 ONLY use manual input if user actually typed something
      const userTypedText =
        field === "bio" ? formData.bio?.trim() : formData.about?.trim();

      let promptText;

      if (userTypedText) {
        // 🧠 enhance user input only
        promptText = `
Improve and rewrite this ${field} professionally:

"${userTypedText}"

Rules:
- Max 80 words
- Professional medical tone
- Keep meaning same but better structured
- Improve grammar and structure
`;
      } else {
        // 🧠 fallback ONLY when empty
        promptText =
          field === "bio"
            ? `Write a professional doctor bio in 80 words using:
Name: ${formData.fullName}
Specialization: ${formData.specialization.join(", ")}
Experience: ${formData.experience} years`
            : `Write a professional doctor about section in 80 words using:
Name: ${formData.fullName}
Specialization: ${formData.specialization.join(", ")}
Experience: ${formData.experience} years`;
      }

      const res = await axiosInstance.post("/api/auth/generate-ai-content", {
        prompt: promptText,
        field,
      });

      if (field === "bio") {
        setBioSuggestions(res.data.suggestions);
      } else {
        setAboutSuggestions(res.data.suggestions);
      }
    } catch (err) {
      toast.error("AI generation failed");
    } finally {
      setAiLoading(false);
    }
  };

  // SAVE PROFILE
  const handleSave = async () => {
    if (!formData.fullName) return toast.error("Full name required");

    if (!formData.phone) return toast.error("Phone required");

    try {
      setLoading(true);

      await updateProfile(formData);

      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  // STEP 1 SEND OTP
  const sendOtpNewEmail = async () => {
    if (!formData.email) return toast.error("Enter new email");

    try {
      setLoading(true);

      await sendNewEmailOtp({
        newEmail: formData.email,
      });

      toast.success("OTP sent to new email");

      setEmailStep(2);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // STEP 2 VERIFY NEW EMAIL
  const verifyNew = async () => {
    if (!newOtp) return toast.error("Enter OTP");

    try {
      setLoading(true);

      await verifyNewEmailOtp({
        otp: newOtp,
      });

      toast.success("New email verified");

      setEmailStep(3);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // STEP 3 VERIFY OLD EMAIL
  const verifyOld = async () => {
    if (!oldOtp) return toast.error("Enter OTP");

    try {
      setLoading(true);

      await verifyOldEmailOtp({
        otp: oldOtp,
      });

      toast.success("Email updated successfully");

      setEmailPopup(false);
      setEmailStep(1);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 sm:p-4 md:p-6 text-white bg-[#0b1f1d] min-h-full">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold">My Profile</h1>
          <p className="text-gray-400 text-xs sm:text-sm">
            Keep your professional profile updated to help patients find
            accurate information about your practice and services.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full sm:w-auto bg-teal-500 text-black px-4 py-2 rounded-lg hover:bg-teal-400"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* LEFT SECTION */}
        <div className="lg:col-span-2 bg-[#112f2c] border border-teal-500/20 rounded-xl p-4 sm:p-5">
          {/* IMAGE + EMAIL */}
          <div className="mb-5">
            <label className="text-sm text-gray-400">Profile & Email</label>

            <div className="flex items-start justify-between gap-4 mt-2 flex-wrap">
              {/* IMAGE */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-700 border border-teal-400/30">
                  {profileImg ? (
                    <img
                      src={profileImg}
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold">
                      A
                    </div>
                  )}
                </div>

                <input
                  type="file"
                  accept="image/*"
                  id="profileUpload"
                  onChange={handleImageChange}
                  className="hidden"
                />

                <label
                  htmlFor="profileUpload"
                  disabled={loading}
                  className="cursor-pointer px-4 py-2 rounded-lg 
                  bg-gradient-to-r from-teal-500 to-teal-700 
                  hover:from-teal-400 hover:to-teal-600
                  text-black text-sm font-medium shadow-md hover:shadow-lg transition"
                >
                  {loading ? "Uploading..." : "Change Photo"}
                </label>
              </div>

              {/* EMAIL */}
              <div className="w-full sm:max-w-xs sm:ml-auto">
                <label className="text-sm text-gray-400">Email</label>

                <div className="flex gap-2 mt-1">
                  <input
                    value={formData.email}
                    disabled
                    className="w-full p-2 sm:p-3 rounded-lg border outline-none
                    bg-[#0d2d2a] border-teal-500/20 
                    focus:border-teal-400 opacity-60 cursor-not-allowed"
                  />

                  <button
                    onClick={() => setEmailPopup(true)}
                    className="px-3 rounded-lg bg-teal-500 text-black text-xs font-medium hover:bg-teal-400"
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* TABS */}
          <div className="flex gap-2 border-b border-teal-500/20 mb-4">
            {["personal", "professional", "about"].map((item) => (
              <button
                key={item}
                onClick={() => setTab(item)}
                className={`px-3 py-2 text-sm capitalize ${
                  tab === item
                    ? "border-b-2 border-teal-400 text-teal-300"
                    : "text-gray-400"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* PERSONAL */}
          {tab === "personal" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Full Name"
                value={formData.fullName}
                onChange={(v) => handleChange("fullName", v)}
              />
              <Input
                label="Phone"
                value={formData.phone}
                onChange={(v) => handleChange("phone", v)}
              />
              <div>
                <label className="text-sm text-gray-400">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleChange("gender", e.target.value)}
                  className="w-full mt-1 p-3 rounded-lg bg-[#0d2d2a] border border-teal-500/20 focus:border-teal-400 outline-none"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-400">Date of Birth</label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => handleChange("dob", e.target.value)}
                  className="w-full mt-1 p-3 rounded-lg bg-[#0d2d2a] border border-teal-500/20 focus:border-teal-400 outline-none"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm text-gray-400">Specialization</label>

                <select
                  className="w-full mt-1 p-3 rounded-lg bg-[#0d2d2a] border border-teal-500/20 focus:border-teal-400 outline-none"
                  onChange={(e) => {
                    const value = e.target.value;

                    if (value && !formData.specialization.includes(value)) {
                      handleChange("specialization", [
                        ...formData.specialization,
                        value,
                      ]);
                    }
                  }}
                >
                  <option value="">Select Specialization</option>

                  {SPECIALIZATIONS.map((sp) => (
                    <option key={sp} value={sp}>
                      {sp}
                    </option>
                  ))}
                </select>

                {/* Chips */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.specialization.map((sp) => (
                    <span
                      key={sp}
                      className="flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-sm"
                    >
                      {sp}

                      <button
                        onClick={() => removeItem("specialization", sp)}
                        className="text-red-400 hover:text-red-500"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm text-gray-400">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={(e) => handleWordLimit("bio", e.target.value)}
                  className="w-full mt-1 p-3 focus:border-teal-400 outline-none border border-teal-500/20  bg-[#0d2d2a] rounded"
                  rows="5"
                  placeholder="Enter a short bio that will be displayed on your profile"
                />
                <p className="text-xs text-gray-400 mt-1">
                  {formData.bio.trim()
                    ? formData.bio.trim().split(/\s+/).length
                    : 0}
                  /80 words
                </p>

                <button
                  type="button"
                  onClick={() => generateAI("bio")}
                  className="bg-gradient-to-r from-teal-400 to-emerald-500 text-white px-4 py-2 rounded-lg mt-1 hover:translate-x-0.5 text-sm"
                >
                  {aiLoading ? "Generating..." : "✨ Generate with AI"}
                </button>

                <AnimatePresence>
                  {bioSuggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="space-y-2"
                    >
                      {bioSuggestions.map((text, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() =>
                            setFormData((prev) => ({ ...prev, bio: text }))
                          }
                          className="border p-3 mt-2 rounded-lg cursor-pointer 
          hover:border-teal-400 hover:text-teal-400 
          hover:translate-y-0.5 text-sm"
                        >
                          {text}
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* PROFESSIONAL */}
          {tab === "professional" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="">
                <label className="text-sm text-gray-400">Qualification</label>

                {/* INPUT FIELD */}
                <select
                  className="w-full mt-1 p-3 rounded-lg bg-[#0d2d2a] border border-teal-500/20 focus:border-teal-400 outline-none"
                  onChange={(e) => {
                    const value = e.target.value;

                    if (value && !formData.qualification.includes(value)) {
                      handleChange("qualification", [
                        ...formData.qualification,
                        value,
                      ]);
                    }
                  }}
                >
                  <option value="">Select Qualification</option>

                  {QUALIFICATIONS.map((q) => (
                    <option key={q} value={q}>
                      {q}
                    </option>
                  ))}
                </select>

                {/* Chips */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.qualification.map((q) => (
                    <span
                      key={q}
                      className="flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-sm"
                    >
                      {q}

                      <button
                        onClick={() => removeItem("qualification", q)}
                        className="text-red-400 hover:text-red-500"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <Input
                label="Experience"
                value={formData.experience}
                type="number"
                onChange={(v) => handleChange("experience", v)}
              />
              <Input
                label="Medical Reg No."
                value={formData.medicalRegNumber}
                type="text"
                onChange={(v) => handleChange("medicalRegNumber", v)}
              />
              <Input
                label="Clinic Name"
                value={formData.clinicName}
                onChange={(v) => handleChange("clinicName", v)}
              />
              <Input
                label="Consultation Fee ₹"
                value={formData.consultationFee}
                type="number"
                onChange={(v) => handleChange("consultationFee", v)}
              />
              <Input
                label="State"
                value={formData.state}
                onChange={(v) => handleChange("state", v)}
              />

              <Input
                label="City"
                value={formData.city}
                onChange={(v) => handleChange("city", v)}
              />
              <Input
                label="Zip Code"
                value={formData.zipCode}
                type="number"
                onChange={(v) => handleChange("zipCode", v)}
              />

              <div>
                <label className="text-sm text-gray-400">
                  Online Consultation
                </label>
                <select
                  value={formData.onlineConsultation}
                  onChange={(e) =>
                    handleChange(
                      "onlineConsultation",
                      e.target.value === "true",
                    )
                  }
                  className="w-full mt-1 p-3 rounded-lg border border-teal-500/20 focus:border-teal-400 outline-none bg-[#0d2d2a]"
                >
                  <option value="false">False</option>
                  <option value="true">True</option>
                </select>
              </div>

              <Input
                label="Clinic Address"
                value={formData.clinicAddress}
                onChange={(v) => handleChange("clinicAddress", v)}
              />

              <div className="sm:col-span-2">
                <Input
                  label="Clinic Location (Google Map Link)"
                  value={formData.clinicLocation}
                  onChange={(v) => handleChange("clinicLocation", v)}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm text-gray-400">Available Days</label>

                {/* SELECT */}
                <select
                  onChange={(e) => {
                    const day = e.target.value;
                    if (day && !formData.availableDays.includes(day)) {
                      handleChange("availableDays", [
                        ...formData.availableDays,
                        day,
                      ]);
                    }
                  }}
                  className="w-full mt-1 p-3 rounded-lg bg-[#0d2d2a] focus:border-teal-400 outline-none border border-teal-500/20"
                >
                  <option value="">Select Day</option>
                  {days.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>

                {/* SELECTED DAYS */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.availableDays?.map((day) => (
                    <div
                      key={day}
                      className="bg-teal-500 text-black px-3 py-1 rounded-full text-xs flex items-center gap-2"
                    >
                      {day}

                      <button
                        onClick={() => {
                          handleChange(
                            "availableDays",
                            formData.availableDays.filter((d) => d !== day),
                          );
                        }}
                        className="text-black font-bold"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400">Start Time</label>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => handleChange("startTime", e.target.value)}
                  className="w-full mt-1 p-3 rounded-lg border border-teal-500/20 focus:border-teal-400 outline-none bg-[#0d2d2a]"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400">End Time</label>
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => handleChange("endTime", e.target.value)}
                  className="w-full mt-1 p-3  rounded-lg border border-teal-500/20 focus:border-teal-400 outline-none bg-[#0d2d2a]"
                />
              </div>
            </div>
          )}

          {/* ABOUT */}
          {tab === "about" && (
            <div className="grid grid-cols-1 gap-3">
              <label className="text-sm text-gray-400">About</label>
              <textarea
                name="about"
                value={formData.about}
                onChange={(e) => handleWordLimit("about", e.target.value)}
                className="w-full p-3 focus:border-teal-400 outline-none border border-teal-500/20 bg-[#0d2d2a] rounded"
                rows="5"
                placeholder="Enter About you that will be displayed on your profile"
              />

              <p className="text-xs text-gray-400 mt-1">
                {formData.about.trim()
                  ? formData.about.trim().split(/\s+/).length
                  : 0}
                /80 words
              </p>

              <button
                type="button"
                onClick={() => generateAI("about")}
                className="bg-gradient-to-r  from-teal-400 to-emerald-500 text-white px-4 py-2 rounded-lg mt-1 hover:translate-x-0.5 text-sm"
              >
                {aiLoading ? "Generating..." : "✨ Generate with AI"}
              </button>

              <AnimatePresence>
                {aboutSuggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-2"
                  >
                    {aboutSuggestions.map((text, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, about: text }))
                        }
                        className="border p-3 mt-2 rounded-lg cursor-pointer 
          hover:border-teal-400 hover:text-teal-400 
          hover:translate-y-0.5 text-sm"
                      >
                        {text}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
       <div className="bg-[#112f2c] border border-teal-500/20 rounded-xl p-5 shadow-lg">
  
  <h2 className="mb-4 font-semibold text-lg text-teal-300">
    Profile Preview
  </h2>

  <div className="bg-gradient-to-br from-teal-600/90 to-teal-900 p-5 rounded-xl shadow-md">

    {/* TOP SECTION */}
    <div className="flex items-center gap-4 mb-4">

      {/* PROFILE IMAGE */}
      <div className="w-14 h-14 rounded-full bg-white overflow-hidden flex items-center justify-center text-teal-700 font-bold text-lg">
        {profileImg ? (
          <img
            src={profileImg}
            alt="doctor"
            className="w-full h-full object-cover"
          />
        ) : (
          formData.fullName?.charAt(0) || "D"
        )}
      </div>

      {/* DOCTOR INFO */}
      <div className="flex-1">

        <h3 className="font-semibold text-white flex items-center gap-2">
          {formData.fullName || "Doctor Name"}

          <span className="text-xs bg-emerald-400 text-black px-2 py-0.5 rounded-full">
            Verified
          </span>
        </h3>

        <p className="text-xs text-teal-100 mt-1">
          {formData.specialization?.length
            ? formData.specialization.join(", ")
            : "Specialization"}
        </p>

        <p className="text-xs text-teal-200 mt-1">
          {formData.experience || "0"} years experience
        </p>

        <p className="text-xs text-teal-100 mt-1">
          {formData.email || "email@example.com"}
        </p>

      </div>
    </div>

    {/* DETAILS */}
    <div className="text-xs space-y-2 border-t border-teal-300/20 pt-3">

      <p className="flex items-center gap-2">
        📞 <span>{formData.phone || "Phone not added"}</span>
      </p>

      <p className="flex items-center gap-2">
        📍
        <span>
          {formData.city || "City"}, {formData.state || "State"}
        </span>
      </p>

      <p className="flex items-center gap-2">
        🏥 <span>{formData.clinicName || "Clinic Name"}</span>
      </p>

      <p className="flex items-center gap-2">
        💰
        <span className="font-semibold text-white">
          ₹{formData.consultationFee || "0"} Consultation Fee
        </span>
      </p>

      {formData.onlineConsultation && (
        <p className="text-emerald-300 text-xs">
          💻 Online Consultation Available
        </p>
      )}

      {/* BIO */}
      <p className="text-teal-100 pt-2 border-t border-teal-300/20 mt-2">
        {formData.bio
          ? formData.bio.length > 120
            ? formData.bio.slice(0, 120) + "..."
            : formData.bio
          : "Doctor description will appear here."}
      </p>

    </div>

  </div>
</div>
      </div>

      {/* EMAIL POPUP */}
      {emailPopup && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-[#112f2c] p-6 rounded-xl w-[350px]">
            {emailStep === 1 && (
              <>
                <h3 className="mb-3">Enter New Email</h3>
                <input
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full p-2 bg-[#0d2d2a] rounded mb-4"
                />
                <button
                  onClick={sendOtpNewEmail}
                  disabled={loading}
                  className="bg-teal-500 px-4 py-2 rounded text-black w-full"
                >
                  {loading ? "Sending..." : "Send OTP"}
                </button>
              </>
            )}

            {emailStep === 2 && (
              <>
                <h3 className="mb-3">OTP sent to new email</h3>
                <input
                  value={newOtp}
                  onChange={(e) => setNewOtp(e.target.value)}
                  className="w-full p-2 bg-[#0d2d2a] rounded mb-4"
                />
                <button
                  onClick={verifyNew}
                  disabled={loading}
                  className="bg-teal-500 px-4 py-2 rounded text-black w-full"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              </>
            )}

            {emailStep === 3 && (
              <>
                <h3 className="mb-3">OTP sent to old email</h3>
                <input
                  value={oldOtp}
                  onChange={(e) => setOldOtp(e.target.value)}
                  disabled={loading}
                  className="w-full p-2 bg-[#0d2d2a] rounded mb-4"
                />
                <button
                  onClick={verifyOld}
                  className="bg-teal-500 px-4 py-2 rounded text-black w-full"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// INPUT COMPONENT
function Input({ label, value, onChange }) {
  return (
    <div>
      <label className="text-sm text-gray-400">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Enter ${label}`}
        className="w-full mt-1 p-2 sm:p-3 rounded-lg bg-[#0d2d2a] border border-teal-500/20 focus:border-teal-400 outline-none"
      />
    </div>
  );
}
