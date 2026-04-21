import React, { useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { bookAppointment } from "../../api/authApi";

const AppointmentForm = ({ slug: propSlug }) => {

  const { slug: urlSlug } = useParams();
  const slug = propSlug || urlSlug;

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    patientName: "",
    patientEmail: "",
    phone: "",
    date: "",
    time: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!slug) {
    toast.error("Doctor not found");
    return;
  }

  // 🔥 VALIDATION

  if (!formData.patientName.trim()) {
    toast.error("Patient name is required");
    return;
  }

  if (!formData.patientEmail.trim()) {
    toast.error("Email is required");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(formData.patientEmail)) {
    toast.error("Enter a valid email");
    return;
  }

  if (!formData.phone) {
    toast.error("Phone number is required");
    return;
  }

  const phoneRegex = /^[0-9]{10}$/;

  if (!phoneRegex.test(formData.phone)) {
    toast.error("Phone number must be 10 digits");
    return;
  }

  if (!formData.date) {
    toast.error("Please select appointment date");
    return;
  }

  if (!formData.time) {
    toast.error("Please select appointment time");
    return;
  }

  if (!formData.message.trim()) {
    toast.error("Please describe your problem");
    return;
  }

  try {
    setLoading(true);

    const res = await bookAppointment(slug, formData);

    toast.success(res.message || "Appointment booked successfully");

    setFormData({
      patientName: "",
      patientEmail: "",
      phone: "",
      date: "",
      time: "",
      message: "",
    });

  } catch (error) {
    toast.error(error.message || "Failed to book appointment");
  } finally {
    setLoading(false);
  }
};

  return (
   <div className="min-h-screen relative flex items-center justify-center px-4 sm:px-6 
bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 
text-gray-900 overflow-hidden">

  <div className="absolute inset-0 bg-gradient-to-br 
  from-white/60 via-transparent to-gray-200"></div>

  <div className="absolute w-[400px] h-[400px] 
  bg-teal-200/40 blur-[120px] 
  top-[-80px] left-[-80px]"></div>

  <div className="absolute w-[400px] h-[400px] 
  bg-cyan-200/40 blur-[120px] 
  bottom-[-80px] right-[-80px]"></div>

<form
  onSubmit={handleSubmit}
  className="relative z-10 w-full max-w-3xl 
  bg-white border border-gray-200 
  rounded-[28px] p-6 sm:p-8 md:p-10 
  shadow-xl hover:shadow-2xl 
  transition duration-300 overflow-hidden"
>

  <div className="absolute inset-0 bg-gradient-to-br 
  from-teal-100/40 via-transparent to-cyan-100/40 
  opacity-70"></div>

  <div className="absolute top-0 left-0 w-full h-[4px] 
  bg-gradient-to-r from-teal-600 via-cyan-500 to-teal-600"></div>

  <div className="relative z-10">

    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900">
      Book{" "}
      <span className="bg-gradient-to-r from-teal-600 to-cyan-500 bg-clip-text text-transparent">
        Appointment
      </span>
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">

      <input
        type="text"
        name="patientName"
        value={formData.patientName}
        onChange={handleChange}
        placeholder="Patient Name"
        className="w-full px-4 py-2.5 sm:py-3 rounded-xl 
        bg-gray-50 border border-gray-300 
        text-gray-900 placeholder-gray-500 
        focus:outline-none focus:border-teal-600 
        focus:ring-2 focus:ring-teal-200 
        hover:border-teal-500 hover:bg-white
        transition duration-300 text-sm sm:text-base shadow-sm"
      />

      <input
        type="email"
        name="patientEmail"
        value={formData.patientEmail}
        onChange={handleChange}
        placeholder="Email Address"
        className="w-full px-4 py-2.5 sm:py-3 rounded-xl 
        bg-gray-50 border border-gray-300 
        text-gray-900 placeholder-gray-500 
        focus:outline-none focus:border-teal-600 
        focus:ring-2 focus:ring-teal-200 
        hover:border-teal-500 hover:bg-white
        transition duration-300 text-sm sm:text-base shadow-sm"
      />

      <input
  type="tel"
  name="phone"
  value={formData.phone}
  onChange={(e) =>
    setFormData({
      ...formData,
      phone: e.target.value.replace(/\D/g, "").slice(0, 10)
    })
  }
  placeholder="Phone Number"
        className="w-full px-4 py-2.5 sm:py-3 rounded-xl 
        bg-gray-50 border border-gray-300 
        text-gray-900 placeholder-gray-500 
        focus:outline-none focus:border-teal-600 
        focus:ring-2 focus:ring-teal-200 
        hover:border-teal-500 hover:bg-white
        transition duration-300 text-sm sm:text-base shadow-sm"
      />

      <input
        type="date"
        name="date"
        value={formData.date}
        min={new Date().toISOString().split("T")[0]}
        onChange={handleChange}
        className="w-full px-4 py-2.5 sm:py-3 rounded-xl 
        bg-gray-50 border border-gray-300 
        text-gray-900 
        focus:outline-none focus:border-teal-600 
        focus:ring-2 focus:ring-teal-200 
        hover:border-teal-500 hover:bg-white
        transition duration-300 text-sm sm:text-base shadow-sm"
      />

      <input
        type="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
        className="w-full px-4 py-2.5 sm:py-3 rounded-xl 
        bg-gray-50 border border-gray-300 
        text-gray-900 
        focus:outline-none focus:border-teal-600 
        focus:ring-2 focus:ring-teal-200 
        hover:border-teal-500 hover:bg-white
        transition duration-300 text-sm sm:text-base shadow-sm"
      />
    </div>

    <textarea
      name="message"
      value={formData.message}
      onChange={handleChange}
      placeholder="Describe your problem..."
      rows="4"
      className="w-full mt-5 px-4 py-2.5 sm:py-3 rounded-xl 
      bg-gray-50 border border-gray-300 
      text-gray-900 placeholder-gray-500 
      focus:outline-none focus:border-teal-600 
      focus:ring-2 focus:ring-teal-200 
      hover:border-teal-500 hover:bg-white
      transition duration-300 resize-none text-sm sm:text-base shadow-sm"
    />

    <button
      type="submit"
      disabled={loading}
      className="mt-6 w-full py-2.5 sm:py-3 rounded-xl font-semibold 
      bg-gradient-to-r from-teal-700 via-teal-800 to-teal-900 
      text-white shadow-lg hover:shadow-2xl 
      hover:shadow-teal-500/30
      hover:scale-[1.02] active:scale-[0.98]
      transition duration-300 
      text-sm sm:text-base tracking-wide flex justify-center items-center gap-2"
    >
      {loading ? (
        <>
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          Booking...
        </>
      ) : (
        "Book Appointment →"
      )}
    </button>

    <p className="text-center text-xs text-gray-400 mt-4">
      Your information is safe and secure
    </p>

  </div>
</form>
</div>
  );
};

export default AppointmentForm;