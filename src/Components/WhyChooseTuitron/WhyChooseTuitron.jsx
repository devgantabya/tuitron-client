import React from "react";
import { FaChalkboardTeacher, FaUserGraduate, FaSearch } from "react-icons/fa";

const WhyChooseTuitron = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-4xl text-center font-bold text-gray-900 dark:text-white">
        Why Choose Tuitron?
      </h2>
      <p className="mt-3 mb-14 text-gray-600 text-center dark:text-gray-300 max-w-2xl mx-auto">
        Connect with verified tutors quickly and easily for a smooth, reliable
        learning experience.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="p-6 border dark:border-gray-800 rounded-xl text-center">
          <FaSearch className="text-blue-600 dark:text-blue-400 text-4xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Smart Search</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Find tutors and tuitions quickly with smart filtering.
          </p>
        </div>

        <div className="p-6 border dark:border-gray-800 rounded-xl text-center">
          <FaChalkboardTeacher className="text-blue-600 dark:text-blue-400 text-4xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Verified Tutors</h3>
          <p className="text-gray-600 dark:text-gray-400">
            All tutors are verified for your safety and quality learning.
          </p>
        </div>

        <div className="p-6 border dark:border-gray-800 rounded-xl text-center">
          <FaUserGraduate className="text-blue-600 dark:text-blue-400 text-4xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Easy Management</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Manage tuition, applications, and messages in one place.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseTuitron;
