import Public from "../layouts/Public";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { convertPrice } from "../utils/converterRupiah";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faMinusCircle,
  faPlusCircle,
  faMapLocation,
  faCalendarDay,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

const DCardTickets = (
  id,
  category,
  price,
  setCounter,
  counter,
  setLastClickedId,
  lastClickedId
) => {
  const incrementCounter = () => {
    if (lastClickedId !== id) {
      setCounter((prevCounter) => ({
        ...prevCounter,
        [lastClickedId]: 0,
      }));
      setLastClickedId(id);
    }
    setCounter((prevCounter) => ({
      ...prevCounter,
      [id]: (prevCounter[id] || 0) + 1,
    }));
  };

  const decrementCounter = () => {
    if (lastClickedId !== id) {
      setCounter((prevCounter) => ({
        ...prevCounter,
        [lastClickedId]: 0,
      }));
      setLastClickedId(id);
    }

    if (counter[id] > 0) {
      setCounter((prevCounter) => ({
        ...prevCounter,
        [id]: prevCounter[id] - 1,
      }));
    }
  };

  return (
    <div
      key={id}
      className="w-full flex items-center justify-between bg-[#161618]  rounded-md py-2  px-10 relative border border-zinc-800  hover:border-[#e37027] group"
    >
      <div className="-left-[1px] absolute bottom-6 w-6 h-12 bg-[#121212] border-t border-t-zinc-800 border-b border-b-zinc-800 border-r border-zinc-800 rounded-e-3xl z-10 group-hover:border-t-[#e37027] group-hover:border-b-[#e37027] group-hover:border-r-[#e37027]"></div>
      <div className="-right-[1px] absolute bottom-6 w-6 h-12 bg-[#121212] rounded-s-3xl z-10 border-t border-t-zinc-800 border-b border-b-zinc-800 border-l border-l-zinc-800 group-hover:border-t-[#e37027] group-hover:border-b-[#e37027] group-hover:border-l-[#e37027]"></div>
      <div className="w-3/4 h-[5rem] flex justify-center flex-col items-start text-sm font-[600]">
        <h1 className="">{category}</h1>
        <h1 className="">{convertPrice(price)}</h1>
      </div>
      <div className="h-full flex items-center border-l border-dashed border-zinc-800  pl-4 gap-3">
        {/* Counter start */}
        <button onClick={decrementCounter} className="hover:text-[#e37027]">
          <Icon icon={faMinusCircle} />
        </button>
        <p>{counter[id] || 0}</p>
        <button onClick={incrementCounter} className="hover:text-[#e37027]">
          <Icon icon={faPlusCircle} />
        </button>
        {/* Counter end */}
      </div>
    </div>
  );
};

const DLoading = () => {
  const ticketComponents = () => {
    return (
      <div className="w-full flex items-center justify-between bg-[#2d2d30] rounded-md py-2  px-10 relative">
        <div className="left-0 absolute bottom-6 w-6 h-12 bg-[#121212]  rounded-e-3xl z-10"></div>
        <div className="right-0 absolute bottom-6 w-6 h-12 bg-[#121212] rounded-s-3xl z-10 "></div>
        <div className="w-3/4 h-[5rem] flex justify-center flex-col items-start text-sm font-[600]">
          <h1 className=""></h1>
          <h1 className=""></h1>
        </div>
        <div className="h-full flex items-center border-l border-dashed border-zinc-800  pl-4 gap-3"></div>
      </div>
    );
  };

  return (
    <>
      <div className="w-full grid lg:grid-cols-3 md:grid-cols-1 gap-5 mb-5 animate-pulse">
        <div className="w-full h-[40vh] lg:col-span-2 mr-4 overflow-hidden rounded-md bg-[#2d2d30]"></div>
        <div className="w-full flex flex-col text-[#e4e6eb] bg-[#2d2d30] overflow-hidden rounded-md  p-4 gap-4">
          <div className="">
            <div className="w-48 h-4 bg-[#3e3e42] rounded-sm animate-pulse"></div>
          </div>
          <div>
            <p></p>
            <p></p>
            <p></p>
          </div>
        </div>
      </div>
      <div className="w-full grid lg:grid-cols-3 sm:grid-cols-1 gap-5 animate-pulse">
        <div className="w-full lg:col-span-2"></div>
        <div className="w-full h-full">
          <div className="w-full h-[41vh]flex flex-col gap-2  pr-5">
            {ticketComponents()}
          </div>
          <div className="pr-5  mt-3">
            <div className="w-full bg-neutral-800  rounded-md  px-10 py-2 border border-zinc-800 text-sm font-[600]">
              <h1></h1>
              <h1></h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const DetailEvent = () => {
  const { id } = useParams();
  const [
    {
      headline,
      posterUrl1,
      location,
      venue,
      date,
      times,
      sale,
      description,
      termCondition,
    },
    setDetailTicket,
  ] = useState([]);
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState({});
  const [lastClickedId, setLastClickedId] = useState(null);
  const [countVal, setCountVal] = useState(null);

  useEffect(() => {
    const getTicket = async () => {
      try {
        const response = await axios.get(
          `https://64bb45695e0670a501d6e6b5.mockapi.io/ticket/${id}`
        );

        setDetailTicket(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getTicket();
  }, []);
  return (
    <Public>
      <section className="w-full h-full">
        <main className="container ">
          {loading || !headline ? (
            DLoading()
          ) : (
            <>
              <div className="w-full grid lg:grid-cols-3 md:grid-cols-1 gap-5 mb-5">
                <div className="w-full lg:h-[40vh] md:h-[50vh] sm:h-[30vh] lg:col-span-2 mr-4 overflow-hidden rounded-md ">
                  <img className="w-full h-full" src={posterUrl1} alt="" />
                </div>
                <div className="w-full flex flex-col text-[#e4e6eb] bg-[#161618] shadow-sm-light shadow-[#0a0a0a] rounded-md  p-4 gap-4">
                  <div className="">
                    <h1 className="text-xl font-[600] line-clamp-2">
                      {headline}
                    </h1>
                  </div>
                  <div>
                    <p>
                      <Icon className="mr-2 text" icon={faCalendarDay} />
                      {date}
                    </p>
                    <p>
                      <Icon className="mr-2 text" icon={faClock} />
                      {times}
                    </p>
                    <p>
                      <Icon className="mr-2 text" icon={faMapLocation} />
                      {venue}
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full grid lg:grid-cols-3 sm:grid-cols-1 gap-5">
                <div className="w-full lg:col-span-2">
                  <h1 className="text-xl font-[500] mb-4">Deskripsi</h1>
                  <p className="text-sm mb-2">{description}</p>
                  <h1 className="text-xl font-[500] mb-4">
                    Syarat dan Ketentuan
                  </h1>
                  {termCondition.map((condition, index) => (
                    <li
                      key={index}
                      className="text-sm mb-2 text-justify list-none"
                    >
                      {condition}
                    </li>
                  ))}
                </div>
                <div className="w-full h-full">
                  <div className="h-[45vh] flex flex-col gap-2 overflow-y-scroll pr-5">
                    {sale?.map((items) =>
                      DCardTickets(
                        items.id,
                        items.category,
                        items.price,
                        setCounter,
                        counter,
                        setLastClickedId,
                        lastClickedId
                      )
                    )}
                  </div>
                  <div className="w-full bg-[#161618]  mt-3 flex justify-between items-center border border-zinc-800 text-sm font-[600] rounded-md overflow-hidden p-1">
                    <div className="w-full text-left ml-8">
                      <h1>Total</h1>
                      <h1>
                        {convertPrice(
                          counter[lastClickedId] *
                            sale?.find((items) => items.id === lastClickedId)
                              ?.price || 0
                        )}
                      </h1>
                    </div>
                    <div className="w-3/5 h-full text-right rounded-md overflow-hidden">
                      <button className="w-full h-full py-4 bg-[#e37027]">
                        Lanjutkan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </section>
    </Public>
  );
};

export default DetailEvent;
