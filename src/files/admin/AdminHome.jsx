import { useEffect, useState } from "react";
import { getAdminDashboardStats } from "../../api/authApi";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function AdminHome() {
  const [stats, setStats] = useState(null);
  const [recentEnquiries, setRecentEnquiries] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await getAdminDashboardStats();

      setStats(res);
      setRecentEnquiries(res.recentEnquiries || []);
    } catch (error) {
      console.log(error);
    }
  };

  if (!stats) {
    return <p className="text-white p-6">Loading...</p>;
  }

  // Month mapping
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // ✅ SAFE MONTHLY DATA (IMPORTANT FIX)
  const monthlyChartData = Array.isArray(stats.doctorsMonthlyChart)
    ? stats.doctorsMonthlyChart.map((item) => ({
        name: monthNames[item._id - 1],
        value: item.totalDoctors,
      }))
    : [];

  return (
    <div className="p-4 sm:p-6 text-white bg-gradient-to-br from-[#0b1f1d] to-[#0d2d2a] min-h-full">

      {/* Header */}
      <h1 className="text-xl sm:text-2xl font-semibold mb-6">
        Dashboard{" "}
        <span className="text-teal-300">Namaste Admin 🙏</span>
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

        {[
          { title: "TOTAL DOCTORS", value: stats.totalDoctors },
          { title: "BLOCKED DOCTORS", value: stats.blockedDoctors },
          { title: "TOTAL ENQUIRIES", value: stats.totalEnquiries },
          { title: "UNREAD ENQUIRIES", value: stats.unreadEnquiries },
        ].map((card, i) => (
          <div
            key={i}
            className="bg-[#112f2c] border border-teal-500/20 rounded-xl p-4 hover:border-teal-400 transition"
          >
            <p className="text-gray-400 text-xs">{card.title}</p>
            <h2 className="text-xl mt-2 font-semibold">{card.value}</h2>
          </div>
        ))}
      </div>

      {/* MAIN SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">

        {/* 📩 Recent Enquiries (60%) */}
        <div className="lg:col-span-3 bg-[#112f2c] border border-teal-500/20 rounded-xl p-4">

          <h2 className="text-lg font-semibold mb-4">
            Recent Enquiries
          </h2>

          {recentEnquiries.length === 0 ? (
            <p className="text-gray-400 text-center">
              No enquiries yet
            </p>
          ) : (
            <div className="space-y-3">
              {recentEnquiries.map((enq) => (
                <div key={enq._id} className="bg-black/30 p-3 rounded-lg">
                  <p className="font-medium">{enq.name}</p>
                  <p className="text-xs text-gray-300">{enq.message}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {enq.email} • {enq.phone}
                  </p>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* 📊 Monthly Chart (40%) */}
        <div className="lg:col-span-2 bg-[#112f2c] border border-teal-500/20 rounded-xl p-4">

          <h2 className="text-lg font-semibold mb-4">
            Doctors Monthly Growth
          </h2>

          <div style={{ width: "100%", height: 350 }}>
            <ResponsiveContainer>
              <BarChart data={monthlyChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip />
                <Bar dataKey="value" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>

      </div>

    </div>
  );
}