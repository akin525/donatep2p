import { AppRouter } from "./app-router";
import { AppProvider } from "./provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function App() {
    return (
        <AppProvider>
            <AppRouter />
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="light" // or "dark"
            />
        </AppProvider>
    );
}
