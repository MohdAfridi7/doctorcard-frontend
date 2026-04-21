import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// ✅ API import
import { verifyOtp, resendOtp } from "../api/authApi";

export default function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "example@gmail.com";

  // ✅ 6 digit OTP
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);

  // ⏱ Timer
  useEffect(() => {
    let interval;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    if (timer === 0) setCanResend(true);

    return () => clearInterval(interval);
  }, [timer]);

  // 🔢 OTP input
  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // ✅ next focus
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  // ✅ VERIFY OTP
  const handleVerify = async () => {
    try {
      const enteredOtp = otp.join("");

      if (enteredOtp.length !== 6) {
        toast.error("Enter valid OTP");
        return;
      }

      setLoading(true);

      const res = await verifyOtp({
        email,
        otp: enteredOtp,
      });

      toast.success(res.message || "OTP verified");

      navigate("/login", { replace: true });

    } catch (err) {
      toast.error(err.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  // ✅ RESEND OTP
  const handleResend = async () => {
    try {
      setLoading(true);

      const res = await resendOtp({ email });

      toast.success(res.message || "OTP resent");

      setTimer(30);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);

    } catch (err) {
      toast.error(err.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
    bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 px-4">

      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl 
        p-6 md:p-8 w-full max-w-xs md:max-w-sm border border-gray-200"
      >

        {/* LOGO */}
        <div className="flex items-center gap-3 mb-5">
          <div className="bg-gradient-to-br from-teal-700 to-teal-900 
          text-white w-10 h-10 flex items-center justify-center 
          rounded-xl font-bold shadow-md">
            D
          </div>
          <h1 className="text-lg font-semibold tracking-wide">
            DoctorCard
          </h1>
        </div>

        {/* TITLE */}
        <h2 className="text-xl font-bold text-center">
          Verify OTP
        </h2>

        {/* EMAIL */}
        <p className="text-center text-sm text-gray-500 mt-1">
          Code sent to
        </p>
        <p className="text-center text-teal-700 font-semibold break-all">
          {email}
        </p>

        {/* OTP BOX (6 DIGIT) */}
        <div className="flex justify-center gap-3 mt-5">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              maxLength="1"
              value={digit}
              onChange={(e) =>
                handleChange(e.target.value, index)
              }
              className="w-12 h-12 text-center border border-gray-300 
              rounded-xl text-lg shadow-sm
              focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
          ))}
        </div>

        {/* TIMER / RESEND */}
        <div className="text-center text-sm mt-4">
          {canResend ? (
            <button
              onClick={handleResend}
              className="text-teal-700 font-semibold"
            >
              Resend OTP
            </button>
          ) : (
            <span className="text-gray-500">
              Resend in{" "}
              <span className="text-teal-700 font-semibold">
                {timer}s
              </span>
            </span>
          )}
        </div>

        {/* VERIFY BUTTON */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.02 }}
          onClick={handleVerify}
          disabled={loading}
          className="w-full mt-6 bg-gradient-to-r from-teal-700 to-teal-900 
          text-white py-2 rounded-lg shadow-lg"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </motion.button>

      </motion.div>
    </div>
  );
}