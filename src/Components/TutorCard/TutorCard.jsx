import React from "react";
import { Link } from "react-router";

const TutorCard = ({ tutor }) => {
  const { _id, name, tutor_image, subjectSpecialization } = tutor;
  console.log(tutor);
  return (
    <div
      key={_id}
      className="p-5 border rounded-xl dark:border-gray-800 bg-white dark:bg-gray-800"
    >
      <div className="flex items-center gap-4">
        <img src={tutor_image} alt={name} className="w-14 h-14 rounded-full" />
        <div>
          <h4 className="text-lg font-semibold">{name}</h4>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {subjectSpecialization.map((sub) => sub).join(", ")}
          </p>
        </div>
      </div>

      <Link
        to={`/tutor/${_id}`}
        className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center block"
      >
        View Profile
      </Link>
    </div>
  );
};

export default TutorCard;
