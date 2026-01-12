import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

const faqData = [
  {
    question: "How can I apply for a tuition?",
    answer:
      "Browse available tuitions, click 'Apply', and follow the instructions. You can track your applications from your dashboard.",
  },
  {
    question: "Can I become a tutor?",
    answer:
      "Yes! Click 'Become a Tutor' and fill out the registration form. Once verified, you can post your tuitions and manage students.",
  },
  {
    question: "Is there a fee for using the platform?",
    answer:
      "No, browsing tuitions and applying as a student is completely free. Tutors pay a small platform fee once they are approved.",
  },
  {
    question: "How do I contact a tutor?",
    answer:
      "You can contact tutors directly through their profile once logged in. All communications are secure and logged in the dashboard.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) =>
    setActiveIndex(activeIndex === index ? null : index);

  return (
    <section className="max-w-5xl mx-auto px-4 py-20">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">
        Frequently Asked Questions
      </h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-4"
      >
        {faqData.map((faq, index) => {
          const isOpen = activeIndex === index;

          return (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all border-l-4 border-blue-500 dark:border-blue-400"
            >
              <button
                onClick={() => toggleIndex(index)}
                aria-expanded={isOpen}
                className="w-full flex justify-between items-center px-6 py-5 text-left focus:outline-none"
              >
                <span className="text-lg md:text-xl font-medium text-gray-900 dark:text-gray-100">
                  {faq.question}
                </span>

                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-blue-600 dark:text-blue-400"
                >
                  <FiChevronDown size={24} />
                </motion.span>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-5 text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default FAQ;
