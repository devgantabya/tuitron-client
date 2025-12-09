import { Link } from "react-router";
import { FaMapMarkerAlt, FaBook, FaMoneyBillWave } from "react-icons/fa";

export default function TuitionCard({ tuition }) {
  const { _id, subject, class_level, location, budget } = tuition;

  return (
    <div className="border rounded-xl p-5 shadow-sm bg-white hover:shadow-md transition">
      <h2 className="text-xl font-semibold">{subject}</h2>

      <p className="flex items-center gap-2 text-gray-600 mt-2">
        <FaBook /> Class: {class_level}
      </p>

      <p className="flex items-center gap-2 text-gray-600 mt-2">
        <FaMapMarkerAlt /> {location}
      </p>

      <p className="flex items-center gap-2 text-green-600 mt-2 font-semibold">
        <FaMoneyBillWave /> {budget} BDT
      </p>

      <Link
        to={`/tuitions/${_id}`}
        className="block mt-4 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-lg"
      >
        View Details
      </Link>
    </div>
  );
}
