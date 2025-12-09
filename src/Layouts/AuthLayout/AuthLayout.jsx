import React from "react";
import { Link, Outlet } from "react-router";
import logoLight from "../../assets/logo-primary.png";
import logoDark from "../../assets/logo-white.png";
import Footer from "../../Components/Footer/Footer";

const AuthLayout = () => {
  return (
    <div>
      <div className="bg-base-100 shadow-md sticky top-0 z-50">
        <div className="navbar max-w-7xl mx-auto px-4">
          <div className="navbar-start">
            <Link to="/" className="flex items-center gap-2">
              <img src={logoLight} alt="Tuitron" className="h-8 dark:hidden" />
              <img
                src={logoDark}
                alt="Tuitron"
                className="h-8 hidden dark:block"
              />
            </Link>
          </div>
        </div>
      </div>
      <Outlet />
      <Footer />
    </div>
  );
};

export default AuthLayout;
