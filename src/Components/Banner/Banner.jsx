import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <motion.section
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center"
    >
      <div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Find the Perfect Tutor for Your Learning Journey
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg">
          Tuitron connects students with verified tutors and provides a smooth
          tuition management experience.
        </p>

        <div className="mt-6 flex gap-4">
          <Link
            to="/tuitions"
            className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Explore Tuitions
          </Link>

          <Link
            to="/tutors"
            className="px-5 py-3 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700"
          >
            Find Tutors
          </Link>
        </div>
      </div>

      <div>
        <img
          src="https://img.icons8.com/fluency/512/student-center.png"
          className="w-72 md:w-96 mx-auto"
          alt="Study illustration"
        />
      </div>
    </motion.section>
  );
};

export default Banner;
