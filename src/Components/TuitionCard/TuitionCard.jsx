import { Link } from "react-router";
import {
  FaMapMarkerAlt,
  FaBook,
  FaMoneyBillWave,
  FaClock,
} from "react-icons/fa";

export default function TuitionCard({ tuition }) {
  const { _id, subject, course, days, time, salary, contact } = tuition;
  const schedule = [days, time].filter(Boolean).join(" • ");

  return (
    <div className="h-full flex flex-col">
      {/* Card Content */}
      <div className=" flex-1">
        <h2 className="text-xl text-left font-bold text-gray-900 dark:text-white line-clamp-2">
          {subject || "Unknown Subject"}
        </h2>

        <p className="mt-2 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <FaBook className="text-blue-500" />
          {course || "N/A"}
        </p>

        {schedule && (
          <p className="mt-3 flex justify-start items-center gap-2 py-1.5 rounded-full text-blue-700 dark:text-blue-300 text-sm">
            <FaClock className="text-xs" />
            {schedule}
          </p>
        )}

        <p className="mt-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <FaMapMarkerAlt className="text-blue-500" />
          {contact?.location || "Location not specified"}
        </p>
      </div>

      {/* Footer */}
      <div className="px-1 py-4 mt-auto flex items-center justify-between bg-gray-50 dark:bg-gray-800/60 rounded-b-2xl">
        <p className="flex items-center gap-2 font-bold text-gray-900 dark:text-white">
          <FaMoneyBillWave className="text-green-500" />
          {salary ? `${salary} BDT` : "Negotiable"}
        </p>

        <Link
          to={`/tuitions/${_id}`}
          className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
        >
          View →
        </Link>
      </div>
    </div>
  );
}
