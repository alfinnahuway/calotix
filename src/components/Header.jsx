import { Navbar as NavbarBase, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import Logo from "/logo.svg";
import { useAuth } from "../hooks/auth";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import LoadingCalotix from "../utils/components/LoadingCalotix";
import { dateFormater } from "../utils/dateFormater";
import {
  faTicket,
  faSignOutAlt,
  faExchange,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const { logout, token, userAccount } = useAuth();
  const [search, setSearch] = useState("");
  const [loadingSearch, setLoadingSearch] = useState(true);
  const [eventSearch, setEventSearch] = useState([]);
  const handleLogout = () => {
    logout();
  };

  const onchangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const getEventsBySearch = async (itemSearch) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_API_URL
        }/api/events/getAll?search=${itemSearch}`
      );
      setEventSearch(response.data);
      setLoadingSearch(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoadingSearch(true);
    const searchTimeOut = setTimeout(() => {
      getEventsBySearch(search);
    }, 2000);

    return () => {
      clearTimeout(searchTimeOut);
    };
  }, [search]);

  return (
    <NavbarBase
      fluid
      rounded
      className="!bg-[#121212] sticky top-2 !rounded-lg z-[1000] shadow-md shadow-[#0a0a0ae7] lg:container "
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
            <div className="relative cursor-pointer group">
              <div className="w-10 h-10 border-2  hover:border-stone-600 border-transparent overflow-hidden rounded-full">
                <img
                  className="w-full h-full"
                  src={userAccount && userAccount?.avatar}
                  alt={userAccount?.name}
                  key={userAccount?.avatar}
                />
              </div>
              <div className="w-60 h-80 opacity-0 hidden  py-5 hover:block hover:opacity-100   absolute group-hover:block group-hover:opacity-100 -right-4  top-9 transition-all duration-500">
                <div className="w-full h-full bg-[#121212] flex flex-col justify-between p-4 gap-2 rounded-md shadow-md shadow-[#0a0a0a]">
                  <div className="grid grid-cols-1 gap-6 text-stone-300">
                    <Link className="flex items-center gap-2">
                      <div className="w-10 h-10 overflow-hidden rounded-full">
                        <img
                          className="w-full"
                          src={userAccount && userAccount?.avatar}
                          alt={userAccount?.name}
                          key={userAccount?.avatar}
                        />
                      </div>
                      <p className="text-lg font-[500] line-clamp-1">
                        {userAccount?.name}
                      </p>
                    </Link>
                    <div className="flex flex-col gap-2">
                      <Link
                        to="/transaction"
                        className="hover:text-primary-orange"
                      >
                        <Icon
                          className="mr-2 rotate-180"
                          icon={faExchange}
                          size="sm"
                        />
                        Transaksi
                      </Link>
                      <Link className="hover:text-primary-orange">
                        <Icon
                          className="mr-2 rotate-180"
                          icon={faTicket}
                          size="sm"
                        />
                        Tiket Saya
                      </Link>
                    </div>
                  </div>
                  <Button
                    onClick={handleLogout}
                    className="h-10 !bg-primary-orange  hover:!text-white focus:!ring-0 hover:!border-orange-400 border-2 border-transparent !text-black text-sm"
                  >
                    <Icon
                      className="mr-2 rotate-180"
                      icon={faSignOutAlt}
                      size="sm"
                    />
                    <span>Logout</span>
                  </Button>
                </div>
              </div>
            </div>
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
        <div className="lg:relative md:relative lg:w-fit w-full">
          <div className="lg:w-[32rem]  p-1 md:ml-0 md:w-60 bg-[#161618] rounded-lg">
            <input
              className="w-full outline-none focus:border-none focus:ring-0 bg-transparent border-none text-xs"
              type="text"
              placeholder="Cari event terbaikmu"
              value={search}
              onChange={onchangeSearch}
            />
          </div>
          <div
            className={`lg:absolute md:absolute lg:mt-0 mt-2 p-4 top-14 bg-[#161618] shadow-md shadow-[#0a0a0ae7] h-80 w-full rounded-md  ${
              search ? "" : "hidden"
            }`}
          >
            <div
              className={`w-full relative  h-full flex flex-col gap-4  overflow-y-scroll`}
            >
              {loadingSearch ? (
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <LoadingCalotix />
                  <p className="mt-6 lg:text-base text-sm">
                    Sedang mencari event terbaikmu
                  </p>
                </div>
              ) : eventSearch.length > 0 ? (
                eventSearch?.map((event) => (
                  <Link
                    to={`/detail/${event.id}`}
                    key={event.id}
                    className="flex items-center text-stone-300 gap-4 p-2 mr-2 rounded-md hover:bg-[#222224]"
                  >
                    <div className="w-40 h-20 rounded-md overflow-hidden">
                      <img
                        className="w-full h-full"
                        src={event.poster}
                        alt=""
                      />
                    </div>
                    <div>
                      <h1 className="line-clamp-1">{event.headline}</h1>
                      <p className="line-clamp-1">
                        {dateFormater(event.start_date, event.end_date)}
                      </p>
                      <p className="line-clamp-1">
                        {event.regions.region_city}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <div>
                  <p className="absolute right-40 top-44">
                    Hasil Tidak Ditemukan
                  </p>
                </div>
              )}
            </div>
          </div>
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
