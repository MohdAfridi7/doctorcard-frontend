import React from "react";
import { motion } from "framer-motion";

const SeeHero = ({ doctor, navigate }) => {
  return (
    <div className="relative px-4 sm:px-6 md:px-20 py-16 sm:py-24 overflow-hidden bg-gradient-to-br from-white via-gray-50 to-teal-50">
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[500px] h-[500px] bg-teal-200/40 blur-[140px] top-[-120px] left-[-120px]"></div>
        <div className="absolute w-[500px] h-[500px] bg-cyan-200/40 blur-[140px] bottom-[-120px] right-[-120px]"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 order-2 md:order-1">
          <h1 className="text-3xl text-center md:text-start sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900">
            Meet <span className="bg-gradient-to-r from-teal-600 to-cyan-500 bg-clip-text text-transparent">Dr.{doctor.fullName}</span>
          </h1>
        <p className="text-gray-600 text-sm font-serif sm:text-base md:text-lg leading-relaxed">
  <span className="font-semibold text-gray-900">
    {doctor.specialization?.join(", ")}
  </span>{" "}
  specialist with{" "}
  <span className="font-semibold text-gray-900">
    {doctor.experience}+ years of clinical experience
  </span>{" "}
  delivering advanced, patient-focused healthcare with a strong commitment to accuracy, compassion, and modern medical practices.
</p>
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigate(`/appointment/${doctor.slug}`)} className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-700 to-teal-900 text-white font-semibold shadow-md hover:shadow-xl transition">
              Book Appointment
            </motion.button>
           <motion.a
  href={`https://wa.me/91${doctor.phone}?text=Hello Dr. ${doctor.fullName}, I want to book an appointment.`}
  target="_blank"
  rel="noopener noreferrer"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-white transition shadow-sm flex justify-center items-center text-center w-full sm:w-auto"
>
  Contact Doctor
</motion.a>
          </div>
        </motion.div>

        <motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  className="relative flex  justify-center order-1 md:order-2"
>
  <div className="relative">
    <img
      src={doctor.profilePhoto || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800"}
      alt={doctor.fullName}
      className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full object-cover object-top border-[8px] border-white shadow-2xl"
    />
  </div>
</motion.div>
      </div>
    </div>
  );
};

export default SeeHero;