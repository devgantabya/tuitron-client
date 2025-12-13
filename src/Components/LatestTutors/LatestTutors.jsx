import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router";
import TutorCard from "../TutorCard/TutorCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const LatestTutors = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchLatestTutors = async () => {
      try {
        const response = await axiosSecure.get("/latest-tutors");
        setTutors(response.data.tutors || []);
      } catch (err) {
        console.error("Error fetching latest tutors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestTutors();
  }, [axiosSecure]);

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
        {loading ? (
          <p className="text-gray-500 col-span-3 text-center">Loading...</p>
        ) : tutors.length > 0 ? (
          tutors.slice(0, 4).map((tutor) => (
            <motion.div
              key={tutor._id}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
            >
              <TutorCard tutor={tutor} />
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500 col-span-3 text-center">
            No latest tutors found.
          </p>
        )}
      </motion.div>
    </section>
  );
};

export default LatestTutors;
