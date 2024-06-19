import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/login";
import HomePage from "../pages/dashboard"
import Register from "../pages/auth/register";
import { SCREENS } from "./constants";
import Plans from "../pages/dashboard/plans";
import CreatePlan from "../pages/dashboard/plans/create";

export const router = createBrowserRouter([
  {
    index: true,
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
  }
])