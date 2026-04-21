import React from "react";
import { motion } from "framer-motion";

const PatientReview = ({ doctor }) => {
  return (
    <div className="mt-24 px-4 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <motion.div initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="flex justify-center">
          <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="relative">
            <div className="p-2 bg-white border border-gray-200 rounded-3xl shadow-lg">
              <img src={doctor.profilePhoto || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1000"}
      alt={doctor.fullName} className="w-72 h-72 sm:w-96 sm:h-96 md:w-[420px] md:h-[420px] object-cover object-top rounded-2xl" />
            </div>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="space-y-6">
          <span className="inline-block px-4 py-1 text-xs sm:text-sm bg-gray-100 text-gray-700 rounded-full border border-gray-200">Patient Testimonial</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-snug">Real Experiences From Our Patients</h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            “Doctor provided excellent treatment and explained everything in detail. The staff was extremely supportive and the overall experience was smooth. Highly recommended for anyone looking for quality healthcare services.”
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
           <motion.a
  href={`https://wa.me/91${doctor.phone}?text=Hello Dr. ${doctor.fullName}, I want to book an appointment.`}
  target="_blank"
  rel="noopener noreferrer"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="px-6 py-3 rounded-xl bg-teal-700 text-white text-sm font-semibold shadow-md hover:bg-teal-800 transition flex justify-center items-center text-center w-full sm:w-auto"
>
  Contact Doctor →
</motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PatientReview;