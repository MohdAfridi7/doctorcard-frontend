import React from "react";
import { motion } from "framer-motion";

const AboutDoctor = ({ doctor, navigate }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="mt-16 relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 md:p-10 shadow-lg hover:shadow-xl transition duration-300"
    >
      {/* Soft Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-100/40 via-transparent to-cyan-100/40 opacity-60"></div>

      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-start">
        
        {/* LEFT CONTENT: Text & Bio */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-top text-gray-900">
            About {" "}
            <span className="bg-gradient-to-r from-teal-600 to-cyan-500 bg-clip-text text-transparent">
             Dr. {doctor.fullName}
            </span>
          </h2>

         <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
  {doctor?.about ? (
    doctor.about
  ) : (
    <>
     {doctor?.fullName} is a highly experienced {doctor?.specialization} with over {doctor?.experience ?? 15}+ years of dedicated practice in the medical field. Known for a patient-centered approach and accurate diagnosis, the doctor focuses on providing effective treatments and long-term health solutions. With a commitment to modern medical practices and compassionate care, {doctor?.fullName} strives to improve the health, comfort, and well-being of every patient.
    </>
  )}
</p>

        </motion.div>

        {/* RIGHT CARD: Why Choose & Button */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ y: -6 }}
          className="bg-gray-50 border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
        >
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900">
            Why Choose This Doctor?
          </h3>

          <ul className="space-y-3 text-gray-600 text-sm">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
              {doctor.experience}+ Years Professional Experience
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
              Patient-Focused Treatment Approach
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
              Modern Medical Infrastructure
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
              Affordable & Transparent Consultation
            </li>
          </ul>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(`/appointment/${doctor.slug}`)}
            className="mt-6 w-full py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-teal-700 to-teal-900 text-white font-semibold shadow-md hover:shadow-lg transition duration-300 text-sm"
          >
            Book Appointment
          </motion.button>
        </motion.div>
      </div>

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 h-[3px] w-full bg-gradient-to-r from-teal-600 to-cyan-500 opacity-60"></div>
    </motion.div>
  );
};

export default AboutDoctor;