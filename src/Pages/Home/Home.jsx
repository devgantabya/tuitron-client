import { Link } from "react-router";
import { FaChalkboardTeacher, FaUserGraduate, FaSearch } from "react-icons/fa";
import Banner from "../../Components/Banner/Banner";
import LatestTuitions from "../../Components/LatestTuitions/LatestTuitions";

export default function Home() {
  return (
    <div className="dark:bg-gray-900 dark:text-white">
      <Banner />
      <LatestTuitions />

      <section className="max-w-7xl mx-auto px-4 py-16">
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
