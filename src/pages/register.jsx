import { useState } from "react";
import Public from "../layouts/Public";
import axios from "axios"; // Import Axios for making API requests
import { useNavigate } from "react-router-dom";
import backgroundLogin from "../../src/assets/img/background-03.jpg";
import Logo from "/logo.svg";
import env from "react-dotenv";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const history = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      // Check if password and confirmPassword match
      if (password !== confirmPassword) {
        alert("Password and Confirm Password do not match.");
        return;
      }

      // Construct the registration data
      const registrationData = {
        name: name,
        email: email,
        password: password,
      };

      // Send the registration data to the API
      const response = await axios.post(
        `${env.VITE_REACT_APP_API_URL}/api/users/register`,
        registrationData
      );

      if (response.status === 201) {
        alert("Registration successful!");
        // Optionally, you can redirect the user to the login page after successful registration
        history("/login");
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      alert("An error occurred during registration. Please try again.");
    }
  };

  return (
    <Public>
      <div className=" container h-full   text-stone-50 rounded-lg shadow-lg">
        <div className="w-full  grid lg:grid-cols-3 grid-cols-1 rounded-md shadow-sm-light shadow-[#0a0a0a]">
          <div className="bg-[#1e1e1fe5] py-10">
            <h1 className="text-center mb-10">Buat akun baru</h1>
            <div className=" p-8 rounded-lg">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-stone-300 text-sm py-2"
                >
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={handleNameChange}
                  required
                  className="w-full border bg-transparent border-stone-300 rounded-md py-2 px-3 focus:outline-none focus:ring-primary-orange  focus:border-primary-orange"
                />
              </div>
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
                  className="w-full border bg-transparent border-stone-300 rounded-md py-2 px-3 focus:outline-none focus:ring-primary-orange  focus:border-primary-orange"
                />
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
                  className="w-full border bg-transparent border-stone-300 rounded-md py-2 px-3 focus:outline-none focus:ring-primary-orange  focus:border-primary-orange"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-stone-300 text-sm py-2"
                >
                  Konfirmasi Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                  className="w-full border bg-transparent border-stone-300 rounded-md py-2 px-3 focus:outline-none focus:ring-primary-orange  focus:border-primary-orange"
                />
              </div>
              <button
                onClick={handleSubmit}
                type="button"
                className="w-full bg-primary-orange text-white py-2 px-4 rounded-md hover:bg-[#ff8839] focus:outline-none focus:ring-primary-orange"
              >
                Registrasi
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
                Selamat datang di pendaftaran akun kami! Dengan akun ini, Anda
                bisa pesan tiket lebih cepat dan nikmati penawaran eksklusif.
                Silakan isi detail berikut untuk mendaftar.
              </h2>
            </div>
          </div>
        </div>
      </div>
    </Public>
  );
};

export default RegisterForm;
