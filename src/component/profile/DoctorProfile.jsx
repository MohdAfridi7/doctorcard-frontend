import React from "react";
import { motion } from "framer-motion";

const DoctorProfile = ({ doctor, navigate }) => {

  const formatTime = (time) => {
    if (!time) return "";

    const [hour, minute] = time.split(":");
    const date = new Date();
    date.setHours(hour, minute);

    return date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="mb-12 px-1 sm:px-2 md:px-2 font-body">

      {/* HEADER */}
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900">
          Doctor Profile
        </h2>

        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Complete professional details and consultation information
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* LEFT PROFILE */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="lg:col-span-3 bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition duration-300 relative overflow-hidden"
        >

          <div className="absolute inset-0 bg-gradient-to-br from-teal-100/40 via-transparent to-cyan-100/40 opacity-60"></div>

          <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-teal-600 to-cyan-500"></div>

          <div className="relative z-10">

            {/* DOCTOR NAME */}
            <div className="flex items-center gap-4 mb-5 flex-wrap sm:flex-nowrap">

              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-teal-600 to-cyan-500 text-white flex items-center justify-center font-bold text-lg shadow-md">
                {doctor.fullName?.charAt(0)}
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-semibold text-gray-900">
                  Dr. {doctor.fullName}
                </h2>

                <p className="text-gray-600 font-medium italic text-sm">
                  {doctor.specialization?.join(", ")}
                </p>
              </div>
            </div>

            {/* QUALIFICATION */}
            <div className="flex flex-wrap gap-2 mb-4">
              {doctor.qualification?.map((qual, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs font-medium rounded-full 
                  bg-gradient-to-r from-teal-50 to-cyan-50 
                  border border-teal-200 text-teal-700
                  shadow-sm hover:shadow-md 
                  hover:scale-105 transition-all duration-200"
                >
                  {qual.toUpperCase()}
                </span>
              ))}
            </div>

            {/* BIO */}
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-5">
              {doctor.bio ||
                "Experienced healthcare professional dedicated to delivering high-quality medical care using modern treatment methods and compassionate patient support."}
            </p>

            {/* AVAILABLE DAYS */}
            <div className="flex flex-wrap gap-2 mb-3">

              <span className="px-3 py-1 text-xs rounded-full bg-gray-100 border border-gray-200 text-gray-700">
                Available Days:-
              </span>

              {doctor.availableDays?.map((day, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs rounded-full bg-teal-50 border border-teal-200 text-teal-700"
                >
                  {day}
                </span>
              ))}

              <span className="px-3 py-1 text-xs rounded-full bg-gray-100 border border-gray-200 text-gray-700">
                Online Consultation:- {doctor.onlineConsultation ? "Available" : "Not Available"}
              </span>

            </div>


            {/* AVAILABLE DAYS */}
            <div className="flex flex-wrap gap-2 mb-6">

              <span className="px-3 py-1 text-xs rounded-full bg-gray-100 border border-gray-200 text-gray-700">
                Clinic Address:-
              </span>

              
                <span
                
                  className="px-3 py-1 text-xs rounded-full bg-teal-50 border border-teal-200 text-teal-700"
                >
                  {doctor.clinicAddress || "Not Provided"}
                </span>
         

              <span className="px-3 py-1 text-xs rounded-full bg-gray-100 border border-gray-200 text-gray-700">
                {formatTime(doctor.startTime)} - {formatTime(doctor.endTime)}
              </span>

            </div>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3">

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-700 to-teal-900 text-white font-semibold text-sm shadow-md hover:shadow-lg transition"
                onClick={() => navigate(`/appointment/${doctor.slug}`)}
              >
                Book Appointment
              </motion.button>

              <motion.a
                href={`https://wa.me/91${doctor.phone}?text=Hello Dr. ${doctor.fullName}, I want to book an appointment.`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-sm hover:bg-gray-100 transition flex justify-center items-center"
              >
                Contact Doctor
              </motion.a>

            </div>

          </div>
        </motion.div>

        {/* RIGHT CLINIC DETAILS */}
        <motion.div
          whileHover={{ y: -6 }}
          className="bg-white border border-gray-200 rounded-3xl p-6 shadow-md hover:shadow-xl transition duration-300"
        >

          <h3 className="font-heading text-center underline font-semibold text-lg mb-4 text-gray-900">
            Clinic Details
          </h3>

          <div className="space-y-3 text-sm">

            {[
              ["Consult Fee", `₹${doctor.consultationFee}`],
              ["Clinic Name", doctor.clinicName],
              ["Medical Reg No.", doctor.medicalRegNumber],
              ["State", doctor.state],
              ["City", doctor.city],
              ["Gender", doctor.gender],
              ["D.O.B", formatDate(doctor.dob)],
              [
                "Timing",
                `${formatTime(doctor.startTime)} - ${formatTime(doctor.endTime)}`,
              ],
            ].map((item, i) => (
              <div
                key={i}
                className="flex justify-between border-b border-gray-100 pb-1"
              >
                <span className="text-gray-900 font-bold">{item[0]}:-</span>
                <span className="text-gray-500 font-medium">{item[1]}</span>
              </div>
            ))}

          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2.5 rounded-xl w-full mt-4 bg-gradient-to-r from-teal-700 to-teal-900 text-white font-semibold text-sm shadow-md hover:shadow-lg transition"
            onClick={() => navigate(`/appointment/${doctor.slug}`)}
          >
            Book Appointment
          </motion.button>

        </motion.div>

      </div>
    </div>
  );
};

export default DoctorProfile;