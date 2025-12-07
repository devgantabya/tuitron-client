import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUsers,
  FaCheckCircle,
} from "react-icons/fa";

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">About Tuitron</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Tuitron is a modern platform designed to connect students, tutors, and
          guardians. We make tuition management simple, transparent, and
          efficient.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Our mission is to build a seamless and trustworthy tuition ecosystem
            where students can find the right tutors, tutors can get fair
            opportunities, and admins can easily manage the entire system.
          </p>
        </div>

        <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold mb-2">What We Focus On</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <FaCheckCircle /> Quality Education
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle /> Smooth Communication
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle /> Fair Opportunities
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle /> Secure Payments
            </li>
          </ul>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <div className="p-6 border rounded-xl bg-white dark:bg-gray-800 shadow-sm text-center">
          <FaUserGraduate className="text-3xl mx-auto text-blue-600 mb-3" />
          <h3 className="text-2xl font-bold">5,000+</h3>
          <p className="text-gray-600 dark:text-gray-300">Students Served</p>
        </div>

        <div className="p-6 border rounded-xl bg-white dark:bg-gray-800 shadow-sm text-center">
          <FaChalkboardTeacher className="text-3xl mx-auto text-blue-600 mb-3" />
          <h3 className="text-2xl font-bold">1,200+</h3>
          <p className="text-gray-600 dark:text-gray-300">Tutors Joined</p>
        </div>

        <div className="p-6 border rounded-xl bg-white dark:bg-gray-800 shadow-sm text-center">
          <FaUsers className="text-3xl mx-auto text-blue-600 mb-3" />
          <h3 className="text-2xl font-bold">10,000+</h3>
          <p className="text-gray-600 dark:text-gray-300">Matches Completed</p>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Why Choose Tuitron?
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border">
            <h3 className="text-xl font-semibold mb-2">Verified Tutors</h3>
            <p className="text-gray-600 dark:text-gray-300">
              All tutors are verified to ensure safe and quality education.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border">
            <h3 className="text-xl font-semibold mb-2">Smart Matching</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Students get matched with tutors based on location, expertise, and
              availability.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border">
            <h3 className="text-xl font-semibold mb-2">Easy Communication</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Chat and coordinate with tutors directly inside the platform.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border">
            <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
            <p className="text-gray-600 dark:text-gray-300">
              All transactions are encrypted to ensure trust and transparency.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center mt-12">
        <h2 className="text-2xl font-semibold mb-2">Our Vision</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          We aim to create the largest and most trusted tuition community,
          empowering both students and tutors through seamless technology and a
          smart management system.
        </p>
      </div>
    </div>
  );
}
