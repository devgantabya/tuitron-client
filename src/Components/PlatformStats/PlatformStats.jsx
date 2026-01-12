import React from "react";
import { motion } from "framer-motion";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaStar,
} from "react-icons/fa";

const stats = [
  {
    icon: <FaUserGraduate size={30} />,
    value: 1000,
    label: "Students",
  },
  {
    icon: <FaChalkboardTeacher size={30} />,
    value: 500,
    label: "Tutors",
  },
  {
    icon: <FaBook size={30} />,
    value: 2000,
    label: "Tuitions Completed",
  },
  {
    icon: <FaStar size={30} />,
    value: 98,
    label: "Satisfaction (%)",
  },
];

const PlatformStats = () => {
  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">
        Our Achievements
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center hover:shadow-xl transition cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className="text-blue-600 dark:text-blue-400 mb-4">
              {stat.icon}
            </div>
            <motion.h3
              className="text-3xl font-bold text-gray-900 dark:text-gray-100"
              initial={{ count: 0 }}
              animate={{ count: stat.value }}
            >
              {stat.value}+
            </motion.h3>
            <p className="text-gray-700 dark:text-gray-300 mt-2">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PlatformStats;
