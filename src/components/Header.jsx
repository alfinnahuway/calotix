import { Navbar as NavbarBase, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import Logo from "/logo.svg";
import { useAuth } from "../hooks/auth";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const { logout, token } = useAuth();
  const handleLogout = () => {
    logout();
  };

  return (
    <NavbarBase
      fluid
      rounded
      className="!bg-[#121212] sticky top-0 !rounded-none z-[9999] shadow-md shadow-[#0a0a0a]"
    >
      <NavbarBase.Brand to="/" className="pl-4" as={Link}>
        <img
          alt="Flowbite React Logo"
          className="mr-1 w-10 sm:h-9 p-1"
          src={Logo}
        />
        <span className="self-center whitespace-nowrap text-xl font-[400] text-stone-300 drop-shadow-lg">
          Calo.
          <span className="text text-xl text-primary-orange font-[500]">
            Tix
          </span>
        </span>
      </NavbarBase.Brand>

      <div className="flex md:order-2 items-center">
        <div className="hidden md:flex gap-2">
          {!token ? (
            <>
              <Link
                className="flex-1 text-primary-orange hover:text-[#fb983cf3] hover:drop-shadow-md border-2 border-transparent rounded-md py-1 px-5 text-sm font-[500]"
                to="/register"
              >
                Daftar
              </Link>
              <Link
                className="flex-1 bg-primary-orange hover:bg-[#fb983cf3] shadow-md hover:shadow-[#212121]   border-2 border-transparent text-[#121212]  py-1 px-4 rounded-lg text-sm font-[500]"
                to="/login"
              >
                Masuk
              </Link>
            </>
          ) : (
            <Button
              onClick={handleLogout}
              className="flex-1 !bg-[#fb923c] hover:!brightness-75 hover:!text-white focus:!ring-0 hover:!border-orange-400 border-2 border-transparent !text-black text-sm"
            >
              Logout
            </Button>
          )}
        </div>
        <NavbarBase.Toggle
          color="orange"
          className="hover:!bg-transparent focus:!ring-0 text-primary-orange"
        />
      </div>
      <NavbarBase.Collapse className="w-full lg:-ml-80 md:ml-0">
        <div className="flex gap-2 md:hidden justify-center items-center w-full mb-4 px-4">
          {!token ? (
            <>
              <Link
                to="/register"
                className="font-medium w-1/2 px-4 py-2 hover:text-gray-300 text-[#e37027] text-sm text-center"
              >
                Daftar
              </Link>
              <Link
                to="/login"
                className="px-4 py-2 rounded  bg-primary-orange w-1/2 text-center text-[#121212]  text-sm font-medium hover:bg-[#fb983cf3] focus:outline-none focus:ring focus:ring-orange-300"
              >
                Masuk
              </Link>
            </>
          ) : (
            <Button
              onClick={handleLogout}
              className="flex-1 !bg-orange-400 hover:!brightness-75 hover:!text-white focus:!ring-0 hover:!border-2 hover:!border-orange-400 border-2 border-transparent !text-black"
            >
              Logout
            </Button>
          )}
        </div>
        <div className="lg:w-96 p-1 md:ml-0 md:w-60 bg-[#161618] rounded-lg">
          <input
            className="w-full outline-none focus:border-none focus:ring-0 bg-transparent border-none text-xs"
            type="text"
            placeholder="Cari event terbaikmu"
          />
        </div>
        <NavbarBase.Link
          href="#"
          className="text-sm !text-white hover:!text-orange-400 hover:!bg-transparent leading-10 border-none"
        >
          <Icon className="mr-2" icon={faCalendarAlt} size="sm" />
          Event
        </NavbarBase.Link>
      </NavbarBase.Collapse>
    </NavbarBase>
  );
};

export default Navbar;
