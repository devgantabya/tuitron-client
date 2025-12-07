import { Link } from "react-router";
import { FaChalkboardTeacher, FaUserGraduate, FaSearch } from "react-icons/fa";

export default function Home() {
  return (
    <div className="dark:bg-gray-900 dark:text-white">
      <section className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Find the Perfect Tutor for Your Learning Journey
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg">
            Tuitron connects students with verified tutors and provides a smooth
            tuition management experience.
          </p>

          <div className="mt-6 flex gap-4">
            <Link
              to="/tuitions"
              className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Explore Tuitions
            </Link>

            <Link
              to="/tutors"
              className="px-5 py-3 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700"
            >
              Find Tutors
            </Link>
          </div>
        </div>

        <div>
          <img
            src="https://img.icons8.com/fluency/512/student-center.png"
            className="w-72 md:w-96 mx-auto"
            alt="Study illustration"
          />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-semibold text-center mb-10">
          Why Choose Tuitron?
        </h2>

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

      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-semibold mb-6">Popular Tutors</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-5 border rounded-xl dark:border-gray-800 bg-white dark:bg-gray-800"
            >
              <div className="flex items-center gap-4">
                <img
                  src={`https://i.pravatar.cc/150?img=${i}`}
                  alt="Tutor"
                  className="w-14 h-14 rounded-full"
                />
                <div>
                  <h4 className="text-lg font-semibold">Tutor Name {i}</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Math & Science
                  </p>
                </div>
              </div>

              <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                View Profile
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-semibold mb-4">
          Start Your Learning Journey Today!
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Join Tuitron as a student or tutor and unlock new opportunities.
        </p>

        <Link
          to="/register"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
}
