import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Tuitions from "../Pages/Tuitions/Tuitions";
import Tutors from "../Pages/Tutors/Tutors";
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";
import TutorProfile from "../Pages/TutorProfile/TutorProfile";
import PrivateRoute from "./PrivateRoute";
import StudentDashboard from "./../Pages/dashboard/StudentDashboard";
import TutorDashboard from "../Pages/dashboard/TutorDashboard";
import AdminDashboard from "./../Pages/dashboard/AdminDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      // Public Routes
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "tuitions",
        element: <Tuitions />,
      },
      {
        path: "tutors",
        element: <Tutors />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "tutor/:id",
        element: <TutorProfile />,
      },

      {
        path: "student-dashboard",
        element: (
          <PrivateRoute allowedRoles={["Student"]}>
            <StudentDashboard />
          </PrivateRoute>
        ),
      },

      {
        path: "tutor-dashboard",
        element: (
          <PrivateRoute allowedRoles={["Tutor"]}>
            <TutorDashboard />
          </PrivateRoute>
        ),
      },

      {
        path: "admin-dashboard",
        element: (
          <PrivateRoute allowedRoles={["Admin"]}>
            <AdminDashboard />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
