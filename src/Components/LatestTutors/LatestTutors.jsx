import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import TutorCard from "../TutorCard/TutorCard";
import { motion } from "framer-motion";
import { Link } from "react-router";

const LatestTutors = () => {
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/latest-tutors`)
      .then((res) => res.json())
      .then((data) => setTutors(data.tutors || []))
      .catch((err) => console.log(err));
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white">
          Latest Tutors
        </h2>
        <Link
          to="/tutors"
          className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
        >
          See All <FaArrowRight className="ml-2" />
        </Link>
      </div>

      <motion.div
        className="grid md:grid-cols-4 gap-6"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.15 }}
      >
        {tutors.slice(0, 4).map((tutor) => (
          <motion.div
            key={tutor._id}
            variants={fadeUp}
            transition={{ duration: 0.5 }}
          >
            <TutorCard tutor={tutor} />
          </motion.div>
        ))}

        {tutors.length === 0 && (
          <p className="text-gray-500 col-span-3 text-center">
            No latest tutors found.
          </p>
        )}
      </motion.div>
    </section>
  );
};

export default LatestTutors;
