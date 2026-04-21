import React, { useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { sendEnquiry } from "../../api/authApi";

const EnquiryForm = ({ slug: propSlug,clinicLocation }) => {

  const { slug: urlSlug } = useParams();
  const slug = propSlug || urlSlug;

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!slug) {
      toast.error("Doctor not found");
      return;
    }

    try {

      setLoading(true);

      const res = await sendEnquiry(slug, formData);

      toast.success(res.message || "Enquiry sent successfully");

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: ""
      });

    } catch (error) {
      toast.error(error.message || "Failed to send enquiry");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-20 flex justify-center px-4 sm:px-6">
      
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="relative w-full p-6 sm:p-10 rounded-[28px] bg-white border border-gray-200 shadow-xl hover:shadow-2xl transition duration-300 overflow-hidden"
        >
          
          <div className="absolute inset-0 bg-gradient-to-br from-teal-100/40 via-transparent to-cyan-100/40 blur-3xl opacity-70"></div>
          <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-teal-600 via-cyan-500 to-teal-600"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Enquiry Form
              </h3>
              <p className="text-gray-600 text-sm mt-2">
                We’ll get back to you within 24 hours
              </p>
            </div>

            <div className="space-y-5">

              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-200 hover:border-teal-500 hover:bg-white transition duration-300 text-sm sm:text-base shadow-sm"
                placeholder="Your Name"
              />

              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-200 hover:border-teal-500 hover:bg-white transition duration-300 text-sm sm:text-base shadow-sm"
                placeholder="Your Email"
              />
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-200 hover:border-teal-500 hover:bg-white transition duration-300 text-sm sm:text-base shadow-sm"
                placeholder="Your Phone"
              />

              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-200 hover:border-teal-500 hover:bg-white transition duration-300 resize-none text-sm sm:text-base shadow-sm"
                placeholder="Write your message..."
              ></textarea>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-8 w-full py-3 rounded-xl bg-gradient-to-r from-teal-700 via-teal-800 to-teal-900 text-white font-semibold shadow-lg hover:shadow-2xl hover:shadow-teal-500/30 transition duration-300 text-sm sm:text-base tracking-wide"
            >
              {loading ? "Sending..." : "Send Enquiry →"}
            </button>

            <p className="text-center text-xs text-gray-400 mt-4">
              Your information is safe and secure
            </p>

          </div>
        </form>

        {/* MAP */}
        <div className="w-full h-full rounded-[28px] overflow-hidden border border-gray-200 shadow-xl hover:shadow-2xl transition duration-300">
          <iframe
            title="map"
            src={clinicLocation}
            className="w-full h-full min-h-[400px]"
            loading="lazy"
          ></iframe>
        </div>

      </div>
    </div>
  );
};

export default EnquiryForm;