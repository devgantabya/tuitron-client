import { Link } from "react-router";
import { FaMapMarkerAlt, FaBook, FaMoneyBillWave } from "react-icons/fa";

export default function TuitionCard({ tuition }) {
  const { _id, subject, classLevel, location, budget } = tuition;

  return (
    <div className="border rounded-xl shadow-sm hover:shadow-md transition p-5 bg-white">
      <h2 className="text-lg font-semibold">{subject}</h2>
      <p className="flex items-center gap-2 mt-2 text-sm text-gray-600">
        <FaBook /> Class: {classLevel}
      </p>
      <p className="flex items-center gap-2 mt-2 text-sm text-gray-600">
        <FaMapMarkerAlt /> {location}
      </p>
      <p className="flex items-center gap-2 mt-2 text-sm text-green-600 font-medium">
        <FaMoneyBillWave /> {budget} BDT
      </p>

      <Link
        to={`/tuitions/${_id}`}
        className="block mt-4 text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
      >
        View Details
      </Link>
    </div>
  );
}
