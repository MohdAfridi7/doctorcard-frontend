import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";

const Counter = ({ value, suffix, start }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.floor(latest));

  useEffect(() => {
    if (start) {
      const controls = animate(count, value, {
        duration: 2,
        ease: "easeOut"
      });
      return controls.stop;
    }
  }, [start, value]);

  return (
    <span>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
};

const Achievements = ({ doctor }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const items = [
    { number: 1000, suffix: "+", title: "Successful Treatments", desc: "Proven results with safe, effective and modern medical care." },
    { number: 500, suffix: "+", title: "Happy Patients", desc: "Trusted by thousands of patients across the country." },
    { number: Number(doctor?.experience) || 15, suffix: "+", title: "Years Experience", desc: "Delivering quality healthcare with expertise and care." }
  ];

  return (
    <div ref={ref} className="mt-20 px-4 sm:px-6">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
        Achievements & Milestones
      </h2>

      <p className="text-gray-600 text-center max-w-xl sm:max-w-2xl mx-auto mb-10 sm:mb-12 text-sm sm:text-base">
        Recognized for excellence in healthcare, patient satisfaction, and advanced medical practices.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ y: -8 }}
            className="relative group bg-white border border-gray-200 p-6 sm:p-7 rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal-100/40 via-transparent to-cyan-100/40 opacity-0 group-hover:opacity-100 transition duration-300"></div>
            <div className="absolute top-0 left-0 h-[3px] w-0 bg-gradient-to-r from-teal-600 to-cyan-500 group-hover:w-full transition-all duration-500"></div>

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-teal-600 to-cyan-500 bg-clip-text text-transparent">
                <Counter value={item.number} suffix={item.suffix} start={isInView} />
              </h2>

              <h3 className="text-base sm:text-lg font-semibold mt-3 text-gray-900 group-hover:text-teal-600 transition">
                {item.title}
              </h3>

              <div className="w-8 sm:w-10 h-[2px] bg-teal-500 mt-3 mb-3 group-hover:w-14 transition-all duration-300"></div>

              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;