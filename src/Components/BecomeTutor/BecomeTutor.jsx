import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const BecomeTutor = () => {
  return (
    <motion.section
      className="relative py-20 px-4"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 text-white rounded-2xl shadow-xl px-8 py-14 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Want to Teach? Become a Tutor!
        </h2>

        <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Share your knowledge, connect with students, and earn by teaching
          online on a trusted platform.
        </p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block"
        >
          <Link
            to="/be-a-tutor"
            className="inline-flex items-center justify-center bg-white text-blue-600 font-semibold px-8 py-3 rounded-xl shadow-md hover:bg-gray-100 transition"
          >
            Register as a Tutor
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default BecomeTutor;
