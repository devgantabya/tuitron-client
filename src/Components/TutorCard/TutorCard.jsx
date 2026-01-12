import { Link } from "react-router";
import { motion } from "framer-motion";

const TutorCard = ({ tutor }) => {
  const { _id, name, tutor_image, subjectSpecialization = [] } = tutor;

  const imageSrc =
    tutor_image?.startsWith("http") || tutor_image?.startsWith("/")
      ? tutor_image
      : "/avatar-placeholder.png";

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="
        h-full flex flex-col justify-between
        rounded-2xl bg-white dark:bg-gray-900
        shadow-sm hover:shadow-xl
        dark:border dark:border-gray-800
        transition-all
      "
    >
      {/* TOP */}
      <div className="p-5 flex items-center gap-4">
        <img
          src={imageSrc}
          alt={name}
          onError={(e) => (e.currentTarget.src = "/avatar-placeholder.png")}
          className="w-14 h-14 rounded-full object-cover ring-2 ring-blue-500/20"
        />

        <div className="flex-1">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white leading-tight">
            {name}
          </h4>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
            {subjectSpecialization.length
              ? subjectSpecialization.join(", ")
              : "No specialization provided"}
          </p>
        </div>
      </div>

      <div className="px-5 pb-5">
        <Link
          to={`/tutors/${_id}`}
          className="
            block w-full text-center
            py-2.5 rounded-xl font-medium
            bg-blue-600 text-white
            hover:bg-blue-700
            transition
          "
        >
          View Profile
        </Link>
      </div>
    </motion.div>
  );
};

export default TutorCard;
