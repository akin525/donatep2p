// context/UserContext.tsx
import { createContext, useContext, useState, useEffect } from "react";

interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    balance: string;
    earning: string;
    telegram_id: string;
    country: string;
    profile_photo_path: string | null;
    ref_code: string;
    referral: string;
    status: string;
    bep_address: string | null;
    transactions: Array<{
        description: string;
        status: "Pending" | "Completed" | "Failed";
    }>
    // Add other fields as needed
}

interface UserContextType {
    user: User | null;
    setUser: (user: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser must be used within UserProvider");
    return context;
};
