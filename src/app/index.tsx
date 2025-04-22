import { AppRouter } from "./app-router";
import { AppProvider } from "./provider";

export function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}
