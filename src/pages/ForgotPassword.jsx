import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  resendResetOtp,
  verifyResetOtp,
  resetPassword
} from "../api/authApi";

export default function ForgotPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const [inputValue, setInputValue] = useState(
    location.state?.email || ""
  );

  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const inputStyle =
    "w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition text-sm shadow-sm";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // ✅ FIXED SEND OTP
  const sendOtp = async () => {
    try {
      if (!inputValue) {
        toast.error("Email is required");
        return false;
      }

      if (!emailRegex.test(inputValue)) {
        toast.error("Enter valid email");
        return false;
      }

      setLoading(true);

      await resendResetOtp({ email: inputValue });

      toast.success("OTP sent");
      return true;

    } catch (err) {
      toast.error(err.message || "Failed to send OTP");
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let interval;

    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    if (timer === 0) setCanResend(true);

    return () => clearInterval(interval);
  }, [step, timer]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleVerify = async () => {
    try {
      const enteredOtp = otp.join("");

      if (enteredOtp.length !== 6) {
        toast.error("Enter valid OTP");
        return;
      }

      setLoading(true);

      await verifyResetOtp({
        email: inputValue,
        otp: enteredOtp,
      });

      toast.success("OTP verified");
      setStep(3);

    } catch (err) {
      toast.error(err.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    try {
      if (!newPassword || !confirmPassword) {
        toast.error("All fields required");
        return;
      }

      if (newPassword.length < 6) {
        toast.error("Password must be at least 6 characters");
        return;
      }

      if (newPassword !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      setLoading(true);

      await resetPassword({
        email: inputValue,
        password: newPassword,
      });

      toast.success("Password reset successful");
      navigate("/login", { replace: true });

    } catch (err) {
      toast.error(err.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  const stepAnimation = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
    transition: { duration: 0.35 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
    bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 px-4">

      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl 
        p-6 md:p-8 w-full max-w-xs md:max-w-sm border border-gray-200"
      >

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

        <AnimatePresence mode="wait">

          {/* STEP 1 */}
          {step === 1 && (
            <motion.div key="step1" {...stepAnimation} className="space-y-4">

              <h2 className="text-xl font-bold">Forgot Password</h2>

              <div>
                <label className="text-xs text-gray-500">
                  EMAIL
                </label>
                <input
                  type="text"
                  value={inputValue}
                  placeholder="Enter your email"
                  onChange={(e) => setInputValue(e.target.value)}
                  className={inputStyle}
                />
              </div>

              <motion.button
                disabled={loading}
                onClick={async () => {
                  const success = await sendOtp();

                  if (success) {
                    setStep(2);
                    setTimer(30);
                    setCanResend(false);
                  }
                }}
                className="w-full bg-gradient-to-r from-teal-700 to-teal-900 
                text-white py-2 rounded-lg shadow-lg disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send OTP →"}
              </motion.button>

            </motion.div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <motion.div key="step2" {...stepAnimation} className="space-y-5">

              <h2 className="text-xl font-bold text-center">
                Verify OTP
              </h2>

              <p className="text-center text-sm text-gray-500">
                Enter 6 digit code
              </p>

              <div className="flex justify-center gap-3">
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

              <div className="text-center text-sm mt-4">
                {canResend ? (
                  <button
                    onClick={async () => {
                      const success = await sendOtp();
                      if (success) {
                        setTimer(30);
                        setCanResend(false);
                        setOtp(["", "", "", "", "", ""]);
                      }
                    }}
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

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="w-1/2 border py-2 rounded-lg text-sm hover:bg-gray-100"
                >
                  ← Back
                </button>

                <motion.button
                  disabled={loading}
                  onClick={handleVerify}
                  className="w-1/2 bg-gradient-to-r from-teal-700 to-teal-900 
                  text-white py-2 rounded-lg shadow-lg"
                >
                  {loading ? "Verifying..." : "Verify"}
                </motion.button>
              </div>

            </motion.div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <motion.div key="step3" {...stepAnimation} className="space-y-4">

              <h2 className="text-xl font-bold text-center">
                Reset Password
              </h2>

              <div>
                <label className="text-xs text-gray-500">
                  NEW PASSWORD
                </label>
                <input
                  type="password"
                  value={newPassword}
                  placeholder="Enter new password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={inputStyle}
                />
              </div>

              <div>
                <label className="text-xs text-gray-500">
                  CONFIRM PASSWORD
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  placeholder="Confirm new password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={inputStyle}
                />
              </div>

              <motion.button
                disabled={loading}
                onClick={handleReset}
                className="w-full bg-gradient-to-r from-teal-700 to-teal-900 
                text-white py-2 rounded-lg shadow-lg"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </motion.button>

            </motion.div>
          )}

        </AnimatePresence>

      </motion.div>
    </div>
  );
}