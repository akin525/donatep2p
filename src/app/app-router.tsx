import { RouterProvider } from "react-router";
import { router } from "./app-routes";

export function AppRouter() {
  return <RouterProvider router={router} />;
}
