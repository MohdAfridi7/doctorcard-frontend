import React from "react";
import { motion } from "framer-motion";

const termsData = [
  {
    title: "Acceptance of Terms",
    content:
      "By accessing and using DoctorCard, you agree to be legally bound by these Terms & Conditions. If you do not agree, please discontinue use immediately."
  },
  {
    title: "Use of Services",
    content:
      "DoctorCard connects patients with healthcare professionals. You agree to use the platform responsibly and not misuse or disrupt services."
  },
  {
    title: "User Responsibilities",
    content:
      "You must provide accurate information and maintain account security. Any fraudulent activity may lead to account suspension."
  },
  {
    title: "Medical Disclaimer",
    content:
      "DoctorCard is not a healthcare provider. All medical advice is given by independent professionals."
  },
  {
    title: "Payments & Refunds",
    content:
      "Payments are securely processed via third-party providers. Refund policies vary by doctor or clinic."
  },
  {
    title: "Privacy & Security",
    content:
      "We follow strict security practices to protect your data. Refer to our Privacy Policy for more details."
  }
];

export default function Terms() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 px-4 sm:px-6 py-10 sm:py-14 ">

      <div className="max-w-5xl lg:max-w-6xl mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="flex justify-center mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center 
            rounded-xl bg-gradient-to-br from-teal-700 to-teal-900 
            text-white font-bold shadow-lg text-base sm:text-lg">
              D
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Terms & Conditions
          </h1>

          <p className="text-gray-500 mt-2 text-xs sm:text-sm md:text-base">
            Please read carefully before using DoctorCard services
          </p>
        </motion.div>

        {/* INTRO */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl 
          p-4 sm:p-6 mb-8 sm:mb-10 shadow-sm"
        >
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            These Terms & Conditions govern your use of DoctorCard. By accessing
            our platform, you agree to comply with all rules, policies, and
            applicable laws.
          </p>
        </motion.div>

        {/* TIMELINE */}
        <div className="relative border-l-2 border-teal-700 ml-2 sm:ml-4 space-y-8 sm:space-y-10">

          {termsData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
              className="relative pl-6 sm:pl-8"
            >
              {/* DOT */}
              <div className="absolute -left-[8px] sm:-left-[11px] top-1.5 
              w-3 h-3 sm:w-5 sm:h-5 
              bg-teal-800 rounded-full border-2 sm:border-4 border-white shadow"></div>

              {/* CONTENT */}
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-1">
                {index + 1}. {item.title}
              </h3>

              <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed">
                {item.content}
              </p>
            </motion.div>
          ))}

        </div>

        {/* HIGHLIGHT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 sm:mt-14 bg-gradient-to-r from-teal-700 to-teal-900 
          text-white rounded-xl sm:rounded-2xl p-5 sm:p-8 shadow-xl text-center"
        >
          <h3 className="text-base sm:text-lg font-semibold mb-2">
            Important Notice
          </h3>

          <p className="text-xs sm:text-sm md:text-base text-white/90 max-w-2xl mx-auto">
            DoctorCard acts only as a bridge between patients and doctors. 
            Always consult a certified healthcare professional for medical decisions.
          </p>
        </motion.div>

        {/* CTA
        <div className="flex justify-center mt-8 sm:mt-10">
          <button className="bg-gradient-to-r from-teal-700 to-teal-900 
          text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg sm:rounded-xl 
          shadow-lg hover:shadow-xl hover:scale-105 transition 
          text-xs sm:text-sm md:text-base font-medium">
            Accept & Continue →
          </button>
        </div> */}

        {/* FOOTER */}
        <p className="text-center text-[10px] sm:text-xs text-gray-400 mt-6 sm:mt-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

      </div>

    </section>
  );
}