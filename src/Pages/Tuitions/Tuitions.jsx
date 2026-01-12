import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaMoneyBillWave, FaBook } from "react-icons/fa";
import TuitionCard from "../../Components/TuitionCard/TuitionCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Card from "./../../Components/UI/Card";

export default function Tuitions() {
  const axiosSecure = useAxiosSecure();

  const [allTuitions, setAllTuitions] = useState([]);
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    course: "",
    subject: "",
    location: "",
    salaryMin: "",
    salaryMax: "",
  });

  const [debouncedFilters, setDebouncedFilters] = useState(filters);
  const [currentPage, setCurrentPage] = useState(1);

  const tuitionsPerPage = 8;

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axiosSecure.get("/tuitions");
        setAllTuitions(res.data || []);
        setTuitions(res.data || []);
      } catch {
        setAllTuitions([]);
        setTuitions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [axiosSecure]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 500);
    return () => clearTimeout(handler);
  }, [filters]);

  useEffect(() => {
    const fetchFiltered = async () => {
      try {
        setLoading(true);
        const params = {
          ...debouncedFilters,
          salaryMin: debouncedFilters.salaryMin
            ? Number(debouncedFilters.salaryMin)
            : undefined,
          salaryMax: debouncedFilters.salaryMax
            ? Number(debouncedFilters.salaryMax)
            : undefined,
        };
        const res = await axiosSecure.get("/tuitions", { params });
        setTuitions(res.data || []);
      } catch {
        setTuitions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFiltered();
  }, [axiosSecure, debouncedFilters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const courses = useMemo(
    () => [...new Set(allTuitions.map((t) => t.course).filter(Boolean))],
    [allTuitions]
  );

  const subjects = useMemo(
    () => [...new Set(allTuitions.map((t) => t.subject).filter(Boolean))],
    [allTuitions]
  );

  const indexOfLast = currentPage * tuitionsPerPage;
  const indexOfFirst = indexOfLast - tuitionsPerPage;
  const currentTuitions = tuitions.slice(indexOfFirst, indexOfLast);

  if (loading)
    return (
      <p className="min-h-screen flex justify-center items-center text-gray-600 dark:text-gray-400">
        Loading tuitions...
      </p>
    );

  return (
    <main className="bg-blue-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white">
          All Tuitions
        </h2>

        <p className="text-center mt-3 mb-12 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Browse available tuitions by class, subject, location, and budget.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          <div className="relative">
            <FaBook className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
            <select
              name="course"
              value={filters.course}
              onChange={handleFilterChange}
              className="w-full pl-10 pr-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Courses</option>
              {courses.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <FaBook className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
            <select
              name="subject"
              value={filters.subject}
              onChange={handleFilterChange}
              className="w-full pl-10 pr-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Subjects</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={filters.location}
              onChange={handleFilterChange}
              className="w-full pl-10 pr-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <FaMoneyBillWave className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500" />
            <input
              type="number"
              name="salaryMin"
              placeholder="Min Salary"
              value={filters.salaryMin}
              onChange={handleFilterChange}
              className="w-full pl-10 pr-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <FaMoneyBillWave className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500" />
            <input
              type="number"
              name="salaryMax"
              placeholder="Max Salary"
              value={filters.salaryMax}
              onChange={handleFilterChange}
              className="w-full pl-10 pr-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </motion.div>

        {currentTuitions.length === 0 ? (
          <p className="text-center py-16 text-gray-600 dark:text-gray-400">
            No tuitions match your filters.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentTuitions.map((item) => (
              <Card key={item._id}>
                <TuitionCard tuition={item} />
              </Card>
            ))}
          </div>
        )}

        {tuitions.length > tuitionsPerPage && (
          <div className="flex justify-center mt-10 gap-2 flex-wrap">
            {Array.from(
              { length: Math.ceil(tuitions.length / tuitionsPerPage) },
              (_, i) => i + 1
            ).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-xl font-medium transition ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
