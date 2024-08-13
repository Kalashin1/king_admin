import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/dashboard/home";
import Login from "../pages/auth/login";
import { SCREENS } from "./constant";
import Register from "../pages/auth/register";
import Users from "../pages/dashboard/users";
import Courses from "../pages/dashboard/courses";
import CreateCourse from "../pages/dashboard/courses/create";
import Plans from "../pages/dashboard/plans";
import CreatePlan from "../pages/dashboard/plans/create";
import Orders from "../pages/dashboard/orders";
import Invoices from "../pages/dashboard/invoices";
import EditCourse from "../pages/dashboard/courses/edit";
import EditPlan from "../pages/dashboard/plans/edit";

const router = createBrowserRouter([
  {
    index: true,
    element: <Login />,
  },
  {
    path: SCREENS.LOGIN,
    element: <Login />,
  },
  {
    path: SCREENS.DASHBOARD,
    element: <Home />,
  },
  {
    path: SCREENS.REGISTER,
    element: <Register />,
  },
  {
    path: SCREENS.USERS_TABLE,
    element: <Users />,
  },
  {
    path: SCREENS.ORDERS,
    element: <Orders />,
  },
  {
    path: SCREENS.INVOICES,
    element: <Invoices />,
  },
  {
    path: SCREENS.COURSES,
    element: <Courses />,
  },
  {
    path: SCREENS.CREATE_COURSE,
    element: <CreateCourse />,
  },
  {
    path: SCREENS.PLANS,
    element: <Plans />,
  },
  {
    path: SCREENS.CREATE_PLAN,
    element: <CreatePlan />,
  },
  {
    path: SCREENS.EDIT_COURSE(),
    element: <EditCourse />,
  },
  {
    path: SCREENS.EDIT_PLAN(),
    element: <EditPlan />,
  },
]);

export default router;
