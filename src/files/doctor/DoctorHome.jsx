import { useEffect, useState } from "react";
import { getDashboardStats } from "../../api/authApi";

export default function DoctorHome() {

  const [stats, setStats] = useState(null);
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {

      const res = await getDashboardStats();

      setStats(res);
      setRecentEnquiries(res.recentEnquiries || []);

    } catch (error) {
      console.log(error);
    }
  };

  if (!stats) {
    return <p className="text-white p-6">Loading...</p>;
  }

  return (
    <div className="p-4 sm:p-6 text-white bg-gradient-to-br from-[#0b1f1d] to-[#0d2d2a] min-h-full">

      <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
        Dashboard <span className="text-teal-300">Namaste, {stats.doctorName} Ji 🙏</span>
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

        {[
          { title: "PROFILE VIEWS", value: stats.profileViews, sub: "Total views" },
          { title: "TOTAL ENQUIRIES", value: stats.totalEnquiries, sub: "All enquiries" },
          { title: "TOTAL APPOINTMENTS", value: stats.totalAppointments, sub: "Total booked" },
          { title: "PENDING APPOINTMENTS", value: stats.pendingAppointments, sub: "Reply soon" },
        ].map((card, i) => (
          <div
            key={i}
            className="bg-[#112f2c] border border-teal-500/20 rounded-xl p-4 shadow-md hover:border-teal-400 transition"
          >
            <p className="text-gray-400 text-xs sm:text-sm">{card.title}</p>
            <h2 className="text-lg sm:text-xl mt-2">{card.value}</h2>
            <p className="text-teal-300 text-xs sm:text-sm">{card.sub}</p>
          </div>
        ))}

      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Recent Enquiries */}
        <div className="lg:col-span-2 bg-[#112f2c] border border-teal-500/20 rounded-xl p-4 sm:p-5">

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
            <h2 className="text-base sm:text-lg font-semibold">
              Recent Enquiries
            </h2>

            <span
              onClick={() => window.location.href="/doctor/enquiries"}
              className="text-teal-300 text-sm cursor-pointer hover:underline"
            >
              See all →
            </span>
          </div>

          {recentEnquiries.length === 0 ? (
            <p className="text-gray-400 text-center mt-6 text-sm">
              No enquiries yet
            </p>
          ) : (

            <div className="space-y-3">

              {recentEnquiries.map((enq) => (

                <div
                  key={enq._id}
                  className="bg-black/30 p-3 rounded-lg"
                >

                  <p className="font-medium">{enq.name}</p>

                  <p className="text-xs text-gray-300">
                    {enq.message}
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    {enq.email} • {enq.phone}
                  </p>

                </div>

              ))}

            </div>

          )}

        </div>

        {/* Profile Preview */}
        <div className="bg-[#112f2c] border border-teal-500/20 rounded-xl p-4 sm:p-5">

          <h2 className="text-base sm:text-lg font-semibold mb-4">
            Profile Preview
          </h2>

          <div className="bg-gradient-to-br from-teal-600 to-teal-900 p-4 rounded-xl">

            <h3 className="font-semibold">
              Dr. {stats.doctorName}
            </h3>

            <div className="mt-3 flex justify-between items-center bg-black/30 p-2 rounded">

              <span className="text-xs break-all">
               {window.location.origin} {stats.profileUrl}
              </span>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${window.location.origin}${stats.profileUrl}`
                  );
                  setCopied(true);

                  setTimeout(() => {
                    setCopied(false);
                  }, 2000);
                }}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all duration-300 
                ${copied
                    ? "bg-green-500 scale-105"
                    : "bg-gradient-to-r from-teal-400 to-emerald-500 hover:scale-105 hover:shadow-md"
                  }`}
              >
                {copied ? "✓" : "Copy"}
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}