import {
  FaStar,
  FaMapMarkerAlt,
  FaChalkboardTeacher,
  FaSearch,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

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
      .catch(() => setLoading(false));
  }, [axiosSecure]);

  const query = search.toLowerCase();

  const filtered = tutors.filter(
    (t) =>
      t.name?.toLowerCase().includes(query) ||
      t.subjectSpecialization?.join(" ").toLowerCase().includes(query)
  );

  return (
    <main className="bg-blue-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Find Tutors
        </h1>

        <div className="mb-10 max-w-xl mx-auto">
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur shadow-md">
            <FaSearch className="text-blue-500" />
            <input
              type="text"
              placeholder="Search by name or subject..."
              className="w-full bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {loading && (
          <p className="text-center text-gray-600 dark:text-gray-400">
            Loading tutors...
          </p>
        )}

        {!loading && filtered.length === 0 && (
          <p className="text-center text-gray-600 dark:text-gray-400">
            No tutors found.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((t) => (
            <div
              key={t._id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-5 flex flex-col"
            >
              <div className="flex gap-4">
                <img
                  src={t.tutor_image}
                  alt={t.name}
                  className="w-20 h-20 object-cover rounded-xl"
                />

                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {t.name}
                  </h2>

                  <p className="mt-1 flex items-center gap-1 text-gray-600 dark:text-gray-300 text-sm">
                    <FaChalkboardTeacher className="text-blue-500" />
                    {t.subjectSpecialization?.join(", ")}
                  </p>

                  <p className="flex items-center gap-1 text-gray-600 dark:text-gray-300 text-sm">
                    <FaMapMarkerAlt className="text-blue-500" />
                    {t.location}
                  </p>

                  <p className="flex items-center gap-1 text-yellow-500 font-semibold text-sm">
                    <FaStar /> {t.rating}
                  </p>

                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Experience: {t.experienceYears} Years
                  </p>
                </div>
              </div>

              <Link
                to={`/tutors/${t._id}`}
                className="mt-5 text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-medium transition"
              >
                View Profile
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
