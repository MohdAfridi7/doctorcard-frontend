import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function DoctorProfile() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    fetch(`https://doctorecard-backend.onrender.com/doctor/${id}`)
      .then(res => res.json())
      .then(data => setDoctor(data));
  }, [id]);

  if (!doctor) return <h2 className="text-center mt-10">Loading...</h2>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">

        <h1 className="text-4xl font-bold text-indigo-600">
          {doctor.name}
        </h1>

        <p className="text-lg text-gray-500 mb-4">
          {doctor.specialization}
        </p>

        <div className="grid grid-cols-2 gap-4 mt-6">

          <div className="card">Experience: {doctor.experience}</div>
          <div className="card">Qualification: {doctor.qualification}</div>
          <div className="card">Clinic: {doctor.clinic}</div>
          <div className="card">Fees: ₹{doctor.fees}</div>

        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p>{doctor.about}</p>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          Timing: {doctor.timing}
        </div>

      </div>
    </div>
  );
}