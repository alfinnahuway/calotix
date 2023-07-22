import { Navbar as NavbarBase, Button } from "flowbite-react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faUser, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <NavbarBase
      fluid
      rounded
      className="!bg-black sticky top-0 !rounded-none z-[9999]"
    >
      <NavbarBase.Brand href="/">
        <img
          alt="Flowbite React Logo"
          className="mr-3 h-6 sm:h-9"
          src="./public/logo.svg"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
          Calo.Tix
        </span>
      </NavbarBase.Brand>
      <div className="flex md:order-2">
        <div className="hidden md:flex">
          <Icon
            icon={faMagnifyingGlass}
            size="lg"
            className="mr-4"
            color="white"
          />
          <Icon icon={faUser} size="lg" color="white" />
        </div>
        <NavbarBase.Toggle
          color="orange"
          className="hover:!bg-transparent focus:!ring-0"
        />
      </div>
      <NavbarBase.Collapse className="!pb-2 ">
        <div className="flex gap-2 md:hidden">
          <Button
            color="transparent"
            className="flex-1 !border-orange-400 border-2 !text-orange-400 hover:!brightness-75 hover:!text-white focus:!ring-0"
          >
            Daftar
          </Button>
          <Button
            color=""
            className="flex-1 !bg-orange-400 hover:!brightness-75 hover:!text-white focus:!ring-0 hover:!border-2 hover:!border-orange-400 border-2 border-transparent !text-black"
          >
            Masuk
          </Button>
        </div>
        <NavbarBase.Link
          href="#"
          className="text-base !text-white  hover:!text-orange-400 hover:!bg-transparent"
        >
          Home
        </NavbarBase.Link>
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
