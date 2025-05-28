import { useState } from "react";
import { User } from "@/types/product";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const login = (username: string, password: string): boolean => {
    if (password === "admin123") {
      setUser({ isAdmin: true, username });
      setIsAuthModalOpen(false);
      return true;
    } else if (username && password) {
      setUser({ isAdmin: false, username });
      setIsAuthModalOpen(false);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return {
    user,
    isAuthModalOpen,
    setIsAuthModalOpen,
    login,
    logout,
  };
};
