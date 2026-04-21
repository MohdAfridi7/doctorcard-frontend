import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import {
  getAppointments,
  confirmAppointment,
  cancelAppointment,
  rescheduleAppointment
} from "../../api/authApi";

export default function Appointments() {

  const [appointments, setAppointments] = useState([]);

  const [loading,setLoading] = useState(false);

  // 🔍 SEARCH
  const [search, setSearch] = useState("");

  // 🔥 FILTER
  const [filter, setFilter] = useState("all");

  // 🔥 PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 5;

  // 🔥 MODALS
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [reason, setReason] = useState("");
  const [actionType, setActionType] = useState("");

  const [showMessage, setShowMessage] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState("");

  const [showReasonModal, setShowReasonModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");

  // 🔥 GET APPOINTMENTS
  const fetchAppointments = async () => {

    try{

      setLoading(true);

      const data = await getAppointments();

      setAppointments(data.appointments || data);

    }catch(err){

      toast.error(err.message || "Failed to load appointments");

    }finally{

      setLoading(false);

    }

  };

  useEffect(()=>{

    fetchAppointments();

  },[]);

  // 🔍 FILTER + SEARCH
  const filteredAppointments = appointments.filter(a => {

    const name = a.patientName?.toLowerCase() || "";
    const email = a.email?.toLowerCase() || "";
    const phone = a.phone || "";

    const matchSearch =
      name.includes(search.toLowerCase()) ||
      email.includes(search.toLowerCase()) ||
      phone.includes(search);

    if (filter === "accepted") return a.status === "confirmed" && matchSearch;
    if (filter === "rejected") return a.status === "cancelled" && matchSearch;
    if (filter === "rescheduled") return a.status === "rescheduled" && matchSearch;

    return matchSearch;

  });

  // 🔥 PAGINATION
  const indexOfLast = currentPage * appointmentsPerPage;
  const indexOfFirst = indexOfLast - appointmentsPerPage;

  const currentAppointments = filteredAppointments.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredAppointments.length / appointmentsPerPage);

  const pageNumbers = [];

  for (
    let i = Math.max(1, currentPage - 1);
    i <= Math.min(totalPages, currentPage + 1);
    i++
  ) {
    pageNumbers.push(i);
  }

  // 🔥 STATS
  const total = appointments.length;
  const accepted = appointments.filter(a => a.status === "confirmed").length;
  const rejected = appointments.filter(a => a.status === "cancelled").length;
  const rescheduled = appointments.filter(a => a.status === "rescheduled").length;

  // 🔥 ACCEPT API
  const handleAccept = async (id) => {

    try{

      setLoading(true);

      await confirmAppointment(id);

      toast.success("Appointment confirmed");

      fetchAppointments();

    }catch(err){

      toast.error(err.message || "Confirm failed");

    }finally{

      setLoading(false);

    }

  };

  const openReject = (id) => {

    setSelectedId(id);
    setActionType("reject");
    setShowModal(true);

  };

  const openReschedule = (id) => {

    setSelectedId(id);
    setActionType("reschedule");
    setShowModal(true);

  };

  // 🔥 SUBMIT ACTION
const handleSubmit = async () => {

  // 🔴 Reject Validation
  if (actionType === "reject") {

    if (!reason || reason.trim() === "") {
      toast.error("Please enter cancel reason");
      return;
    }

  }

  // 🔴 Reschedule Validation
  if (actionType === "reschedule") {

    if (!newDate) {
      toast.error("Please select new date");
      return;
    }

    if (!newTime) {
      toast.error("Please select new time");
      return;
    }

    if (!reason || reason.trim() === "") {
      toast.error("Please enter reschedule reason");
      return;
    }

  }

  try {

    setLoading(true);

    if (actionType === "reject") {

      await cancelAppointment(selectedId, { reason });

      toast.success("Appointment cancelled");

    }

    if (actionType === "reschedule") {

      await rescheduleAppointment(selectedId, {
        date: newDate,
        time: newTime,
        reason
      });

      toast.success("Appointment rescheduled");

    }

    fetchAppointments();

    setShowModal(false);
    setReason("");
    setNewDate("");
    setNewTime("");

  } catch (err) {

    toast.error(err.message || "Action failed");

  } finally {

    setLoading(false);

  }

};

  const openMessage = (msg) => {

    setSelectedMessage(msg);
    setShowMessage(true);

  };

  const openReason = (r) => {

    setSelectedReason(r);
    setShowReasonModal(true);

  };

  return (

    <div className="p-4 md:p-6 text-white bg-[#0b1f1d] min-h-screen">

      <h1 className="text-xl md:text-2xl font-semibold mb-4">
        Appointments
      </h1>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search patient..."
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

        <button onClick={() => {setFilter("accepted"); setCurrentPage(1)}} className="px-3 py-1 bg-teal-500 text-black rounded">
          Accepted ({accepted})
        </button>

        <button onClick={() => {setFilter("rejected"); setCurrentPage(1)}} className="px-3 py-1 bg-red-500 rounded">
          Rejected ({rejected})
        </button>

        <button onClick={() => {setFilter("rescheduled"); setCurrentPage(1)}} className="px-3 py-1 bg-blue-500 rounded">
          Rescheduled ({rescheduled})
        </button>

      </div>

      {/* TABLE */}
      <div className="bg-[#112f2c] border border-teal-500/20 rounded-xl overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="bg-[#0d2d2a] text-teal-300">

            <tr>

              <th className="p-3">S.No</th>
              <th className="p-3 text-left">Patient</th>
              <th className="p-3 text-left">Contact</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Time</th>
              <th className="p-3 text-left">Message</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>

            </tr>

          </thead>

          <tbody>

            {currentAppointments.map((appt, index) => (

              <tr key={appt._id || appt.id} className="border-t border-teal-500/10">

                <td className="p-3">
                  {(currentPage - 1) * appointmentsPerPage + index + 1}
                </td>

                <td className="p-3">

                  <p className="font-semibold">{appt.patientName}</p>

                  <p className="text-gray-400 text-xs">{appt.patientEmail}</p>

                </td>

                <td className="p-3">{appt.phone}</td>
                <td className="p-3">{appt.date}</td>
                <td className="p-3">{appt.time}</td>

                <td className="p-3 max-w-[200px]">

                  <p className="text-xs line-clamp-2">{appt.message}</p>

                  <button
                    onClick={() => openMessage(appt.message)}
                    className="text-teal-300 text-xs underline"
                  >
                    View All
                  </button>

                </td>

                <td className="p-3">

                  <span className="text-xs px-2 py-1 rounded bg-teal-500/20">
                    {appt.status}
                  </span>

                  {appt.reason && (

                    <div className="mt-1 max-w-[180px]">

                      <p className="text-xs text-red-300 line-clamp-2 break-words">
                        {appt.reason}
                      </p>

                      <button
                        onClick={() => openReason(appt.reason)}
                        className="text-teal-300 text-xs underline"
                      >
                        View More
                      </button>

                    </div>

                  )}

                </td>

                <td className="p-3 flex gap-2 flex-wrap">

                  <button
                    onClick={() => handleAccept(appt._id || appt.id)}
                    disabled={loading}
                    className="bg-teal-500 text-black px-2 py-1 rounded text-xs"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => openReject(appt._id || appt.id)}
                    className="bg-red-500/20 text-red-300 px-2 py-1 rounded text-xs"
                  >
                    Reject
                  </button>

                  <button
                    onClick={() => openReschedule(appt._id || appt.id)}
                    className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs"
                  >
                    Reschedule
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
          {Math.min(indexOfLast, filteredAppointments.length)} of {filteredAppointments.length} appointments
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

      {/* REASON MODAL */}
      {showReasonModal && (

        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">

          <div className="bg-[#112f2c] p-6 rounded-xl w-[90%] max-w-lg">

            <p className="mb-4 whitespace-pre-wrap break-words">
              {selectedReason}
            </p>

            <button
              onClick={() => setShowReasonModal(false)}
              className="w-full bg-teal-500 py-2 rounded text-black"
            >
              Close
            </button>

          </div>

        </div>

      )}

      {/* ACTION MODAL */}
      {showModal && (

        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">

          <div className="bg-[#112f2c] p-6 rounded-xl w-80">

            {actionType === "reschedule" && (

              <>

                <input
                  type="date"
                  className="w-full mb-3 p-2 bg-[#0d2d2a]"
                  
                  onChange={(e) => setNewDate(e.target.value)}
                />

                <input
                  type="time"
                  className="w-full mb-3 p-2 bg-[#0d2d2a]"
                  required
                  onChange={(e) => setNewTime(e.target.value)}
                />

              </>

            )}

            <textarea
              placeholder="Enter reason..."
              className="w-full mb-3 p-2 bg-[#0d2d2a]"
              onChange={(e) => setReason(e.target.value)}
            />

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-teal-500 py-2 rounded text-black"
            >
              {loading ? "Processing..." : "Submit"}
            </button>

          </div>

        </div>

      )}

    </div>
  );
}
