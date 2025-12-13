import React from "react";
import { Link, Outlet } from "react-router";
import { AiOutlineHome } from "react-icons/ai";
import { GoSidebarCollapse } from "react-icons/go";
import { LuFilePen, LuFileSpreadsheet } from "react-icons/lu";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            <span>
              <GoSidebarCollapse size={20} />
            </span>
          </label>
          <div className="px-4 text-2xl font-semibold text-blue-600 dark:text-white">
            Tuitron
          </div>
        </nav>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          <ul className="menu w-full grow space-y-3">
            {/* List item */}
            <li>
              <Link
                to="/"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                <span>
                  <AiOutlineHome size={20} />
                </span>
                <span className="is-drawer-close:hidden">Homepage</span>
              </Link>
            </li>

            <li>
              <Link
                to="/dashboard/add-new-tuition"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Add Tuition"
              >
                <span>
                  <LuFilePen size={20} />
                </span>
                <span className="is-drawer-close:hidden">Add New Tuition</span>
              </Link>
            </li>

            <li>
              <Link
                to="/dashboard/my-tuitions"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Posted Tuitions"
              >
                <span>
                  <LuFileSpreadsheet size={20} />
                </span>
                <span className="is-drawer-close:hidden">Posted Tuitions</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
