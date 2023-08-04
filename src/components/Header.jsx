import { Navbar as NavbarBase, Button } from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "/logo.svg";

const Navbar = () => {
  // Get authentication status from local storage on component mount
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  // // Function to handle user login
  // const handleLogin = () => {
  //   // Perform login logic here (e.g., authenticate user, save tokens, etc.)
  //   setIsLoggedIn(true);
  //   // Save login status in local storage
  //   localStorage.setItem("isLoggedIn", "true");
  // };

  // Function to handle user logout
  const handleLogout = () => {
    // Perform logout logic here (e.g., clear tokens, etc.)
    setIsLoggedIn(false);
    // Save logout status in local storage
    localStorage.setItem("isLoggedIn", "false");
  };

  return (
    <NavbarBase
      fluid
      rounded
      className="!bg-black sticky top-0 !rounded-none z-[9999]"
    >
      <NavbarBase.Brand href="/" className="pl-4">
        <img alt="Flowbite React Logo" className="mr-3 h-6 sm:h-9" src={Logo} />
        <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
          Calo.Tix
        </span>
      </NavbarBase.Brand>
      <div className="flex md:order-2">
        <div className="hidden md:flex gap-2">
          <Link to="/register">
            <Button
              color="transparent"
              className="flex-1 !border-orange-400 border-2 !text-orange-400 hover:!brightness-75 hover:!text-white focus:!ring-0"
            >
              Daftar
            </Button>
          </Link>
          <Link to="/login">
            <Button
              color=""
              className="flex-1 !bg-orange-400 hover:!brightness-75 hover:!text-white focus:!ring-0 hover:!border-2 hover:!border-orange-400 border-2 border-transparent !text-black"
            >
              Masuk
            </Button>
          </Link>
        </div>
        <NavbarBase.Toggle
          color="orange"
          className="hover:!bg-transparent focus:!ring-0"
        />
      </div>
      <NavbarBase.Collapse className="!pb-2 ">
        <div className="flex gap-2 md:hidden justify-center items-center w-full mb-4 px-4">
          {!isLoggedIn ? (
            <>
              <Link
                to="/register"
                className="text-white font-medium w-1/2 hover:text-gray-300"
              >
                <Button
                  color="transparent"
                  className="flex-1 !border-orange-400 w-full border-2 !text-orange-400 hover:!brightness-75 hover:!text-white focus:!ring-0"
                >
                  Daftar
                </Button>
              </Link>
              <Link
                to="/login"
                className="px-4 py-2 rounded  bg-orange-600 w-1/2 text-center text-white font-medium hover:bg-orange-700 focus:outline-none focus:ring focus:ring-orange-300"
              >
                {/* <Button
                  color=""
                  className="flex-1 !bg-orange-400 hover:!brightness-75 hover:!text-white focus:!ring-0 hover:!border-2 hover:!border-orange-400 border-2 border-transparent !text-black"
                > */}
                Masuk
                {/* </Button> */}
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-white font-medium hover:text-gray-300"
            >
              Logout
            </button>
          )}
        </div>
        <NavbarBase.Link
          href="#"
          className="text-base !text-white hover:!text-orange-400 hover:!bg-transparent"
        >
          Event
        </NavbarBase.Link>
        <NavbarBase.Link
          href="#"
          className="text-base !text-white  hover:!text-orange-400 hover:!bg-transparent"
        >
          Schedule
        </NavbarBase.Link>
        <NavbarBase.Link
          href="#"
          className="text-base !text-white  hover:!text-orange-400 hover:!bg-transparent"
        >
          About us
        </NavbarBase.Link>
      </NavbarBase.Collapse>
    </NavbarBase>
  );
};

export default Navbar;
