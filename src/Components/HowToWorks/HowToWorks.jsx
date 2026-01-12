import React from "react";
import { FaSearch, FaUserCheck, FaHandshake } from "react-icons/fa";
import Card from "../UI/Card";

const steps = [
  {
    icon: <FaSearch size={30} className="text-white" />,
    title: "Search",
    desc: "Easily find the right tutor or tuition post using our powerful filters.",
    gradient: "from-blue-400 to-blue-600",
  },
  {
    icon: <FaUserCheck size={30} className="text-white" />,
    title: "Select",
    desc: "Compare tutors or tuitions and pick the one that fits your needs.",
    gradient: "from-green-400 to-green-600",
  },
  {
    icon: <FaHandshake size={30} className="text-white" />,
    title: "Connect",
    desc: "Contact the tutor, schedule a session, and start learning instantly.",
    gradient: "from-purple-400 to-purple-600",
  },
];

const HowToWorks = () => {
  return (
    <section className="relative py-32 px-6 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="absolute -top-36 -left-36 w-96 h-96 bg-blue-200 dark:bg-blue-900 rounded-full opacity-20 pointer-events-none"></div>
      <div className="absolute -bottom-36 -right-36 w-96 h-96 bg-purple-200 dark:bg-purple-900 rounded-full opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-5xl md:text-4xl font-bold text-gray-900 dark:text-white">
          How It Works
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-3xl mx-auto text-lg md:text-xl">
          A simple 3-step process to find the perfect tutor or tuition and start
          learning today.
        </p>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, idx) => (
            <Card
              key={idx}
              className="relative flex flex-col items-center p-10 hover:scale-105 transition-transform duration-300"
            >
              <div
                className={`absolute -top-12 w-25 h-25 rounded-full bg-gradient-to-tr ${step.gradient} flex items-center justify-center shadow-lg`}
              >
                {step.icon}
              </div>

              <div className="absolute top-5 left-10 transform -translate-x-1/2 w-14 h-14 text-blue-50 dark:text-gray-900/30 flex items-center justify-center text-9xl font-bold ">
                {idx + 1}
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-16">
                {step.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 mt-3 text-center">
                {step.desc}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowToWorks;
