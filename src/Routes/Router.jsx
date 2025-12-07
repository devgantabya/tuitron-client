import { createBrowserRouter } from "react-router";
import Home from "./../Pages/Home/Home";
import Root from "../Layouts/Root";
import Login from "./../Pages/Login/Login";
import Register from "./../Pages/Register/Register";
import Tuitions from "./../Pages/Tuitions/Tuitions";
import Tutors from "./../Pages/Tutors/Tutors";
import About from "./../Pages/About/About";
import Contact from "./../Pages/Contact/Contact";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "tuitions",
        Component: Tuitions,
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
    ],
  },
]);
