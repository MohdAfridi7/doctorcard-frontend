import { useState } from "react";

export default function ContactAdmin() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <section className="bg-teal-600 px-4 md:px-14 py-16 text-white min-h-screen">

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

        {/* 🔥 LEFT CONTENT */}
        <div>
          <p className="text-[10px] tracking-[2px] uppercase text-white/50 mb-3 font-mono">
            Support
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            We're here to help you succeed 🚀
          </h2>

          <p className="text-white/70 text-sm md:text-base mb-6">
            Agar aapko kisi bhi feature, payment, ya profile setup me issue aa raha hai,
            to humse directly contact karein. Hamari team jaldi reply karegi.
          </p>

          {/* FEATURES */}
          <div className="space-y-3 text-sm text-white/80">
            <p>✔ Fast response within 24 hours</p>
            <p>✔ Technical & payment support</p>
            <p>✔ Personalized help for your profile</p>
          </div>
        </div>

        {/* 🔥 RIGHT FORM (DARK CARD) */}
        <div className="bg-[#0b1f1d] border border-white/10 rounded-xl p-6 shadow-lg">

          <h3 className="text-lg font-semibold mb-4 text-white">
            Contact Admin
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* NAME */}
            <input
              placeholder="Your Name"
              className="w-full p-3 rounded-lg bg-[#112f2c] border border-teal-500/20 text-white placeholder-gray-400 outline-none focus:border-teal-400"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            {/* EMAIL */}
            <input
              placeholder="Your Email"
              className="w-full p-3 rounded-lg bg-[#112f2c] border border-teal-500/20 text-white placeholder-gray-400 outline-none focus:border-teal-400"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            
             {/* PHONE */}
            <input
              placeholder="Your Phone"
              className="w-full p-3 rounded-lg bg-[#112f2c] border border-teal-500/20 text-white placeholder-gray-400 outline-none focus:border-teal-400"
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            {/* MESSAGE */}
            <textarea
              rows="4"
              placeholder="Describe your issue..."
              className="w-full p-3 rounded-lg bg-[#112f2c] border border-teal-500/20 text-white placeholder-gray-400 outline-none focus:border-teal-400"
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />

            {/* BUTTON */}
            <button className="w-full bg-teal-500 text-black font-medium py-3 rounded-lg hover:bg-teal-400 transition">
              Send Message
            </button>

          </form>

        </div>

      </div>

    </section>
  );
}