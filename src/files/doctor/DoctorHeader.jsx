import { useNavigate } from "react-router-dom";
import { Share2, Edit, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { getDashboardStats } from "../../api/authApi";

export default function DoctorHeader() {

  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [profileUrl, setProfileUrl] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {

      const res = await getDashboardStats();

      setProfileUrl(res.profileUrl);

    } catch (error) {
      console.log(error);
    }
  };

  const handleShare = () => {

    const fullUrl = `${window.location.origin}${profileUrl}`;

    navigator.clipboard.writeText(fullUrl);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="sticky top-0 z-40 bg-[#112f2c] border-b border-teal-500/20 px-4 md:px-6 py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">

      {/* Left */}
      <h2 className="text-base sm:text-lg font-semibold text-teal-300">
        Doctor Dashboard
      </h2>

      {/* Right Buttons */}
      <div className="flex flex-wrap gap-2 sm:gap-3">

        {/* Edit Profile */}
        <button
          onClick={() => navigate("/doctor/profile")}
          className="flex items-center gap-2 bg-teal-600/20 border border-teal-500 text-teal-300 px-3 sm:px-4 py-2 rounded-lg hover:bg-teal-600/30 transition text-sm"
        >
          <Edit size={16} />
          <span className="hidden sm:inline">Edit Profile</span>
        </button>

        {/* Share Profile */}
        <button
          onClick={handleShare}
          className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg transition text-sm
          ${
            copied
              ? "bg-green-500 text-white"
              : "bg-teal-500 text-black hover:bg-teal-400"
          }`}
        >
          {copied ? <Check size={16} /> : <Share2 size={16} />}
          <span className="hidden sm:inline">
            {copied ? "Copied" : "Share Profile"}
          </span>
        </button>

      </div>

    </div>
  );
}