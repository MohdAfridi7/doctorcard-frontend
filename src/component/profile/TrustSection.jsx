import React from "react";
import { motion } from "framer-motion";

const TrustSection = () => {
  const features = [
    { title: "Expert Doctor Panel", desc: "Highly experienced specialists across multiple departments" },
    { title: "Advanced Operation Theaters", desc: "Modern surgical rooms with precision medical equipment" },
    { title: "AI Powered Diagnosis", desc: "Faster reports and accurate disease detection system" },
    { title: "Patient-Centric Care", desc: "Every treatment is personalized for best recovery results" }
  ];

  return (
    <div className="mt-28 px-4 sm:px-6 md:px-20 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[500px] h-[500px] bg-teal-200/30 blur-[140px] top-[-120px] left-[-120px]"></div>
        <div className="absolute w-[500px] h-[500px] bg-cyan-200/30 blur-[140px] bottom-[-120px] right-[-120px]"></div>
      </div>
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-14 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">Excellence in Healthcare You Can Trust</h2>
        <p className="text-gray-600 mt-4 sm:mt-5 max-w-3xl mx-auto text-sm sm:text-base">World-class doctors, advanced medical technology and patient-first care — everything designed for your safety and recovery.</p>
      </motion.div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 items-center">
        <motion.div initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="relative group">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
            <img src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=1200&q=80" className="w-full h-[300px] sm:h-[380px] md:h-[460px] object-cover group-hover:scale-105 transition duration-700" alt="doctor group" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 bg-white/90 backdrop-blur-xl px-4 sm:px-5 py-2 sm:py-3 rounded-xl sm:rounded-2xl shadow-lg border border-gray-200">
              <p className="text-[10px] sm:text-xs text-gray-600">ICU • Ambulance • Critical Support</p>
            </div>
          </div>
        </motion.div>
        <div className="space-y-6 sm:space-y-8">
          <div className="space-y-5 sm:space-y-6">
            {features.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }} className="relative pl-4 sm:pl-6 border-l-4 border-teal-500">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">{item.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSection;