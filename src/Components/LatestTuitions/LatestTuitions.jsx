import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router";
import TuitionCard from "../TuitionCard/TuitionCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const LatestTuitions = () => {
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchLatestTuitions = async () => {
      try {
        const response = await axiosSecure.get("/latest-tuitions");
        setTuitions(response.data || []);
      } catch (err) {
        console.error("Error fetching latest tuitions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestTuitions();
  }, [axiosSecure]);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          Latest Tuitions
        </h2>
        <Link
          to="/tuitions"
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
        ) : tuitions.length > 0 ? (
          tuitions.slice(0, 4).map((t) => (
            <motion.div
              key={t._id}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
            >
              <TuitionCard tuition={t} />
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500 col-span-3 text-center">
            No latest tuitions found.
          </p>
        )}
      </motion.div>
    </section>
  );
};

export default LatestTuitions;
