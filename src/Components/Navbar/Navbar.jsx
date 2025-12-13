import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import logoLight from "../../assets/logo-primary.png";
import logoDark from "../../assets/logo-white.png";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();
  const menuRef = useRef();
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target))
        setMenuOpen(false);
      if (dropdownRef.current && !dropdownRef.current.contains(event.target))
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    signOutUser()
      .then(() => {
        toast.success("Logged out successfully!");
        navigate("/login");
      })
      .catch(() => {
        toast.error("Logout failed! Try again.");
      });
  };

  const getDashboardLink = () => {
    if (!user?.role) return "/";
    switch (user.role.toLowerCase()) {
      case "student":
        return "/student";
      case "tutor":
        return "/tutor";
      case "admin":
        return "/admin";
      default:
        return "/";
    }
  };

  console.log("USER:", user);
  console.log("ROLE:", user?.role);

  const getDashboardLabel = () => {
    if (!user?.role) return "Dashboard";
    return `${
      user.role.charAt(0).toUpperCase() + user.role.slice(1)
    } Dashboard`;
  };

  const userName = user?.displayName || user?.name || "User";
  const userImage =
    user?.photoURL ||
    user?.image ||
    "https://i.ibb.co/fGMNLM9Z/Sample-User-Icon.png";

  const links = (
    <>
      <li onClick={() => setMenuOpen(false)}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-sm ${
              isActive
                ? "text-blue-600 dark:text-blue-400 font-semibold"
                : "text-gray-700 dark:text-gray-300"
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li onClick={() => setMenuOpen(false)}>
        <NavLink
          to="/tuitions"
          className={({ isActive }) =>
            `text-sm ${
              isActive
                ? "text-blue-600 dark:text-blue-400 font-semibold"
                : "text-gray-700 dark:text-gray-300"
            }`
          }
        >
          Tuitions
        </NavLink>
      </li>
      <li onClick={() => setMenuOpen(false)}>
        <NavLink
          to="/tutors"
          className={({ isActive }) =>
            `text-sm ${
              isActive
                ? "text-blue-600 dark:text-blue-400 font-semibold"
                : "text-gray-700 dark:text-gray-300"
            }`
          }
        >
          Tutors
        </NavLink>
      </li>
      <li onClick={() => setMenuOpen(false)}>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `text-sm ${
              isActive
                ? "text-blue-600 dark:text-blue-400 font-semibold"
                : "text-gray-700 dark:text-gray-300"
            }`
          }
        >
          About
        </NavLink>
      </li>
      <li onClick={() => setMenuOpen(false)}>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `text-sm ${
              isActive
                ? "text-blue-600 dark:text-blue-400 font-semibold"
                : "text-gray-700 dark:text-gray-300"
            }`
          }
        >
          Contact
        </NavLink>
      </li>
      {user && (
        <li onClick={() => setMenuOpen(false)}>
          <NavLink
            to="/dashboard/my-tuitions"
            className={({ isActive }) =>
              `text-sm ${
                isActive
                  ? "text-blue-600 dark:text-blue-400 font-semibold"
                  : "text-gray-700 dark:text-gray-300"
              }`
            }
          >
            My Tuitions
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <nav className="bg-base-100 shadow-md sticky top-0 z-50">
      <div className="navbar max-w-7xl mx-auto px-4">
        <div className="navbar-start">
          <button
            className="lg:hidden border-0 shadow-none mr-2 p-0 bg-transparent hover:bg-transparent focus:bg-transparent"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
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
          <Link to="/" className="flex items-center gap-2">
            <img src={logoLight} alt="Tuitron" className="h-8 dark:hidden" />
            <img
              src={logoDark}
              alt="Tuitron"
              className="h-8 hidden dark:block"
            />
          </Link>
        </div>
        <div className="navbar-center hidden md:flex">
          <ul className="hidden md:flex items-center gap-6">{links}</ul>
        </div>
        <div className="navbar-end space-x-3">
          {user ? (
            <div className="dropdown dropdown-end relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-base-200"
              >
                <div className="w-10 h-10 rounded-full bg-green-100 border border-blue-600 overflow-hidden">
                  <img src={userImage} alt={userName} />
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transition-transform ${
                    dropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
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
                </svg>
              </button>
              {dropdownOpen && (
                <ul className="menu menu-sm dropdown-content bg-base-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-box absolute right-0 mt-3 w-52 p-2 shadow z-50">
                  <li className="font-semibold text-gray-700 dark:text-gray-200 px-3 py-2 border-b border-gray-300 dark:border-gray-700">
                    {userName}
                  </li>
                  <li>
                    <Link
                      to={getDashboardLink()}
                      onClick={() => setDropdownOpen(false)}
                      className="text-gray-700 dark:text-gray-200 w-full flex gap-2 items-center"
                    >
                      <span className="text-lg">📊</span> {getDashboardLabel()}
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        handleLogout();
                        setDropdownOpen(false);
                      }}
                      className="text-red-600 dark:text-red-400 w-full text-base text-left hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3 ml-4">
              <NavLink
                to="/login"
                className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Register
              </NavLink>
            </div>
          )}
        </div>
      </div>
      {menuOpen && (
        <ul
          ref={menuRef}
          className="menu menu-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-box p-2 shadow absolute top-full left-0 w-full lg:hidden z-40"
        >
          {links}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
