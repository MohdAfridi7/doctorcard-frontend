import { useState } from "react";
import { toast } from "react-toastify";
import { createDoctorByAdmin } from "../../api/authApi";

export default function CreateDoctor() {

  const [form, setForm] = useState({
    fullName: "",
    email: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const toastId = toast.loading("Creating doctor...");

      const res = await createDoctorByAdmin(form);

      toast.update(toastId, {
        render: res.message || "Doctor created successfully",
        type: "success",
        isLoading: false,
        autoClose: 3000
      });

      setForm({
        fullName: "",
        email: ""
      });

    } catch (error) {

      toast.error(
        error.message || "Something went wrong"
      );

    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#081c1a] via-[#0d2d2a] to-[#0a1f1d] text-white p-6">

      <div className="w-full max-w-md bg-[#0f2f2c] border border-teal-400/20 rounded-xl shadow-2xl p-8">

        <h2 className="text-3xl font-bold text-center mb-6 text-teal-400">
          Create Doctor
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* NAME */}

          <div>
            <label className="text-sm text-gray-300">
              Doctor Name
            </label>

            <input
              type="text"
              name="fullName"
              placeholder="Dr. John Doe"
              value={form.fullName}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg bg-black/30 border border-gray-600 focus:border-teal-400 outline-none"
              required
            />
          </div>

          {/* EMAIL */}

          <div>
            <label className="text-sm text-gray-300">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="doctor@email.com"
              value={form.email}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg bg-black/30 border border-gray-600 focus:border-teal-400 outline-none"
              required
            />
          </div>

          {/* INFO MESSAGE */}

          <div className="text-sm text-gray-400 bg-black/30 p-3 rounded-lg">
            Doctor password will be generated automatically and sent to the doctor's email.
          </div>

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-500 hover:bg-teal-600 transition py-3 rounded-lg font-semibold shadow-lg"
          >
            {loading ? "Creating..." : "Create Doctor"}
          </button>

        </form>

      </div>

    </div>

  );
}