import React from "react";
import { FaUserCheck, FaSearch, FaHandshake } from "react-icons/fa";

const HowToWorks = () => {
  const steps = [
    {
      icon: <FaSearch className="text-white text-3xl" />,
      title: "Search",
      desc: "Browse tuition posts or tutor profiles that match your needs.",
      color: "bg-blue-600",
    },
    {
      icon: <FaUserCheck className="text-white text-3xl" />,
      title: "Select",
      desc: "Review details and choose the most suitable tutor or tuition.",
      color: "bg-green-600",
    },
    {
      icon: <FaHandshake className="text-white text-3xl" />,
      title: "Connect",
      desc: "Contact and start your learning journey with confidence.",
      color: "bg-purple-600",
    },
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          How the Platform Works
        </h2>
        <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          A simple and efficient process designed to connect students and
          tutors.
        </p>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition">
                <div
                  className={`w-16 h-16 mx-auto flex items-center justify-center rounded-full ${step.color}`}
                >
                  {step.icon}
                </div>

                <h3 className="text-xl font-semibold mt-6 text-gray-800 dark:text-gray-200">
                  {step.title}
                </h3>

                <p className="mt-3 text-gray-600 dark:text-gray-400">
                  {step.desc}
                </p>
              </div>

              <div className="absolute -top-4 -left-4 md:-top-5 md:-left-5 w-10 h-10 bg-blue-500 dark:bg-blue-700 text-white flex items-center justify-center rounded-full font-bold shadow">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowToWorks;
