import {
  FaStar,
  FaMapMarkerAlt,
  FaChalkboardTeacher,
  FaSearch,
} from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router";

export default function Tutors() {
  const [search, setSearch] = useState("");

  const tutors = [
    {
      id: 1,
      name: "Ashikur Rahman",
      subject: "Mathematics",
      location: "Mirpur",
      rating: 4.8,
      experience: "3 Years",
    },
    {
      id: 2,
      name: "Nusrat Jahan",
      subject: "Biology",
      location: "Gulshan",
      rating: 4.9,
      experience: "5 Years",
    },
    {
      id: 3,
      name: "Mahmudul Hasan",
      subject: "English",
      location: "Dhanmondi",
      rating: 4.7,
      experience: "2 Years",
    },
  ];

  const query = search.toLowerCase();
  const filtered = tutors.filter(
    (t) =>
      t.name.toLowerCase().includes(query) ||
      t.subject.toLowerCase().includes(query)
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Find Tutors</h1>

      {/* Search */}
      <div className="flex items-center gap-2 border rounded-lg px-3 py-2 mb-8 bg-white dark:bg-gray-800">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search tutors by name or subject..."
          className="w-full bg-transparent outline-none"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Tutors Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {filtered.length === 0 && (
          <p className="text-gray-600 dark:text-gray-300">No tutors found.</p>
        )}

        {filtered.map((t) => (
          <div
            key={t.id}
            className="p-5 border rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-xl font-bold mb-1">{t.name}</h2>

            <p className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
              <FaChalkboardTeacher /> {t.subject}
            </p>

            <p className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
              <FaMapMarkerAlt /> {t.location}
            </p>

            <p className="flex items-center gap-1 text-yellow-500 font-semibold">
              <FaStar /> {t.rating}
            </p>

            <p className="mt-1 text-gray-600 dark:text-gray-300">
              Experience: {t.experience}
            </p>

            <Link
              to={`/tutor/${t.id}`}
              className="mt-4 block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              View Profile
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
