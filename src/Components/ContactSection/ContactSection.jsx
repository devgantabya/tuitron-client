import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiUser, FiMessageCircle } from "react-icons/fi";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact Form Submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
    alert("Message sent successfully!");
  };

  return (
    <motion.section
      className="relative bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-20 px-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">
        Get in Touch
      </h2>

      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
        <form onSubmit={handleSubmit} className="space-y-6">

          <motion.div
            className="flex items-center border-b border-gray-300 dark:border-gray-700 py-2"
            whileFocus={{ scale: 1.02 }}
          >
            <FiUser className="text-blue-600 dark:text-blue-400 mr-3 text-xl" />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-transparent focus:outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 py-2"
              required
            />
          </motion.div>

          <motion.div
            className="flex items-center border-b border-gray-300 dark:border-gray-700 py-2"
            whileFocus={{ scale: 1.02 }}
          >
            <FiMail className="text-blue-600 dark:text-blue-400 mr-3 text-xl" />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-transparent focus:outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 py-2"
              required
            />
          </motion.div>

          <motion.div className="flex items-start border-b border-gray-300 dark:border-gray-700 py-2">
            <FiMessageCircle className="text-blue-600 dark:text-blue-400 mr-3 mt-2 text-xl" />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="w-full bg-transparent focus:outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 py-2 resize-none"
              required
            />
          </motion.div>

          <motion.button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Send Message
          </motion.button>
        </form>
      </div>

      <div className="absolute -top-16 -left-16 w-40 h-40 bg-blue-200 dark:bg-blue-900 rounded-full opacity-30 pointer-events-none"></div>
      <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-blue-200 dark:bg-blue-900 rounded-full opacity-30 pointer-events-none"></div>
    </motion.section>
  );
};

export default ContactSection;
