import React from "react";
import { Link } from "react-router";

export const ButtonPrimary = ({ to, children }) => (
  <Link
    to={to}
    className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 hover:scale-105 transition transform"
  >
    {children}
  </Link>
);

export const ButtonSecondary = ({ to, children }) => (
  <Link
    to={to}
    className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 hover:scale-105 transition transform"
  >
    {children}
  </Link>
);
