import { useState, useEffect } from "react";
import Public from "../layouts/Public";
import { useAuth } from "./../hooks/auth";

const LoginForm = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [password, setPassword] = useState(
    localStorage.getItem("password") || ""
  );

  const [rememberMe, setRememberMe] = useState(!!localStorage.getItem("email"));

  useEffect(() => {
    // console.log(import.meta.env.VITE_REACT_APP_LOGIN_API_URL)
    // Save login info in local storage whenever the state values change
    if (rememberMe) {
      localStorage.getItem("isLoggedIn") === "true";
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
    } else {
      localStorage.getItem("isLoggedIn") === "false";
      localStorage.removeItem("email");
      localStorage.removeItem("password");
    }
  }, [email, password, rememberMe]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async () => {
    login({ email, password });
  };

  return (
    <Public>
      <div className="max-w-md mx-auto my-10 p-6  bg-stone-950 text-stone-50 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6">Login</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-stone-50">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
            className="w-full border bg-transparent border-stone-300 rounded-md py-2 px-3 focus:outline-none focus:ring-orange-600  focus:border-orange-600"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-stone-50">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
            className="w-full border bg-transparent border-stone-300 rounded-md py-2 px-3 focus:outline-none focus:ring-orange-600  focus:border-orange-300"
          />
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={handleRememberMeChange}
              className="mr-2"
            />
            <span className="text-stone-50">Remember Me</span>
          </label>
        </div>
        <button
          onClick={handleSubmit}
          type="button"
          className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-orange-600"
        >
          Login
        </button>
      </div>
    </Public>
  );
};

export default LoginForm;
