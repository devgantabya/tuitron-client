import { useEffect, useState, useMemo } from "react";
import TuitionCard from "../../Components/TuitionCard/TuitionCard";

export default function Tuitions() {
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    class: "",
    subject: "",
    location: "",
    budgetMin: "",
    budgetMax: "",
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

  const classes = useMemo(() => {
    const allClasses = tuitions.map((t) => t.class_level);
    return Array.from(new Set(allClasses)).sort((a, b) => a - b);
  }, [tuitions]);

  const subjects = useMemo(() => {
    const allSubjects = tuitions.map((t) => t.subject);
    return Array.from(new Set(allSubjects));
  }, [tuitions]);

  const filteredTuitions = useMemo(() => {
    return tuitions.filter((t) => {
      const classMatch = filters.class ? t.class_level === filters.class : true;
      const subjectMatch = filters.subject
        ? t.subject === filters.subject
        : true;
      const locationMatch = filters.location
        ? t.location.toLowerCase().includes(filters.location.toLowerCase())
        : true;

      let budgetValue = 0;
      if (t.budget) {
        if (t.budget.$numberInt)
          budgetValue = parseInt(t.budget.$numberInt, 10);
        else if (t.budget.$numberDouble)
          budgetValue = parseFloat(t.budget.$numberDouble);
        else budgetValue = Number(t.budget);
      }

      const budgetMatch =
        (!filters.budgetMin || budgetValue >= Number(filters.budgetMin)) &&
        (!filters.budgetMax || budgetValue <= Number(filters.budgetMax));

      return classMatch && subjectMatch && locationMatch && budgetMatch;
    });
  }, [tuitions, filters]);

  const indexOfLast = currentPage * tuitionsPerPage;
  const indexOfFirst = indexOfLast - tuitionsPerPage;
  const currentTuitions = filteredTuitions.slice(indexOfFirst, indexOfLast);

  if (loading) return <p className="text-center py-10">Loading tuitions...</p>;
  if (!tuitions || tuitions.length === 0)
    return <p className="text-center py-10">No tuitions available.</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl md:text-4xl mt-5 text-center font-bold text-gray-900 dark:text-white">
        All Tuitions
      </h2>
      <p className="text-center mb-11 mt-3 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Browse all available tuitions by class, subject, location, and budget.
        Find detailed schedules and tutor info to quickly choose the right
        tuition for your needs.
      </p>

      <div className="mb-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <select
          name="class"
          value={filters.class}
          onChange={handleFilterChange}
          className="border p-2 rounded w-full"
        >
          <option value="">Select Class</option>
          {classes.map((cls) => (
            <option key={cls} value={cls}>
              Class {cls}
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
          {subjects.map((sub) => (
            <option key={sub} value={sub}>
              {sub}
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
          name="budgetMin"
          placeholder="Min Budget"
          value={filters.budgetMin}
          onChange={handleFilterChange}
          className="border p-2 rounded w-full"
        />

        <input
          type="number"
          name="budgetMax"
          placeholder="Max Budget"
          value={filters.budgetMax}
          onChange={handleFilterChange}
          className="border p-2 rounded w-full"
        />
      </div>

      {currentTuitions.length === 0 ? (
        <p className="text-center py-10">No tuitions match your filters.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentTuitions.map((item) => (
            <TuitionCard key={item._id.$oid} tuition={item} />
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
