import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAuthToken } from "../utils/auth";
import { toast } from "react-toastify";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyToken = async () => {
            const token = getAuthToken();

            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const response = await fetch(`${baseUrl}dashboard`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                const data = await response.json();

                if (response.ok) {
                    if (data.message === "Telegram Id Verification Required.") {
                        navigate("/verify-telegram");
                        return;
                    }

                    if (data.success === true) {
                        setIsValid(true);
                        return;
                    }
                }

                throw new Error(data.message || "Unauthorized");
            } catch (error: any) {
                localStorage.removeItem("authToken");
                sessionStorage.removeItem("authToken");
                toast.error(error.message || "Session expired. Please login again.");
                navigate("/login");
            }
        };

        verifyToken();
    }, [navigate]);

    if (isValid === null) {
        return <div className="text-white text-center py-8">Checking authentication...</div>;
    }

    return <>{children}</>;
}
