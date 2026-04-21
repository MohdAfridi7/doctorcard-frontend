import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null);

  // ✅ page refresh pe user restore
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUserState(JSON.parse(storedUser));
    }
  }, []);

  // ✅ user save function
  const setUser = (data) => {
    setUserState(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};