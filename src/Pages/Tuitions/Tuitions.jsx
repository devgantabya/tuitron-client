import { useEffect, useState, useMemo } from "react";
import TuitionCard from "../../Components/TuitionCard/TuitionCard";

export default function Tuitions() {
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    course: "",
    subject: "",
    location: "",
    salaryMin: "",
    salaryMax: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const tuitionsPerPage = 8;

  useEffect(() => {
    const fetchTuitions = async () => {
      try {
        const url = `${import.meta.env.VITE_BASE_URL}/tuitions`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch tuitions");

        const data = await res.json();
        setTuitions(data.tuitions || []);
      } catch (err) {
        console.error(err);
        setTuitions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTuitions();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const courses = useMemo(() => {
    const all = tuitions.map((t) => t.course);
    return Array.from(new Set(all));
  }, [tuitions]);

  const subjects = useMemo(() => {
    const all = tuitions.map((t) => t.subject);
    return Array.from(new Set(all));
  }, [tuitions]);

  const filteredTuitions = useMemo(() => {
    return tuitions.filter((t) => {
      const courseMatch = filters.course ? t.course === filters.course : true;
      const subjectMatch = filters.subject
        ? t.subject === filters.subject
        : true;

      const locationMatch = filters.location
        ? t.contact?.location
            ?.toLowerCase()
            .includes(filters.location.toLowerCase())
        : true;

      const salaryValue =
        typeof t.salary === "number" ? t.salary : Number(t.salary);
      const salaryMatch =
        (!filters.salaryMin || salaryValue >= Number(filters.salaryMin)) &&
        (!filters.salaryMax || salaryValue <= Number(filters.salaryMax));

      return courseMatch && subjectMatch && locationMatch && salaryMatch;
    });
  }, [tuitions, filters]);

  const indexOfLast = currentPage * tuitionsPerPage;
  const indexOfFirst = indexOfLast - tuitionsPerPage;
  const currentTuitions = filteredTuitions.slice(indexOfFirst, indexOfLast);

  if (loading) return <p className="text-center py-10">Loading tuitions...</p>;
  if (!tuitions.length)
    return <p className="text-center py-10">No tuitions available.</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl md:text-4xl mt-5 text-center font-bold text-gray-900 dark:text-white">
        All Tuitions
      </h2>
      <p className="text-center mb-11 mt-3 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Browse all available tuitions by class, subject, location, and budget.
      </p>

      <div className="mb-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <select
          name="course"
          value={filters.course}
          onChange={handleFilterChange}
          className="border p-2 rounded w-full"
        >
          <option value="">Select Course</option>
          {courses.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          name="subject"
          value={filters.subject}
          onChange={handleFilterChange}
          className="border p-2 rounded w-full"
        >
          <option value="">Select Subject</option>
          {subjects.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={filters.location}
          onChange={handleFilterChange}
          className="border p-2 rounded w-full"
        />

        <input
          type="number"
          name="salaryMin"
          placeholder="Min Salary"
          value={filters.salaryMin}
          onChange={handleFilterChange}
          className="border p-2 rounded w-full"
        />

        <input
          type="number"
          name="salaryMax"
          placeholder="Max Salary"
          value={filters.salaryMax}
          onChange={handleFilterChange}
          className="border p-2 rounded w-full"
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

      {filteredTuitions.length > tuitionsPerPage && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from(
            { length: Math.ceil(filteredTuitions.length / tuitionsPerPage) },
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
