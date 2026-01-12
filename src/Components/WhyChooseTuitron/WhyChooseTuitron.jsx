import React from "react";
import { FaUserCheck, FaLaptop, FaStar, FaShieldAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
  {
    icon: <FaUserCheck size={30} />,
    title: "Verified Tutors",
    description:
      "All tutors are verified to ensure quality learning experience.",
  },
  {
    icon: <FaLaptop size={30} />,
    title: "Easy Online Learning",
    description: "Learn from anywhere with seamless online tuition management.",
  },
  {
    icon: <FaStar size={30} />,
    title: "High Ratings",
    description: "Top-rated tutors and tuitions to help you succeed.",
  },
  {
    icon: <FaShieldAlt size={30} />,
    title: "Secure & Reliable",
    description: "Your data and payments are secure on our platform.",
  },
];

const WhyChooseTuitron = () => {
  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">
        Why Choose Us
      </h2>

      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
        {features.map((f, index) => (
          <motion.div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all hover:scale-105"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className="flex justify-center mb-4 text-blue-600 dark:text-blue-400">
              {f.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
              {f.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">{f.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseTuitron;
