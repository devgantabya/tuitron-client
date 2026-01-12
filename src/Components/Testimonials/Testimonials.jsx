import React from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Sarah Khan",
    role: "Student",
    feedback:
      "Tuitron made it so easy to find the right tutor for my math classes. Highly recommend!",
    avatar: "https://i.pravatar.cc/100?img=32",
  },
  {
    name: "Rahim Uddin",
    role: "Parent",
    feedback:
      "I could track my child's progress and communicate with the tutor seamlessly. Amazing platform!",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  {
    name: "Ayesha Sultana",
    role: "Student",
    feedback:
      "Loved the easy application process and quick responses from tutors. Great experience!",
    avatar: "https://i.pravatar.cc/100?img=45",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const Testimonials = () => {
  return (
    <section className="py-20 px-4 bg-blue-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">
          What Our Users Say
        </h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition"
            >
              <FaQuoteLeft className="text-blue-500 dark:text-blue-400 text-2xl mb-4" />

              <img
                src={t.avatar}
                alt={t.name}
                className="w-20 h-20 rounded-full mb-4 border-2 border-blue-600 dark:border-blue-400"
                loading="lazy"
              />

              <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
                “{t.feedback}”
              </p>

              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {t.name}
              </h4>

              <span className="text-blue-600 dark:text-blue-400 text-sm">
                {t.role}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
