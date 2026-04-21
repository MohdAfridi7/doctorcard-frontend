import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  Calendar,
  Users,
  Stethoscope,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../src/context/AuthContext";

export default function Sidebar({ role }) {
  const [open, setOpen] = useState(false);
  const { setUser } = useContext(AuthContext);
const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  setUser(null);
  navigate("/login", { replace: true });
};

 const doctorMenu = [
  { name: "Dashboard", path: "/doctor", icon: <LayoutDashboard size={18} /> },
  { name: "My Profile", path: "/doctor/profile", icon: <User size={18} /> },
  { name: "Appointments", path: "/doctor/appointments", icon: <Calendar size={18} /> },

  // ✅ NEW
  { name: "Enquiries", path: "/doctor/enquiries", icon: <Users size={18} /> },
  
];

  const adminMenu = [
    { name: "Dashboard", path: "/admin", icon: <LayoutDashboard size={18} /> },
    { name: "Enquiries", path: "/admin/enquiries", icon: <Users size={18} /> },
    { name: "Doctors", path: "/admin/doctors", icon: <Stethoscope size={18} /> },
    { name: "Create Doctor", path: "/admin/create-doctor", icon: <Stethoscope size={18} /> },
  ];

  const menu = role === "admin" ? adminMenu : doctorMenu;

  return (
    <>
      {/* 🔥 MOBILE TOP BAR */}
      <div className="md:hidden flex items-center gap-3 px-4 py-3 bg-[#0d2d2a] border-b border-teal-800">
        <button onClick={() => setOpen(true)}>
          <Menu size={22} />
        </button>
        <h2 className="text-teal-300 font-semibold">
          {role === "admin" ? "Admin Panel" : "Doctor Panel"}
        </h2>
      </div>

      {/* 🔥 OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* 🔥 SIDEBAR */}
      <div
        className={`
          fixed md:sticky md:top-0
          top-0 left-0 z-50
          h-screen w-64
          bg-[#0d2d2a] text-white
          flex flex-col
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* HEADER */}
        <div className="px-4 py-4 border-b border-teal-800 flex justify-between items-center">
          <h2 className="text-lg font-bold text-teal-300">
            {role === "admin" ? "Admin Panel" : "Doctor Panel"}
          </h2>

          <button className="md:hidden" onClick={() => setOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* MENU */}
        <ul className="flex-1 overflow-y-auto p-3 space-y-2">
          {menu.map((item, i) => (
            <li key={i}>
              <NavLink
  to={item.path}
  end={item.path === "/doctor" || item.path === "/admin"}
  onClick={() => setOpen(false)}
  className={({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
      isActive
        ? "bg-teal-600/20 border border-teal-500 text-teal-300"
        : "text-gray-300 hover:bg-teal-700/20"
    }`
  }
>
  {item.icon}
  {item.name}
</NavLink>
            </li>
          ))}
        </ul>

        {/* LOGOUT */}
        <div className="p-4 border-t border-teal-800">
          <button onClick={handleLogout} className="w-full text-left p-2 text-red-400 hover:bg-red-500/20 rounded">
            Logout
          </button>
        </div>
      </div>
    </>
  );
}