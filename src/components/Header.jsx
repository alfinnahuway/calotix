import { useState } from "react";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faMagnifyingGlass,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [nav, setNav] = useState(false);
  const [logo, setLogo] = useState(false);
  const handleNav = () => {
    setNav(!nav);
    setLogo(!logo);
  };

  return (
    <>
      <div className="flex justify-between items-center h-20 px-4">
        <div>
          <a href="/" onClick={handleNav} className={logo ? "hidden" : "flex "}>
            <img src="./public/logo.svg" alt="" width={45} />
            <span className="text-3xl md:text-4xl font-bold">Calo.Tix</span>
          </a>
        </div>
        <ul className="hidden md:flex">
          <li className="p-4">Home</li>
          <li className="p-4">Event</li>
          <li className="p-4">Schedule</li>
          <li className="p-4">About us</li>
        </ul>
        <div className="hidden md:flex">
          <Icon icon={faMagnifyingGlass} size="lg" className="mr-4" />
          <Icon icon={faUser} size="lg" />
        </div>

        {/* Hamburger */}
        <div onClick={handleNav} className="md:hidden">
          {nav ? (
            <Icon icon={faXmark} size="xl" />
          ) : (
            <Icon icon={faBars} size="xl" />
          )}
        </div>
        {/* Mobile Menu Dropdown */}
        <div
          onClick={handleNav}
          className={
            nav
              ? "absolute left-0 top-0 w-full bg-gray-100/90 px-4 py-7  flex flex-col z-10"
              : "absolute left-[100%] -z-20"
          }
        >
          <ul className="">
            <button>
              <a href="/" className="flex">
                <img src="./public/logo.svg" alt="" width={45} />
                <span className="text-3xl md:text-4xl font-bold">Calo.Tix</span>
              </a>
            </button>
            <li className="p-4 text-xl border-b">Home</li>
            <li className="p-4 text-xl border-b">Event</li>
            <li className="p-4 text-xl border-b">Schedule</li>
            <li className="p-4 text-xl border-b">About us</li>
            <div className="flex flex-col">
              <button className="p-3 border bg-slate-500 text-white rounded-md ">
                Daftar
              </button>
              <button className="p-3 border bg-slate-500 text-white rounded-md my-6">
                Masuk
              </button>
              <button className="p-3 border bg-slate-500 text-white rounded-md ">
                Search
              </button>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
