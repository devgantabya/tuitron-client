import { createBrowserRouter } from "react-router";
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
import TuitionDetails from "./../Pages/TuitionDetails/TuitionDetails";
import RootLayout from "../Layouts/RootLayout/RootLayout";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import Error404 from "../Pages/404Error/404Error";
import BeATutor from "../Components/SocialLogin/Protected/BeATutor/BeATutor";
import PostATuition from "../Pages/PostATuition/PostATuition";
import AddNewTuition from "../Pages/AddNewTuition/AddNewTuition";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "tuitions",
        Component: Tuitions,
      },
      {
        path: "tuitions/:id",
        Component: TuitionDetails,
      },
      {
        path: "tutors",
        Component: Tutors,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "contact",
        Component: Contact,
      },
      {
        path: "tutor/:id",
        Component: TutorProfile,
      },
      {
        path: "*",
        Component: Error404,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "be-a-tutor",
        element: (
          <PrivateRoute>
            <BeATutor />
          </PrivateRoute>
        ),
      },
      {
        path: "student/post-a-tuition",
        element: (
          <PrivateRoute>
            <PostATuition />
          </PrivateRoute>
        ),
      },
      {
        path: "student/add-new-tuition",
        element: (
          <PrivateRoute>
            <AddNewTuition />
          </PrivateRoute>
        ),
      },
      {
        path: "student",
        element: (
          <PrivateRoute allowedRoles={["Student"]}>
            <StudentDashboard />
          </PrivateRoute>
        ),
      },

      {
        path: "tutor",
        element: (
          <PrivateRoute allowedRoles={["Tutor"]}>
            <TutorDashboard />
          </PrivateRoute>
        ),
      },

      {
        path: "admin",
        element: (
          <PrivateRoute allowedRoles={["Admin"]}>
            <AdminDashboard />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
