import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router";
import footerLogoLight from "../../assets/logo-primary.png";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-gray-100 dark:bg-gray-900 dark:border-gray-700 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <Link
          to="/"
          className="text-lg font-semibold text-gray-900 dark:text-white"
        >
          <img src={footerLogoLight} alt="Tuitron" className="h-8" />
        </Link>

        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            to="/"
          >
            Home
          </Link>
          <Link
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            to="/tuitions"
          >
            Tuitions
          </Link>
          <Link
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            to="/tutors"
          >
            Tutors
          </Link>
          <Link
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            to="/about"
          >
            About
          </Link>
          <Link
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            to="/contact"
          >
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300 text-lg">
          <a
            href="https://www.facebook.com/devgantabya"
            className="hover:text-blue-600 dark:hover:text-blue-400"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://www.instagram.com/dev_gantabya/"
            className="hover:text-blue-600 dark:hover:text-blue-400"
          >
            <FaInstagram />
          </a>
          <a
            href="https://x.com/dev_gantabya"
            className="hover:text-blue-600 dark:hover:text-blue-400"
          >
            <FaXTwitter />
          </a>
          <a
            href="https://www.linkedin.com/in/devgantabya/"
            className="hover:text-blue-600 dark:hover:text-blue-400"
          >
            <FaLinkedinIn />
          </a>
        </div>
      </div>

      <div className="text-center max-w-7xl mx-auto py-4 text-xs text-gray-600 dark:text-gray-400 border-t border-gray-400 dark:border-gray-700">
        © {new Date().getFullYear()} Tuitron. All Rights Reserved.
      </div>
    </footer>
  );
}
