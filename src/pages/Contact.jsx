import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { sendAdminEnquiry } from "../../src/api/authApi";

export default function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

  };

  // VALIDATION FUNCTION
  const validateForm = () => {

    const { name, email, phone, message } = formData;

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const phoneRegex =
      /^[0-9]{10}$/;

    if (!name.trim()) {
      toast.error("Name is required");
      return false;
    }

    if (!email.trim()) {
      toast.error("Email is required");
      return false;
    }

    if (!emailRegex.test(email)) {
      toast.error("Enter a valid email");
      return false;
    }

    if (!phone.trim()) {
      toast.error("Phone number is required");
      return false;
    }

    if (!phoneRegex.test(phone)) {
      toast.error("Phone must be 10 digits");
      return false;
    }

    if (!message.trim()) {
      toast.error("Message is required");
      return false;
    }

    if (message.trim().length < 10) {
      toast.error("Message must be at least 10 characters");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    // VALIDATION CHECK
    if (!validateForm()) return;

    try {

      setLoading(true);

      await sendAdminEnquiry(formData);

      toast.success("Message sent successfully!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: ""
      });

    } catch (error) {

      console.error(error);
      toast.error("Something went wrong");

    } finally {
      setLoading(false);
    }

  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 px-4 py-10 sm:py-14">

      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Contact Us
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-2">
            We’re here to help you. Reach out anytime.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* LEFT */}
          <div className="bg-gradient-to-br from-teal-700 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
              Let’s Talk
            </h2>

            <p className="text-sm text-white/90 mb-6">
              Have questions about appointments or doctors? Our team is ready to help.
            </p>

            <div className="space-y-4 text-sm">

              <div>
                <p className="font-medium">Email</p>
                <p className="text-white/80">support@doctorcard.com</p>
              </div>

              <div>
                <p className="font-medium">Phone</p>
                <p className="text-white/80">+91 98765 43210</p>
              </div>

              <div>
                <p className="font-medium">Location</p>
                <p className="text-white/80">Mumbai, India</p>
              </div>

            </div>
          </div>

          {/* FORM */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xl">

            <h2 className="text-lg sm:text-xl font-semibold mb-5 text-gray-900">
              Send a Message
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full px-3 py-2 border rounded-lg bg-gray-50 text-sm  border-gray-300   focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition "
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-3 py-2 border rounded-lg bg-gray-50 text-sm border-gray-300   focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition"
              />

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your phone"
                className="w-full px-3 py-2 border rounded-lg bg-gray-50 text-sm border-gray-300   focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition"
              />

              <textarea
                rows="4"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Type your message..."
                className="w-full px-3 py-2 border rounded-lg bg-gray-50 text-sm border-gray-300   focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition"
              />

              <motion.button
                whileTap={{ scale: 0.96 }}
                whileHover={{ scale: 1.02 }}
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-teal-700 to-teal-900 text-white py-2.5 rounded-lg"
              >
                {loading ? "Sending..." : "Send Message →"}
              </motion.button>

            </form>

          </div>

        </div>

      </div>

    </section>
  );
}