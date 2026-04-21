import React from "react";
import { motion } from "framer-motion";

const CTASection = ({doctor, navigate }) => {
  return (
    <div className="w-full mt-12 sm:mt-20 py-0 sm:py-20 relative overflow-hidden  text-gray-900">

      {/* WRAPPER */}
      <div className="w-full flex flex-col items-center px-2 sm:px-6 md:px-16">

        {/* HEADING */}
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-gray-900 text-center leading-tight">
          Need Expert{" "}
          <span className="bg-gradient-to-r from-teal-600 to-cyan-500 bg-clip-text text-transparent">
            Consultation?
          </span>
        </h2>

        <p className="text-gray-600 mt-3 text-sm sm:text-base text-center max-w-xl">
          Get personalized medical care from experienced doctors with modern treatment facilities and 24/7 support.
        </p>

        {/* FEATURES */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
          {[
            "24/7 Emergency Support",
            "Experienced Specialists",
            "Advanced Medical Equipment",
            "100% Patient Satisfaction",
          ].map((item, i) => (
            <p key={i} className="flex items-center gap-2">
              <span className="w-2 h-2 bg-teal-600 rounded-full"></span>
              {item}
            </p>
          ))}
        </div>

        {/* BUTTON */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(`/appointment/${doctor.slug}`)}
          className="mt-10 px-8 py-3 
          bg-gradient-to-r from-teal-700 to-teal-900 
          text-white rounded-xl font-semibold 
          shadow-lg hover:shadow-xl 
          transition duration-300 text-sm sm:text-base"
        >
          Book Appointment →
        </motion.button>

       

      </div>
    </div>
  );
};

export default CTASection;