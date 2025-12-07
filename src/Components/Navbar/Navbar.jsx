import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import logoLight from "../../assets/logo-primary.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  const links = (
    <>
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
    </>
  );

  return (
    <nav className="w-full border-b bg-white dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logoLight} alt="Tuitron" className="h-8 dark:hidden" />
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {links}

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

          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            {dark ? "🌙" : "☀️"}
          </button>
        </div>

        <button
          className="md:hidden p-2 text-gray-700 dark:text-gray-300"
          onClick={() => setOpen(!open)}
        >
          {open ? "✖" : "☰"}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-700 px-4 py-4 space-y-3">
          <NavLink
            to="/"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `block text-base ${
                isActive
                  ? "text-blue-600 dark:text-blue-400 font-semibold"
                  : "text-gray-700 dark:text-gray-300"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/tuitions"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `block text-base ${
                isActive
                  ? "text-blue-600 dark:text-blue-400 font-semibold"
                  : "text-gray-700 dark:text-gray-300"
              }`
            }
          >
            Tuitions
          </NavLink>

          <NavLink
            to="/tutors"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `block text-base ${
                isActive
                  ? "text-blue-600 dark:text-blue-400 font-semibold"
                  : "text-gray-700 dark:text-gray-300"
              }`
            }
          >
            Tutors
          </NavLink>

          <NavLink
            to="/about"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `block text-base ${
                isActive
                  ? "text-blue-600 dark:text-blue-400 font-semibold"
                  : "text-gray-700 dark:text-gray-300"
              }`
            }
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `block text-base ${
                isActive
                  ? "text-blue-600 dark:text-blue-400 font-semibold"
                  : "text-gray-700 dark:text-gray-300"
              }`
            }
          >
            Contact
          </NavLink>

          <div className="pt-3 space-y-2">
            <NavLink
              to="/login"
              onClick={() => setOpen(false)}
              className="block text-base text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Login
            </NavLink>

            <NavLink
              to="/register"
              onClick={() => setOpen(false)}
              className="block w-fit px-3 py-1.5 text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Register
            </NavLink>
          </div>

          <button
            onClick={() => setDark(!dark)}
            className="p-2 mt-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            {dark ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>
        </div>
      )}
    </nav>
  );
}
