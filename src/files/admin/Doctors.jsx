import { useState, useEffect } from "react";
import { getAllDoctors, toggleDoctorBlock } from "../../api/authApi";
import { toast } from "react-toastify";

export default function Doctors() {

  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 5;

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await getAllDoctors();
      setDoctors(res.doctors || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load doctors");
    }
  };

  // 🔍 SEARCH + FILTER
  const filtered = doctors.filter((d) => {

    const matchSearch =
      d.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      d.email?.toLowerCase().includes(search.toLowerCase());

    if (filter === "blocked") return d.isBlocked && matchSearch;
    if (filter === "active") return !d.isBlocked && matchSearch;

    return matchSearch;

  });

  // 🔥 PAGINATION
  const indexOfLast = currentPage * doctorsPerPage;
  const indexOfFirst = indexOfLast - doctorsPerPage;

  const currentDoctors = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / doctorsPerPage);

  // ⭐ PAGINATION (ONLY 3 BUTTONS)
  const pageNumbers = [];

  for (
    let i = Math.max(1, currentPage - 1);
    i <= Math.min(totalPages, currentPage + 1);
    i++
  ) {
    pageNumbers.push(i);
  }

  // 📊 STATS
  const total = doctors.length;
  const blocked = doctors.filter(d => d.isBlocked).length;
  const active = doctors.filter(d => !d.isBlocked).length;

  // 🚫 BLOCK / UNBLOCK
  const toggleBlock = async (id) => {

    try {

      await toggleDoctorBlock(id);

      setDoctors(prev =>
        prev.map(doc =>
          doc._id === id
            ? { ...doc, isBlocked: !doc.isBlocked }
            : doc
        )
      );

      toast.success("Doctor status updated");

    } catch (error) {

      console.error(error);
      toast.error("Something went wrong");

    }

  };

  return (
    <div className="p-4 md:p-6 text-white bg-[#0b1f1d] min-h-screen">

      <h1 className="text-xl md:text-2xl font-semibold mb-4">
        All Doctors
      </h1>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search doctor..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        className="mb-4 p-2 rounded bg-[#112f2c] w-full md:w-80"
      />

      {/* FILTER */}
      <div className="flex flex-wrap gap-3 mb-6">

        <button
          onClick={() => { setFilter("all"); setCurrentPage(1); }}
          className="px-3 py-1 bg-gray-700 rounded"
        >
          All ({total})
        </button>

        <button
          onClick={() => { setFilter("active"); setCurrentPage(1); }}
          className="px-3 py-1 bg-green-500 text-black rounded"
        >
          Active ({active})
        </button>

        <button
          onClick={() => { setFilter("blocked"); setCurrentPage(1); }}
          className="px-3 py-1 bg-red-500 rounded"
        >
          Blocked ({blocked})
        </button>

      </div>

      {/* TABLE */}
      <div className="bg-[#112f2c] border border-teal-500/20 rounded-xl overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="bg-[#0d2d2a] text-teal-300">
            <tr>
              <th className="p-3">S.No</th>
              <th className="p-3 text-left">Doctor</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Appointments</th>
               <th className="p-3 text-left">URLs</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>

            {currentDoctors.map((doc, index) => (

              <tr key={doc._id} className="border-t border-teal-500/10 hover:bg-[#0d2d2a] transition">

                <td className="p-3">
                  {(currentPage - 1) * doctorsPerPage + index + 1}
                </td>

                <td className="p-3">
                  <p className="font-semibold">{doc.fullName}</p>
                  <p className="text-gray-400 text-xs">{doc.email}</p>
                </td>

                <td className="p-3">{doc.phone || "N/A"}</td>

                <td className="p-3">{doc.totalAppointments || 0}</td>
                  {/* PROFILE URL */}
                  <td className="p-3">
                    {doc.slug ? (
                      <a
                        href={`${window.location.origin}/doctor/${doc.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className={`underline text-xs sm:text-sm ${
                          doc.isBlocked
                            ? "text-gray-500 line-through"
                            : "text-teal-400"
                        }`}
                      >
                        {doc.slug}
                      </a>
                    ) : (
                      <span className="text-gray-500">Not Generated</span>
                    )}
                  </td>

                <td className="p-3">
                  {doc.isBlocked ? (
                    <span className="text-red-400 text-xs">Blocked</span>
                  ) : (
                    <span className="text-green-400 text-xs">Active</span>
                  )}
                </td>

                <td className="p-3">

                  <button
                    onClick={() => toggleBlock(doc._id)}
                    className={`text-xs px-2 py-1 rounded transition ${
                      doc.isBlocked
                        ? "bg-green-500 text-black"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {doc.isBlocked ? "Unblock" : "Block"}
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* PAGINATION */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mt-4 text-sm text-gray-400">

        <p>
          Showing {indexOfFirst + 1}-
          {Math.min(indexOfLast, filtered.length)} of {filtered.length} doctors
        </p>

        <div className="flex flex-wrap justify-center gap-2">

          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-3 py-1 bg-gray-700 rounded disabled:opacity-40"
          >
            Prev
          </button>

          {pageNumbers.map((num) => (

            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={`px-3 py-1 rounded transition ${
                currentPage === num
                  ? "bg-teal-500 text-black scale-110"
                  : "bg-gray-700"
              }`}
            >
              {num}
            </button>

          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-3 py-1 bg-gray-700 rounded disabled:opacity-40"
          >
            Next
          </button>

        </div>

      </div>

    </div>
  );
}