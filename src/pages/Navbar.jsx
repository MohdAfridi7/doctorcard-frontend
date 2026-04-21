import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
      <nav className="sticky top-0 z-50 bg-[rgba(250,250,247,0.92)] backdrop-blur-xl border-b border-gray-200 h-[68px] flex items-center justify-between px-4 md:px-10">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-serif text-lg font-bold">
          <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center text-white font-black">
            D
          </div>
          DoctorCard
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-2"></div>

        {/* Buttons */}
      <div className="hidden md:flex gap-2">

  {user ? (
    // ✅ LOGIN KE BAAD SIRF DASHBOARD
    <button
      onClick={() =>
        navigate(user.role === "admin" ? "/admin" : "/doctor")
      }
      className="border px-3 py-1 rounded-md"
    >
      Dashboard
    </button>
  ) : (
    // ❌ LOGIN NAHI → DONO BUTTON
    <>
      <Link to="/login">
        <button className="border px-3 py-1 rounded-md">
          Sign In
        </button>
      </Link>

      <Link to="/signup">
        <button className="bg-teal-500 text-white px-3 py-1 rounded-md">
          Get Started Free
        </button>
      </Link>
    </>
  )}

</div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(true)}
        >
          ☰
        </button>
      </nav>

      {/* 🔥 MOBILE SIDEBAR */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black z-40"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              className="fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-2xl p-6 flex flex-col gap-5"
            >
              <button
                className="text-xl self-end"
                onClick={() => setMenuOpen(false)}
              >
                ✕
              </button>

              <hr />

              {user ? (
                <>
                  {/* ✅ DASHBOARD ONLY */}
                  <button
                    onClick={() => {
                      navigate(
                        user.role === "admin" ? "/admin" : "/doctor"
                      );
                      setMenuOpen(false);
                    }}
                    className="w-full border py-2 rounded-md"
                  >
                    Dashboard
                  </button>

                  {/* ✅ KEEP GET STARTED */}
                  <Link onClick={() => setMenuOpen(false)} to="/signup">
                    <button className="w-full bg-teal-500 text-white py-2 rounded-md">
                      Get Started Free
                    </button>
                  </Link>
                </>
              ) : (
                <>
                  <Link onClick={() => setMenuOpen(false)} to="/login">
                    <button className="w-full border py-2 rounded-md">
                      Sign In
                    </button>
                  </Link>

                  <Link onClick={() => setMenuOpen(false)} to="/signup">
                    <button className="w-full bg-teal-500 text-white py-2 rounded-md">
                      Get Started Free
                    </button>
                  </Link>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}