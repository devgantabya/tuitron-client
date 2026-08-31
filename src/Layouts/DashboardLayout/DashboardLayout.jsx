import React, { useState } from "react";
import { Link, Outlet } from "react-router";
import { AiOutlineHome } from "react-icons/ai";
import { Menu, X } from "lucide-react";
import { LuFilePen, LuFileSpreadsheet } from "react-icons/lu";
import { FaChalkboardTeacher, FaUsers } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import useRole from "./../../hooks/useRole";
import { Button } from "../../Components/UI/Button";
import { cn } from "../../lib/utils";

const DashboardLayout = () => {
  const { role, isLoading } = useRole();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const menuItems = [
    {
      to: "/",
      icon: <AiOutlineHome size={20} />,
      label: "Homepage",
      show: true,
    },
    {
      to: "/dashboard/add-new-tuition",
      icon: <LuFilePen size={20} />,
      label: "Add New Tuition",
      show: true,
    },
    {
      to: "/dashboard/my-tuitions",
      icon: <LuFileSpreadsheet size={20} />,
      label: "Posted Tuitions",
      show: true,
    },
    {
      to: "/dashboard/approved-tutors",
      icon: <FaChalkboardTeacher size={20} />,
      label: "Approved Tutors",
      show: role?.role === "admin",
    },
    {
      to: "/dashboard/users-management",
      icon: <FaUsers size={20} />,
      label: "Users Management",
      show: role?.role === "admin",
    },
    {
      to: "/dashboard/payment-history",
      icon: <MdPayment size={20} />,
      label: "Payment History",
      show: true,
    },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen w-64 border-r border-border bg-card transition-transform duration-300 lg:translate-x-0 lg:static",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar Header */}
          <div className="flex h-16 items-center justify-between border-b border-border px-6">
            <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              Tuitron
            </h2>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <ul className="space-y-1">
              {menuItems
                .filter((item) => item.show)
                .map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      onClick={() => setSidebarOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground"
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="border-t border-border p-4">
            <p className="text-xs text-muted-foreground text-center">
              Dashboard v1.0
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-card px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">
              Dashboard
            </h1>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
