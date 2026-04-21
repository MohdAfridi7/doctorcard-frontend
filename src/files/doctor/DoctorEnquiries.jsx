import { useState, useEffect } from "react";
import { getDoctorEnquiries, updateEnquiryStatus } from "../../api/authApi";

export default function DoctorEnquiries() {

  const [enquiries, setEnquiries] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const enquiriesPerPage = 5;

  const [showMessage, setShowMessage] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState("");

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const res = await getDoctorEnquiries();
      setEnquiries(res || []);
    } catch (error) {
      console.error(error);
    }
  };

  // 🔍 FILTER + SEARCH
  const filtered = enquiries.filter((e) => {

    const matchSearch =
      e.name?.toLowerCase().includes(search.toLowerCase()) ||
      e.email?.toLowerCase().includes(search.toLowerCase());

    if (filter === "read") return e.status === "read" && matchSearch;
    if (filter === "unread") return e.status === "unread" && matchSearch;

    return matchSearch;

  });

  // 🔥 PAGINATION
  const indexOfLast = currentPage * enquiriesPerPage;
  const indexOfFirst = indexOfLast - enquiriesPerPage;

  const currentEnquiries = filtered.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filtered.length / enquiriesPerPage);

  const pageNumbers = [];

  for (
    let i = Math.max(1, currentPage - 1);
    i <= Math.min(totalPages, currentPage + 1);
    i++
  ) {
    pageNumbers.push(i);
  }

  // 🔥 STATS
  const total = enquiries.length;
  const read = enquiries.filter(e => e.status === "read").length;
  const unread = enquiries.filter(e => e.status === "unread").length;

  const toggleStatus = async (id, currentStatus) => {

    const newStatus = currentStatus === "read" ? "unread" : "read";

    try {

      await updateEnquiryStatus(id, { status: newStatus });

      setEnquiries(prev =>
        prev.map(item =>
          item._id === id
            ? { ...item, status: newStatus }
            : item
        )
      );

    } catch (error) {
      console.error(error);
    }

  };

  const openMessage = (msg) => {
    setSelectedMessage(msg);
    setShowMessage(true);
  };

  return (

    <div className="p-4 md:p-6 text-white bg-[#0b1f1d] min-h-screen">

      <h1 className="text-xl md:text-2xl font-semibold mb-4">
        Enquiries
      </h1>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search enquiry..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        className="mb-4 p-2 rounded bg-[#112f2c] w-full md:w-80"
      />

      {/* FILTER */}
      <div className="flex flex-wrap gap-3 mb-6">

        <button onClick={() => {setFilter("all"); setCurrentPage(1)}} className="px-3 py-1 bg-gray-700 rounded">
          All ({total})
        </button>

        <button onClick={() => {setFilter("read"); setCurrentPage(1)}} className="px-3 py-1 bg-teal-500 text-black rounded">
          Read ({read})
        </button>

        <button onClick={() => {setFilter("unread"); setCurrentPage(1)}} className="px-3 py-1 bg-red-500 rounded">
          Unread ({unread})
        </button>

      </div>

      {/* TABLE */}
      <div className="bg-[#112f2c] border border-teal-500/20 rounded-xl overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="bg-[#0d2d2a] text-teal-300">
            <tr>
              <th className="p-3">S.No</th>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Message</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>

            {currentEnquiries.map((item, index) => (

              <tr key={item._id} className="border-t border-teal-500/10">

                <td className="p-3">
                  {(currentPage - 1) * enquiriesPerPage + index + 1}
                </td>

                <td className="p-3">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-gray-400 text-xs">{item.email}</p>
                </td>

                <td className="p-3">
                  <p className="font-semibold">{item.phone}</p>
                </td>

                <td className="p-3 max-w-[200px]">
                  <p className="text-xs line-clamp-2">{item.message}</p>
                  <button
                    onClick={() => openMessage(item.message)}
                    className="text-teal-300 text-xs underline"
                  >
                    View All
                  </button>
                </td>

                <td className="p-3">
                  <button
                    onClick={() => toggleStatus(item._id, item.status)}
                    className={`text-xs px-2 py-1 rounded ${
                      item.status === "read"
                        ? "bg-teal-500/20 text-teal-300"
                        : "bg-red-500/20 text-red-300"
                    }`}
                  >
                    {item.status}
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
          {Math.min(indexOfLast, filtered.length)} of {filtered.length} enquiries
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

      {/* MESSAGE MODAL */}
      {showMessage && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-[#112f2c] p-6 rounded-xl w-[90%] max-w-lg">
            <p className="mb-4 whitespace-pre-wrap break-words">
              {selectedMessage}
            </p>
            <button
              onClick={() => setShowMessage(false)}
              className="w-full bg-teal-500 py-2 rounded text-black"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}