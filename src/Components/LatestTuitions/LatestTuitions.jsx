import { useEffect, useState } from "react";
import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import TuitionCard from "../TuitionCard/TuitionCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Card from "../UI/Card";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const LatestTuitions = () => {
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    let isMounted = true;

    const fetchLatestTuitions = async () => {
      try {
        const { data } = await axiosSecure.get("/latest-tuitions");
        if (isMounted) setTuitions(data || []);
      } catch (error) {
        console.error("Failed to fetch latest tuitions:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchLatestTuitions();
    return () => (isMounted = false);
  }, [axiosSecure]);

  return (
    <section className="bg-blue-50/60 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between gap-4 mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Latest Tuitions
          </h2>

          <Link
            to="/tuitions"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            See All <FaArrowRight />
          </Link>
        </div>

        {loading ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-16">
            Loading latest tuitions...
          </div>
        ) : tuitions.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-16">
            No latest tuitions found.
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {tuitions.slice(0, 4).map((tuition) => (
              <motion.div key={tuition._id} variants={itemVariants}>
                <Card>
                  <TuitionCard tuition={tuition} />
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default LatestTuitions;
