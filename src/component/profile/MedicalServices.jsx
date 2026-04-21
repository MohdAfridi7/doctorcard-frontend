import React from "react";
import { motion } from "framer-motion";

const MedicalServices = () => {
  const services = [
    { title: "General Consultation", desc: "Basic health checkups and doctor consultations for everyday medical needs." },
    { title: "Diagnostic Services", desc: "Blood tests, urine tests, and basic medical diagnostics for accurate reporting." },
    { title: "Emergency Care", desc: "Immediate medical attention for urgent health conditions and accidents." },
    { title: "OPD Services", desc: "Outpatient department services for routine treatment and follow-ups." },
    { title: "Vaccination", desc: "Routine immunization and preventive vaccines for all age groups." },
    { title: "Health Checkup Packages", desc: "Basic to full body health checkups for early disease detection." }
  ];

  return (
    <div className="mt-20 px-4 sm:px-6">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">Our Medical Services</h2>
      <p className="text-gray-600 text-center max-w-xl sm:max-w-2xl mx-auto mb-10 sm:mb-12 text-sm sm:text-base">
        Essential healthcare services available for patients with expert doctors and modern medical care.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
        {services.map((service, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }} whileHover={{ y: -8 }} className="relative group bg-white border border-gray-200 p-6 sm:p-7 rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-100/40 via-transparent to-cyan-100/40 opacity-0 group-hover:opacity-100 transition duration-300"></div>
            <div className="absolute top-0 left-0 h-[3px] w-0 bg-gradient-to-r from-teal-600 to-cyan-500 group-hover:w-full transition-all duration-500"></div>
            <div className="relative z-10">
              <h3 className="text-base sm:text-lg font-semibold mb-3 text-gray-900 group-hover:text-teal-600 transition">{service.title}</h3>
              <div className="w-8 sm:w-10 h-[2px] bg-teal-500 mb-3 group-hover:w-14 transition-all duration-300"></div>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{service.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MedicalServices;