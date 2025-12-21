import {
  FaStar,
  FaMapMarkerAlt,
  FaChalkboardTeacher,
  FaSearch,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxiosSecure from "./../../hooks/useAxiosSecure";

export default function Tutors() {
  const [search, setSearch] = useState("");
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get("/tutors")
      .then((res) => {
        setTutors(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [axiosSecure]);

  const query = search.toLowerCase();

  const filtered = tutors.filter(
    (t) =>
      t.name?.toLowerCase().includes(query) ||
      t.subjectSpecialization?.join(" ").toLowerCase().includes(query)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Find Tutors</h1>

      <div className="flex items-center gap-2 border rounded-lg px-3 py-2 mb-8 bg-white dark:bg-gray-800">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search tutors by name or subject..."
          className="w-full bg-transparent outline-none"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading && <p className="text-gray-600">Loading tutors...</p>}

      <div className="grid md:grid-cols-3 gap-6 min-h-[250px]">
        {!loading && filtered.length === 0 && (
          <p className="text-gray-600 dark:text-gray-300">No tutors found.</p>
        )}

        {filtered.map((t) => (
          <div
            key={t._id}
            className="p-5 border rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition"
          >
            <div className="flex gap-4">
              <div>
                <img
                  src={t.tutor_image}
                  alt={t.name}
                  className="w-20 h-full object-cover rounded-lg mb-3"
                />
              </div>

              <div>
                <h2 className="text-xl font-bold mb-1">{t.name}</h2>

                <p className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                  <FaChalkboardTeacher /> {t.subjectSpecialization?.join(", ")}
                </p>

                <p className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                  <FaMapMarkerAlt /> {t.location}
                </p>

                <p className="flex items-center gap-1 text-yellow-500 font-semibold">
                  <FaStar /> {t.rating}
                </p>

                <p className="mt-1 text-gray-600 dark:text-gray-300">
                  Experience: {t.experienceYears} Years
                </p>
              </div>
            </div>

            <Link
              to={`/tutors/${t._id}`}
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
