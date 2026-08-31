import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";
import logoLight from "../../assets/logo-primary.png";
import logoDark from "../../assets/logo-white.png";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { Button } from "../UI/Button";
import { ThemeToggle } from "../UI/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../UI/DropdownMenu";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, loading, signOutUser } = useAuth();
  const navigate = useNavigate();

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setMenuOpen(false);
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
    `text-sm font-medium transition-all duration-200 hover:text-primary
     ${isActive ? "text-primary" : "text-foreground/80"}`;

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
    <nav className="bg-background border-b sticky top-0 z-50 backdrop-blur-sm bg-background/95">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Toggle Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <img src={logoLight} alt="Logo" className="h-8 dark:hidden" />
            <img src={logoDark} alt="Logo" className="h-8 hidden dark:block" />
          </Link>
        </div>

        <ul className="hidden md:flex gap-6 items-center">
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
            <div className="w-24 h-10 bg-muted rounded-md animate-pulse" />
          ) : user ? (
            <>
              <ThemeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <img
                      src={userImage}
                      alt={userName}
                      className="w-8 h-8 rounded-full ring-2 ring-primary"
                    />
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  <DropdownMenuLabel>{userName}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-destructive cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <ThemeToggle />
              <Button asChild>
                <Link to="/login">Login</Link>
              </Button>
            </>
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
            className="lg:hidden bg-background border-b w-full absolute left-0 z-40"
          >
            <ul className="flex flex-col gap-1 p-3">
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
