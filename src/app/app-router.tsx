import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router";
import Home from "./routes/site/home";
import { NotFound } from "./not-found";
import RegisterPage from "./routes/auth/register";
import LoginPage from "./routes/auth/login";
import Dashboard from "./routes/dashboard/dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/register",
    Component: RegisterPage,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
