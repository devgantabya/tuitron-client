import React from "react";
import { Link, Outlet } from "react-router";
import logoLight from "../../assets/logo-primary.png";
import logoDark from "../../assets/logo-white.png";
import { Button } from "../../Components/UI/Button";
import { Home } from "lucide-react";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <img 
                src={logoLight} 
                alt="Tuitron" 
                className="h-9 dark:hidden transition-transform group-hover:scale-105" 
              />
              <img
                src={logoDark}
                alt="Tuitron"
                className="h-9 hidden dark:block transition-transform group-hover:scale-105"
              />
            </Link>

            {/* Right side - Home button */}
            <Button variant="ghost" size="sm" asChild>
              <Link to="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Back to Home</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
