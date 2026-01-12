import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUsers,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router";

export default function About() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 py-20">
        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            About <span className="text-blue-600">Tuitron</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A modern tuition platform built to connect students with trusted
            tutors — fast, fair, and transparent.
          </p>
        </motion.div>

        {/* MISSION */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We aim to create a trusted tuition ecosystem where students easily
              find the right tutors, tutors get fair opportunities, and admins
              manage everything with confidence.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-10 rounded-3xl shadow-xl"
          >
            <h3 className="text-2xl font-semibold mb-6">What We Focus On</h3>
            <ul className="space-y-4">
              {[
                "Quality Education",
                "Smooth Communication",
                "Fair Opportunities",
                "Secure Payments",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <FaCheckCircle className="text-white/90" />
                  <span className="text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {[
            {
              icon: <FaUserGraduate />,
              value: "5,000+",
              label: "Students Served",
            },
            {
              icon: <FaChalkboardTeacher />,
              value: "1,200+",
              label: "Verified Tutors",
            },
            {
              icon: <FaUsers />,
              value: "10,000+",
              label: "Successful Matches",
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-10 rounded-3xl shadow-lg text-center transition"
            >
              <div className="flex justify-center text-4xl text-blue-600 mb-4 mx-auto">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-extrabold mb-1">{stat.value}</h3>
              <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* WHY CHOOSE */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Tuitron?
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            {[
              {
                title: "Verified Tutors",
                text: "Every tutor is reviewed and approved to ensure safety and quality.",
              },
              {
                title: "Smart Matching",
                text: "Advanced filtering based on subject, location, and availability.",
              },
              {
                title: "Easy Communication",
                text: "Built-in tools to communicate directly with tutors.",
              },
              {
                title: "Secure Payments",
                text: "Encrypted and transparent payment system you can trust.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-md transition"
              >
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-center text-white shadow-2xl"
        >
          <h2 className="text-3xl font-bold mb-4">
            Join the Tuitron Community
          </h2>
          <p className="mb-8 text-white/90 max-w-2xl mx-auto">
            Whether you’re a student looking for the perfect tutor or a tutor
            seeking new opportunities — Tuitron is for you.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              to="/tuitions"
              className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-gray-100 transition"
            >
              Find Tuition <FaArrowRight />
            </Link>

            <Link
              to="/be-a-tutor"
              className="bg-blue-900/40 px-6 py-3 rounded-xl font-semibold hover:bg-blue-900/60 transition"
            >
              Become a Tutor
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
