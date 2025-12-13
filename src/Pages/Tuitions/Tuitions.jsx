import { useEffect, useMemo, useState } from "react";
import TuitionCard from "../../Components/TuitionCard/TuitionCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";

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
        setAllTuitions(res.data.tuitions || []);
        setTuitions(res.data.tuitions || []);
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
        setTuitions(res.data.tuitions || []);
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

  if (loading) return <p className="text-center py-10">Loading tuitions...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl md:text-4xl mt-5 text-center font-bold">
        All Tuitions
      </h2>
      <p className="text-center mb-10 mt-3 text-gray-600 max-w-2xl mx-auto">
        Browse available tuitions by class, subject, location, and budget.
      </p>

      <div className="mb-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <select
          name="course"
          value={filters.course}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        >
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course} value={course}>
              {course}
            </option>
          ))}
        </select>

        <select
          name="subject"
          value={filters.subject}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        >
          <option value="">Select Subject</option>
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={filters.location}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="salaryMin"
          placeholder="Min Salary"
          value={filters.salaryMin}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="salaryMax"
          placeholder="Max Salary"
          value={filters.salaryMax}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        />
      </div>

      {currentTuitions.length === 0 ? (
        <p className="text-center py-10">No tuitions match your filters.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentTuitions.map((item) => (
            <TuitionCard key={item._id} tuition={item} />
          ))}
        </div>
      )}

      {tuitions.length > tuitionsPerPage && (
        <div className="flex justify-center mt-8 gap-2">
          {Array.from(
            { length: Math.ceil(tuitions.length / tuitionsPerPage) },
            (_, i) => i + 1
          ).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded border ${
                currentPage === page
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
