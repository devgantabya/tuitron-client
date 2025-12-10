import { Link } from "react-router";
import {
  FaMapMarkerAlt,
  FaBook,
  FaMoneyBillWave,
  FaClock,
} from "react-icons/fa";

export default function TuitionCard({ tuition }) {
  const { _id, subject, class_level, location, budget, schedule } = tuition;

  return (
    <div className="border rounded-2xl p-6 shadow-md bg-white dark:bg-gray-800 hover:shadow-xl transition duration-300 ease-in-out flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
          {subject || "Unknown Subject"}
        </h2>

        <div className="flex flex-wrap gap-2 mt-2">
          {schedule && (
            <span className="flex items-center gap-1 px-2 py-1 rounded-full text-sm text-gray-700 bg-gray-100 dark:text-gray-200 dark:bg-gray-700">
              <FaClock className="text-xs" /> {schedule}
            </span>
          )}
        </div>

        <p className="flex items-center gap-2 mt-3 text-gray-600 dark:text-gray-300">
          <FaBook /> Class: {class_level}
        </p>

        <p className="flex items-center gap-2 mt-2 text-gray-600 dark:text-gray-300">
          <FaMapMarkerAlt /> {location}
        </p>

        <p className="flex items-center gap-2 mt-2 font-semibold text-green-600 dark:text-green-400">
          <FaMoneyBillWave /> {budget} BDT
        </p>
      </div>

      <Link
        to={`/tuitions/${_id}`}
        className="mt-4 block bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-center py-2 rounded-xl font-medium transition"
      >
        View Details
      </Link>
    </div>
  );
}
