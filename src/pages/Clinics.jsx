import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Clinics() {
  const navigate = useNavigate();
  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 px-4 sm:px-6 py-10 sm:py-14">

      <div className="max-w-7xl mx-auto space-y-14 sm:space-y-20">

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center px-2"
        >
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
            Grow Your Clinic with DoctorCard
          </h1>

          <p className="text-gray-600 mt-4 max-w-xl sm:max-w-2xl mx-auto text-sm sm:text-base">
            Join our platform to connect with thousands of patients, manage
            appointments efficiently, and expand your healthcare reach.
          </p>

          <button  onClick={() => navigate("/contact")} className="mt-6 bg-gradient-to-r from-teal-700 to-teal-900 
          text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl shadow-lg 
          hover:shadow-xl hover:scale-105 transition text-sm sm:text-base">
            
            Join as a Clinic →
          </button>
        </motion.div>

        {/* FEATURES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">

          {[
            {
              title: "More Patients",
              desc: "Get discovered by patients actively searching for healthcare services."
            },
            {
              title: "Smart Scheduling",
              desc: "Manage appointments, availability, and cancellations easily."
            },
            {
              title: "Secure Platform",
              desc: "Advanced security keeps your clinic and patient data safe."
            },
            {
              title: "Online Presence",
              desc: "Build strong digital visibility and grow your reputation."
            },
            {
              title: "Easy Payments",
              desc: "Accept payments and manage billing without hassle."
            },
            {
              title: "Analytics & Insights",
              desc: "Track performance and patient engagement effortlessly."
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 
              shadow-sm hover:shadow-xl transition duration-300"
            >
              <h3 className="font-semibold text-gray-900 text-base sm:text-lg mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {item.desc}
              </p>
            </motion.div>
          ))}

        </div>

        {/* HOW IT WORKS */}
        <div className="space-y-8 sm:space-y-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-900">
            How It Works
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 text-center">

            {["Register Your Clinic", "Set Availability", "Start Receiving Patients"].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.15 }}
                className="px-4"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto flex items-center justify-center 
                rounded-full bg-gradient-to-br from-teal-700 to-teal-900 
                text-white font-bold mb-3 sm:mb-4 shadow-lg">
                  {i + 1}
                </div>

                <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1">
                  {step}
                </h3>

                <p className="text-xs sm:text-sm text-gray-500">
                  Simple and quick process to get started.
                </p>
              </motion.div>
            ))}

          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-teal-700 to-teal-900 
          text-white rounded-2xl sm:rounded-3xl 
          p-6 sm:p-8 md:p-10 text-center shadow-xl"
        >
          <h2 className="text-lg sm:text-2xl md:text-3xl font-bold mb-3">
            Ready to Grow Your Clinic?
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-white/90 mb-5 max-w-xl mx-auto">
            Join DoctorCard today and take your clinic to the next level with digital healthcare solutions.
          </p>

          <button  onClick={() => navigate("/signup")} className="bg-white text-teal-800 px-6 sm:px-8 py-2.5 sm:py-3 
          rounded-xl font-semibold shadow hover:scale-105 transition text-sm sm:text-base">
            Get Started Now
          </button>
        </motion.div>

      </div>

    </section>
  );
}