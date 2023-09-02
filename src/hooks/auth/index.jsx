import axios from "axios";
import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("authToken") || null);

  const login = async ({ email, password }) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_REACT_APP_LOGIN_API_URL,
        {
          email: email,
          password: password,
        }
      );
      const newToken = response.data.token;
      setToken(newToken);
      navigate("/");
      localStorage.setItem("authToken", newToken);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("authToken");
  };

  const value = useMemo(
    () => ({
      token,
      login,
      logout,
    }),
    [token]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useAuth = () => {
  return useContext(UserContext);
};
