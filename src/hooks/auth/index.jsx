import axios from "axios";
import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("authToken") || null);
  const [userAccount, setUserAccount] = useState(
    localStorage.getItem("userAccount") || null
  );

  const getAccount = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/users/account`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserAccount(response.data);
      localStorage.setItem("userAccount", JSON.stringify(response.data));

      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        logout();
        navigate("/login"); // Redirect ke halaman login jika token kadaluarsa
      } else {
        console.log(error);
      }
    }
  };

  const login = async ({
    email,
    password,
    setErrorEmail,
    setErrorPassword,
    setLoginLoad,
  }) => {
    if (!email || !password) {
      setLoginLoad(false);
      setErrorEmail("Email harus diisi");
      setErrorPassword("Password harus diisi");
      return;
    }
    if (!validator.isEmail(email)) {
      setLoginLoad(false);
      setErrorEmail("Email tidak valid");
      return;
    } else {
      setErrorEmail("");
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/users/login`,
        {
          email: email,
          password: password,
        }
      );
      const newToken = response.data.token;
      setToken(newToken);
      localStorage.setItem("authToken", newToken);
    } catch (error) {
      if (error.response.status === 400) {
        if (error.response.data.message === "Empty Field") {
          alert(error.response.data.message);
        } else {
          setErrorPassword(error.response.data.message);
        }
      } else if (error.response.status === 404) {
        setErrorEmail(error.response.data.message);
      } else {
        setError("Terjadi kesalahan saat login");
      }
    } finally {
      setLoginLoad(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUserAccount(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("userAccount");
  };

  useEffect(() => {
    if (token) {
      getAccount();
    }
  }, [token]);

  const value = useMemo(
    () => ({
      token,
      login,
      logout,
      userAccount,
    }),
    [token, userAccount]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useAuth = () => {
  return useContext(UserContext);
};
