import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/login";
import HomePage from "../pages/dashboard"
import Register from "../pages/auth/register";
import { SCREENS } from "./constants";
import Plans from "../pages/dashboard/plans";
import CreatePlan from "../pages/dashboard/plans/create";
import Courses from "../pages/dashboard/courses";
import Invoices from "../pages/dashboard/invoices";
import Orders from "../pages/dashboard/orders";

export const router = createBrowserRouter([
  {
    index: true,
    element: <Login />
  },
  {
    path: SCREENS.DASHBOARD,
    element: <HomePage />
  },
  {
    path: SCREENS.LOGIN,
    element: <Login />
  },
  {
    path: SCREENS.REGISTER,
    element: <Register />
  },
  {
    path: SCREENS.PLANS,
    element: <Plans />
  },
  {
    path: SCREENS.CREATE_PLAN,
    element: <CreatePlan />
  },
  {
    path: SCREENS.COURSES,
    element: Courses
  },
  {
    path: SCREENS.INVOICES,
    element: Invoices
  },
  {
    path: SCREENS.ORDERS,
    element: Orders
  }
])