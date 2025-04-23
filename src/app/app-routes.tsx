import { createBrowserRouter } from "react-router";
import Home from "./routes/site/home";
import { NotFound } from "./not-found";
import RegisterPage from "./routes/auth/register";
import LoginPage from "./routes/auth/login";
import Dashboard from "./routes/dashboard/dashboard";
import Wallet from "./routes/dashboard/wallet";
import Bid from "./routes/dashboard/bid";
import P2p from "./routes/dashboard/p2p";
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
  {
    path:"/wallet",
    Component: Wallet,
  },
  {
    path:"/bid",
    Component:Bid,
  },
  {
    path: "/p2p",
    Component: P2p,
  },
]);
