import React from "react";
import { Link } from "react-router";

const Error404 = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4 text-center">
      <h1 className="text-6xl font-extrabold text-red-600 dark:text-red-400 mb-4">
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
        Oops! Page not found
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        The page you are looking for doesn’t exist or has been moved.
      </p>

      <Link
        to="/"
        className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default Error404;
