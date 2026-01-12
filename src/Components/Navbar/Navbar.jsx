import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import logoLight from "../../assets/logo-primary.png";
import logoDark from "../../assets/logo-white.png";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, loading, signOutUser } = useAuth();
  const navigate = useNavigate();

  const menuRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setMenuOpen(false);
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOutUser();
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch {
      toast.error("Logout failed!");
    }
  };

  const userName = user?.displayName || user?.name || "User";
  const userImage =
    user?.photoURL ||
    user?.image ||
    "https://i.ibb.co/fGMNLM9Z/Sample-User-Icon.png";

  const navLinkClass = ({ isActive }) =>
    `text-sm transition-all duration-200
     hover:-translate-y-0.5 hover:text-blue-600 dark:hover:text-blue-400
     ${
       isActive
         ? "text-blue-600 dark:text-blue-400 font-semibold"
         : "text-gray-700 dark:text-gray-300"
     }`;

  const links = [
    { label: "Home", to: "/" },
    { label: "Tuitions", to: "/tuitions" },
    { label: "Tutors", to: "/tutors" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
    { label: "Be A Tutor", to: "/be-a-tutor" },
  ];

  if (user)
    links.splice(5, 0, { label: "My Tuitions", to: "/dashboard/my-tuitions" });

  return (
    <nav className="bg-base-100 shadow-md sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        <div className="flex items-center gap-3">
          <button
            className="lg:hidden p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            aria-label="Toggle Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="h-6 w-6 text-black dark:text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>

          <Link
            to="/"
            className="flex items-center gap-2 hover:scale-105 transition-transform"
          >
            <img src={logoLight} alt="Logo" className="h-8 dark:hidden" />
            <img src={logoDark} alt="Logo" className="h-8 hidden dark:block" />
          </Link>
        </div>

        <ul className="hidden md:flex gap-6">
          {links.map(({ label, to }) => (
            <li key={to}>
              <NavLink to={to} end className={navLinkClass}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {loading ? (
            <div className="w-24 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
          ) : user ? (
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-base-200 dark:hover:bg-gray-700 transition"
                aria-label="User Menu"
                aria-expanded={dropdownOpen}
              >
                <img
                  src={userImage}
                  alt={userName}
                  className="w-10 h-10 rounded-full border border-blue-600"
                />
                <motion.svg
                  animate={{ rotate: dropdownOpen ? 180 : 0 }}
                  className="h-4 w-4 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </motion.svg>
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-52 bg-base-100 dark:bg-gray-800 shadow rounded-lg z-50 p-2"
                  >
                    <li className="px-3 py-2 font-semibold border-b">
                      {userName}
                    </li>
                    <li>
                      <Link
                        to="/dashboard"
                        className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        📊 Dashboard
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="text-red-600 w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Logout
                      </button>
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden bg-white dark:bg-gray-900 shadow-md w-full absolute left-0 z-40"
          >
            <ul className="flex flex-col gap-2 p-3">
              {links.map(({ label, to }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end
                    className={navLinkClass}
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
