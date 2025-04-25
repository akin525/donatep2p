import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router";
import Home from "./routes/site/home";
import { NotFound } from "./not-found";
import RegisterPage from "./routes/auth/register";
import LoginPage from "./routes/auth/login";
import Dashboard from "./routes/dashboard/dashboard";
import Wallet from "./routes/dashboard/wallet";
import Bid from "./routes/dashboard/bid";
import P2p from "./routes/dashboard/p2p";
import { ProtectedRoute } from "./../components/ProtectedRoute";
import VerifyTelegram from "@/app/routes/dashboard/verify-telegram.tsx";
import VerifyOtpPage from "@/app/routes/dashboard/verify-otp.tsx";
import BidAskHistory from "@/app/routes/dashboard/BidAskHistory.tsx";
import AskPage from "@/app/routes/dashboard/ask.tsx";

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
    Component: () => (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
    ),
  },
  {
    path: "/wallet",
    Component: () => (
        <ProtectedRoute>
          <Wallet />
        </ProtectedRoute>
    ),
  },
  {
    path: "/bid",
    Component: () => (
        <ProtectedRoute>
          <Bid />
        </ProtectedRoute>
    ),
  },
  {
    path: "/p2p",
    Component: () => (
        <ProtectedRoute>
          <P2p />
        </ProtectedRoute>
    ),
  },
  {
    path: "*",
    Component: NotFound,
  },
  {
    path: "/verify-telegram",
    Component: VerifyTelegram,
  },
  {
    path: "/verify-otp",
    Component: VerifyOtpPage,
  },
  {

    path: "/history",
    Component: () => (
        <ProtectedRoute>
          <BidAskHistory/>
        </ProtectedRoute>
    ),
  },
  {

    path: "/ask",
    Component: () => (
        <ProtectedRoute>
          <AskPage/>
        </ProtectedRoute>
    ),
  },
]);
export function AppRouter() {
  return <RouterProvider router={router} />;
}
