import { FaSearch, FaMapMarkerAlt, FaUserTie } from "react-icons/fa";
import { useState } from "react";

export default function Tuitions() {
  const [search, setSearch] = useState("");

  const tuitions = [
    {
      id: 1,
      subject: "Mathematics",
      class: "Class 9-10",
      location: "Dhanmondi",
      tutor: "Zakaria Rahman",
      salary: "6000 BDT/month",
    },
    {
      id: 2,
      subject: "English",
      class: "Class 7-8",
      location: "Banani",
      tutor: "Farzana Ahmed",
      salary: "5500 BDT/month",
    },
    {
      id: 3,
      subject: "Physics",
      class: "College (HSC)",
      location: "Uttara",
      tutor: "Tariq Hasan",
      salary: "7000 BDT/month",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Available Tuitions</h1>

      <div className="flex items-center gap-2 border rounded-lg px-3 py-2 mb-8 bg-white dark:bg-gray-800">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search by subject, location..."
          className="w-full bg-transparent outline-none"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {tuitions
          .filter((t) => t.subject.toLowerCase().includes(search.toLowerCase()))
          .map((t) => (
            <div
              key={t.id}
              className="p-5 border rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold mb-2">{t.subject}</h2>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-semibold">Class:</span> {t.class}
              </p>

              <p className="flex items-center gap-1 text-gray-600 dark:text-gray-300 mt-1">
                <FaMapMarkerAlt /> {t.location}
              </p>

              <p className="flex items-center gap-1 text-gray-600 dark:text-gray-300 mt-1">
                <FaUserTie /> Tutor: {t.tutor}
              </p>

              <p className="mt-2 font-semibold">{t.salary}</p>

              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                Apply Now
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
