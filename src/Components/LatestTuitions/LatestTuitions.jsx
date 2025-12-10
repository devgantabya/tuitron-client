import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import TuitionCard from "../TuitionCard/TuitionCard";
import { motion } from "framer-motion";

const LatestTuitions = () => {
  const [tuitions, setTuitions] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/latest-tuitions`)
      .then((res) => res.json())
      .then((data) => setTuitions(data.tuitions || []))
      .catch((err) => console.log(err));
  }, []);

  // Animation variants for fade-up
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold">Latest Tuitions</h2>
        <a
          href="/tuitions"
          className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
        >
          See All <FaArrowRight className="ml-2" />
        </a>
      </div>

      <motion.div
        className="grid md:grid-cols-4 gap-6"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.15 }}
      >
        {tuitions.slice(0, 4).map((t) => (
          <motion.div
            key={t._id}
            variants={fadeUp}
            transition={{ duration: 0.5 }}
          >
            <TuitionCard tuition={t} />
          </motion.div>
        ))}

        {tuitions.length === 0 && (
          <p className="text-gray-500 col-span-3 text-center">
            No latest tuitions found.
          </p>
        )}
      </motion.div>
    </section>
  );
};

export default LatestTuitions;
