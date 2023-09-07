import { useState, useEffect } from "react";
import Public from "../layouts/Public";
import { useAuth } from "./../hooks/auth";
import backgroundLogin from "../../src/assets/img/background-01.jpg";
import Logo from "/logo.svg";
import LoadingCalotix from "../utils/components/LoadingCalotix";

const LoginForm = () => {
  const { login, getAccount, token } = useAuth();
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [password, setPassword] = useState(
    localStorage.getItem("password") || ""
  );
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [loginLoad, setLoginLoad] = useState(false);

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
    setLoginLoad(true);
    setTimeout(async () => {
      await login({
        email,
        password,
        setErrorEmail,
        setErrorPassword,
        setLoginLoad,
      });
    }, 2000);
  };

  return (
    <Public>
      {loginLoad && (
        <div className="right-0 left-0 top-0 bottom-0 fixed z-[2000]  bg-[#161618] opacity-80 flex flex-col items-center justify-center gap-2">
          <LoadingCalotix />
          <h1 className="text-xl">Mohon Tunggu</h1>
        </div>
      )}
      <div className="container   text-stone-50 rounded-lg shadow-lg ">
        <div className="w-full h-[80vh] grid lg:grid-cols-3 grid-cols-1 rounded-md  shadow-sm-light shadow-[#0a0a0a]">
          <div className="bg-[#1e1e1fe5] py-10">
            <h1 className="text-center">Masukan akun anda</h1>
            <div className=" p-8 rounded-lg">
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-stone-300 text-sm py-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  className={`w-full border bg-transparent  rounded-md py-2 px-3  ${
                    errorEmail
                      ? "focus:ring-red-600 focus:border-red-600 border border-red-600"
                      : "focus:ring-primary-orange focus:border-primary-orange border border-stone-300"
                  }  `}
                />
                {errorEmail && (
                  <p className="p-1 text-sm text-red-600">{errorEmail}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-stone-300 text-sm py-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  className={`w-full border bg-transparent  rounded-md py-2 px-3  ${
                    errorPassword
                      ? "focus:ring-red-600 focus:border-red-600 border border-red-600"
                      : "focus:ring-primary-orange focus:border-primary-orange border border-stone-300"
                  }  `}
                />
                {errorPassword && (
                  <p className="p-1 text-sm text-red-600">{errorPassword}</p>
                )}
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
                className="w-full bg-primary-orange text-white py-2 px-4 rounded-md hover:bg-[#ff8839] focus:outline-none focus:ring-primary-orange"
              >
                Login
              </button>
            </div>
          </div>
          <div
            className={`w-full h-full col-span-2 relative overflow-hidden rounded-r-md lg:block hidden`}
          >
            <img
              className="w-full h-full absolute -z-20 grayscale"
              src={backgroundLogin}
              alt=""
            />
            <div className="w-full h-full absolute bg-[#161618] opacity-70 -z-10"></div>
            <div className="p-20 flex flex-col gap-10 justify-center items-center">
              <div className="flex">
                <img
                  alt="Flowbite React Logo"
                  className="mr-1 w-20 h-20 p-1"
                  src={Logo}
                />
                <p className="self-center whitespace-nowrap text-3xl font-[400] text-stone-300 drop-shadow-lg pt-4">
                  Calo.
                  <span className="text text-4xl text-primary-orange font-[500]">
                    Tix
                  </span>
                </p>
              </div>
              <h2 className="text-xl mb-6 text-center mix-blend-difference font-[500]">
                Sambut Konser Tiket - Masuk untuk mengejar impian Anda dengan
                tiket konser eksklusif dari kami
              </h2>
            </div>
          </div>
        </div>
      </div>
    </Public>
  );
};

export default LoginForm;
