import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../api/axiosInstance";

export default function SignUp() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [bioSuggestions, setBioSuggestions] = useState([]);
  const [aboutSuggestions, setAboutSuggestions] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);

  // ✅ FULL FORM STATE (ALL FIELDS)
  const [formDataState, setFormDataState] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
    dob: "",
    specialization: [],
    qualification: [],
    experience: "",
    medicalRegNumber: "",
    clinicName: "",
    consultationFee: "",
    city: "",
    state: "",
    zipCode: "",
    clinicAddress: "",
    clinicLocation: "",
    bio: "",
    availableDays: [],
    onlineConsultation: "",
    startTime: "",
    endTime: "",
    about: "",
    profilePhoto: null,
  });


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
  "Critical Care Specialist"
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
  "GNM"
];
  const navigate = useNavigate();

  const inputStyle =
    "w-full border border-gray-300 rounded-xl px-4 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-600";

  const MAX_WORDS = 80;

  const handleWordLimit = (e) => {
    const { name, value } = e.target;

    const words = value.trim().split(/\s+/);

    if (words.length <= MAX_WORDS) {
      setFormDataState((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      toast.error("Maximum 80 words allowed");
    }
  };

  // ✅ HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormDataState((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const generateAI = async (field) => {
    try {
      setAiLoading(true);

      // 👇 ONLY use manual input if user actually typed something
      const userTypedText =
        field === "bio"
          ? formDataState.bio?.trim()
          : formDataState.about?.trim();

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
Name: ${formDataState.fullName}
Specialization: ${formDataState.specialization.join(", ")}
Experience: ${formDataState.experience} years`
            : `Write a professional doctor about section in 80 words using:
Name: ${formDataState.fullName}
Specialization: ${formDataState.specialization.join(", ")}
Experience: ${formDataState.experience} years`;
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

  // ✅ STEP VALIDATION (FULL)
  const validateStep = () => {
    if (step === 1) {
      if (!formDataState.fullName)
        return (toast.error("Full Name is required"), false);
      if (!formDataState.email)
        return (toast.error("Email is required"), false);
      // ✅ EMAIL VALIDATION ADD HERE
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formDataState.email))
        return (toast.error("Enter valid email"), false);
      if (!formDataState.phone)
        return (toast.error("Phone is required"), false);
      if (!formDataState.password)
        return (toast.error("Password is required"), false);
      if (!formDataState.gender)
        return (toast.error("Gender is required"), false);
      if (!formDataState.dob) return (toast.error("DOB is required"), false);
      if (!formDataState.specialization.length)
        return (toast.error("Specialization required"), false);
    }

    if (step === 2) {
      if (!formDataState.qualification.length)
        return (toast.error("Qualification required"), false);
      if (!formDataState.experience)
        return (toast.error("Experience is required"), false);
      if (!formDataState.medicalRegNumber)
        return (toast.error("Medical Reg No is required"), false);
      if (!formDataState.clinicName)
        return (toast.error("Clinic Name is required"), false);
      if (!formDataState.consultationFee)
        return (toast.error("Consultation Fee is required"), false);
      if (!formDataState.city) return (toast.error("City is required"), false);
      if (!formDataState.state)
        return (toast.error("State is required"), false);
      if (!formDataState.zipCode)
        return (toast.error("Zip Code is required"), false);
      if (!formDataState.clinicAddress)
        return (toast.error("Clinic Address is required"), false);
    }

    if (step === 3) {
      if (!formDataState.qualification.length)
        return (toast.error("Qualification required"), false);
      if (!formDataState.onlineConsultation)
        return (toast.error("Online consultation required"), false);
      if (!formDataState.startTime || !formDataState.endTime)
        return (toast.error("Time required"), false);
      if (!formDataState.profilePhoto)
        return (toast.error("Profile photo required"), false);
      if (!formDataState.about) return (toast.error("About required"), false);
    }

    return true;
  };

  // ✅ SUBMIT
  const handleSubmit = async () => {
    if (!validateStep()) return;

    try {
      setLoading(true);

      const formData = new FormData();

      Object.keys(formDataState).forEach((key) => {
        formData.append(key, formDataState[key]);
      });

      const res = await axiosInstance.post("/api/auth/signup", formData);

      toast.success(res.data.message || "Signup successful");

      navigate("/verify-otp", {
        state: { email: formDataState.email },
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center 
    bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 px-4 py-6"
    >
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-3xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Doctor Signup</h2>

        {/* STEP BAR */}
        <div className="flex items-center mb-8">
          {[1, 2, 3].map((num, i) => (
            <div key={num} className="flex items-center w-full">
              <div
                className={`w-9 h-9 flex items-center justify-center rounded-full font-bold
              ${step >= num ? "bg-teal-700 text-white" : "bg-gray-300"}`}
              >
                {num}
              </div>

              {i < 2 && (
                <div className="flex-1 h-[4px] mx-2 bg-gray-300">
                  <div
                    className="h-full bg-teal-700"
                    style={{ width: step > num ? "100%" : "0%" }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <form>
          <AnimatePresence mode="wait">
            {/* STEP 1 */}
            {step === 1 && (
              <motion.div key="1" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    name="fullName"
                    value={formDataState.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className={inputStyle}
                  />
                  <input
                    name="email"
                    value={formDataState.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Email"
                    className={inputStyle}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    name="phone"
                    value={formDataState.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className={inputStyle}
                  />
                  <input
                    name="password"
                    value={formDataState.password}
                    onChange={handleChange}
                    type="password"
                    placeholder="Password"
                    className={inputStyle}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <select
                    name="gender"
                    value={formDataState.gender}
                    onChange={handleChange}
                    className={inputStyle}
                  >
                    <option value="">Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>

                  <input
                    type="date"
                    name="dob"
                    value={formDataState.dob}
                    onChange={handleChange}
                    className={inputStyle}
                  />
                </div>

     <div className="space-y-2">

  <div className="relative">
    <select
      className={`${inputStyle} appearance-none cursor-pointer pr-10`}
      onChange={(e) => {
        const value = e.target.value;

        if (value && !formDataState.specialization.includes(value)) {
          setFormDataState((prev) => ({
            ...prev,
            specialization: [...prev.specialization, value],
          }));
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

    {/* Custom Arrow */}
    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-600 pointer-events-none">
      ▼
    </div>
  </div>

  {/* Selected Specializations */}
  <div className="flex flex-wrap gap-2 mt-2">
    {formDataState.specialization.map((sp) => (
      <div
        key={sp}
        className="bg-teal-600 text-white px-3 py-1.5 rounded-full text-xs flex items-center gap-2 shadow-sm"
      >
        {sp}

        <button
          type="button"
          className="text-white hover:text-gray-200"
          onClick={() =>
            setFormDataState((prev) => ({
              ...prev,
              specialization: prev.specialization.filter((s) => s !== sp),
            }))
          }
        >
          ✕
        </button>
      </div>
    ))}
  </div>
</div>

                <button
                  type="button"
                  onClick={() => validateStep() && setStep(2)}
                  className="w-full bg-teal-700 text-white py-3 rounded-xl"
                >
                  Next →
                </button>
              </motion.div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <motion.div key="2" className="space-y-4">
               <div className="space-y-2">

<div className="relative">
<select
  className={`${inputStyle} appearance-none cursor-pointer pr-10`}
  onChange={(e) => {
    const value = e.target.value;

    if (value && !formDataState.qualification.includes(value)) {
      setFormDataState((prev) => ({
        ...prev,
        qualification: [...prev.qualification, value],
      }));
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

<div className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-600 pointer-events-none">
▼
</div>
</div>

{/* Selected Qualifications */}
<div className="flex flex-wrap gap-2 mt-2">
{formDataState.qualification.map((q) => (
  <div
    key={q}
    className="bg-teal-500 text-black px-3 py-1 rounded-full text-xs flex items-center gap-2"
  >
    {q}

    <button
      type="button"
      onClick={() =>
        setFormDataState((prev) => ({
          ...prev,
          qualification: prev.qualification.filter((i) => i !== q),
        }))
      }
    >
      ✕
    </button>
  </div>
))}
</div>

</div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    name="experience"
                    value={formDataState.experience}
                    type="number"
                    onChange={handleChange}
                    placeholder="Experience (years)"
                    className={inputStyle}
                  />
                  <input
                    name="medicalRegNumber"
                    value={formDataState.medicalRegNumber}
                    type="text"
                    onChange={handleChange}
                    placeholder="Medical Reg No."
                    className={inputStyle}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    name="clinicName"
                    value={formDataState.clinicName}
                    onChange={handleChange}
                    placeholder="Clinic Name"
                    className={inputStyle}
                  />
                  <input
                    name="consultationFee"
                    value={formDataState.consultationFee}
                    onChange={handleChange}
                    type="number"
                    placeholder="Consultation Fee ₹"
                    className={inputStyle}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    name="state"
                    value={formDataState.state}
                    onChange={handleChange}
                    placeholder="State"
                    className={inputStyle}
                  />
                  <input
                    name="city"
                    value={formDataState.city}
                    onChange={handleChange}
                    placeholder="City"
                    className={inputStyle}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    name="zipCode"
                    value={formDataState.zipCode}
                    type="number"
                    onChange={handleChange}
                    placeholder="Zip Code"
                    className={inputStyle}
                  />
                  <input
                    name="clinicAddress"
                    value={formDataState.clinicAddress}
                    onChange={handleChange}
                    placeholder="Clinic Address"
                    className={inputStyle}
                  />
                </div>

                <input
                  name="clinicLocation"
                  value={formDataState.clinicLocation}
                  onChange={handleChange}
                  placeholder="Clinic Location (Google Map link / Area) Ex: https://goo.gl/maps/xyz or Downtown, City"
                  className={inputStyle}
                />
                <textarea
                  name="bio"
                  value={formDataState.bio}
                  onChange={handleWordLimit}
                  placeholder="Doctor Bio (Max 80 words)"
                  className={inputStyle}
                />

                <p className="text-xs text-gray-400">
                  {formDataState.bio.trim()
                    ? formDataState.bio.trim().split(/\s+/).length
                    : 0}
                  /80 words
                </p>

                <button
                  type="button"
                  onClick={() => generateAI("bio")}
                  className="bg-black text-white px-4 py-2 rounded-lg text-sm"
                >
                  {aiLoading ? "Generating..." : "✨ Generate with AI"}
                </button>

                {bioSuggestions.length > 0 && (
                  <div className="space-y-2">
                    {bioSuggestions.map((text, i) => (
                      <div
                        key={i}
                        onClick={() =>
                          setFormDataState((prev) => ({ ...prev, bio: text }))
                        }
                        className="border p-3 rounded-lg cursor-pointer hover:bg-gray-100 text-sm"
                      >
                        {text}
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/2 border py-3 rounded-xl"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => validateStep() && setStep(3)}
                    className="w-1/2 bg-teal-700 text-white py-3 rounded-xl"
                  >
                    Next →
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <motion.div key="3" className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500">
                    Available Days
                  </label>

                  <select
                    className={inputStyle}
                    onChange={(e) => {
                      const day = e.target.value;

                      if (day && !formDataState.availableDays.includes(day)) {
                        setFormDataState((prev) => ({
                          ...prev,
                          availableDays: [...prev.availableDays, day],
                        }));
                      }
                    }}
                  >
                    <option value="">Select Day</option>
                    <option>Monday</option>
                    <option>Tuesday</option>
                    <option>Wednesday</option>
                    <option>Thursday</option>
                    <option>Friday</option>
                    <option>Saturday</option>
                    <option>Sunday</option>
                  </select>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {formDataState.availableDays.map((day) => (
                      <div
                        key={day}
                        className="bg-teal-500 text-black px-3 py-1 rounded-full text-xs flex items-center gap-2"
                      >
                        {day}

                        <button
                          onClick={() =>
                            setFormDataState((prev) => ({
                              ...prev,
                              availableDays: prev.availableDays.filter(
                                (d) => d !== day,
                              ),
                            }))
                          }
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <select
                  name="onlineConsultation"
                  value={formDataState.onlineConsultation}
                  onChange={handleChange}
                  className={inputStyle}
                >
                  <option value="">Online Consultation?</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="time"
                    name="startTime"
                    value={formDataState.startTime}
                    onChange={handleChange}
                    className={inputStyle}
                  />
                  <input
                    type="time"
                    name="endTime"
                    value={formDataState.endTime}
                    onChange={handleChange}
                    className={inputStyle}
                  />
                </div>

                <input
                  type="file"
                  name="profilePhoto"
                  onChange={handleChange}
                  className={inputStyle}
                />
                <textarea
                  name="about"
                  value={formDataState.about}
                  onChange={handleChange}
                  placeholder="About Doctor (Max 80 words)"
                  className={inputStyle}
                />

              <button
  type="button"
  onClick={() => generateAI("about")}
  className="bg-black text-white px-4 py-2 rounded-lg text-sm mt-2"
>
  {aiLoading ? "Generating..." : "✨ Generate About with AI"}
</button>

{aboutSuggestions.length > 0 && (
  <div className="space-y-2">
    {aboutSuggestions.map((text, i) => (
      <div
        key={i}
        onClick={() =>
          setFormDataState((prev) => ({ ...prev, about: text }))
        }
        className="border p-3 rounded-lg cursor-pointer hover:bg-gray-100 text-sm"
      >
        {text}
      </div>
    ))}
  </div>
)}

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-1/2 border py-3 rounded-xl"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-1/2 bg-teal-700 text-white py-3 rounded-xl"
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        <p className="text-center mt-6 text-sm">
          Already have account?{" "}
          <Link to="/login" className="text-teal-700 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
