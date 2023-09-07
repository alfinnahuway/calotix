import Public from "../layouts/Public";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { convertPrice } from "../utils/converterRupiah";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faMapLocation,
  faCalendarDay,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { dateFormater } from "../utils/dateFormater";
import { useDispatch, useSelector } from "react-redux";
import { setSubtotal } from "../redux/slice/tickets/counterTicket";
import { setCheckoutTickets } from "../redux/slice/tickets/checkoutTicket";
import {
  setAllTicket,
  setLoadingTicket,
} from "../redux/slice/tickets/detailTicket";
import { useNavigate } from "react-router-dom";
import LoadingTickets from "../components/cards/tickets/LoadingTickets";
import TicketsCard from "../components/cards/tickets/TicketsCard";
import { faCity } from "@fortawesome/free-solid-svg-icons";

const DetailEvent = () => {
  const { id } = useParams();
  const allTicket = useSelector((state) => state.tickets.allTicket);
  const quantity = useSelector((state) => state.counter.quantity);
  const subtotal = useSelector((state) => state.counter.subtotal);
  const loading = useSelector((state) => state.tickets.loading);
  const checkout = useSelector((state) => state.checkout.checkoutTickets);
  const {
    headline,
    poster,
    venue,
    regions,
    start_date,
    end_date,
    start_time,
    tickets,
    description,
  } = allTicket;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getTicket = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/events/detail/${id}`
      );
      dispatch(setAllTicket(response.data.data));
    } catch (err) {
      console.log(err);
    } finally {
      // const quantityId = tickets?.map((ticket) => ticket.id);
      dispatch(setLoadingTicket(false));
      dispatch(setCheckoutTickets([]));
      dispatch(setSubtotal(0));
      // dispatch(setQuantity({ quantityId }));
    }
  };

  useEffect(() => {
    getTicket();
  }, [id]);

  const proccessCheckout = (ticketSale, quantity) => {
    if (id && ticketSale && ticketSale.length > 0) {
      const includeData = [];
      const subtotalTicket = Object.entries(quantity).reduce(
        (acc, [id, qty]) => {
          const ticketSelection = ticketSale.find((items) => items.id == id);
          if (ticketSelection && qty > 0) {
            acc += ticketSelection?.price * qty;
            includeData.push({
              id: id,
              category: ticketSelection.category,
              price: ticketSelection.price,
              quantity: qty,
              total: ticketSelection.price * qty,
            });
          }
          return acc;
        },
        0
      );
      const checkoutAllData = {
        eventId: id,
        tickets: includeData,
      };
      dispatch(setCheckoutTickets(checkoutAllData));
      dispatch(setSubtotal(subtotalTicket));
    }
  };

  useEffect(() => {
    const ticketSale = tickets?.map((items) => items);
    proccessCheckout(ticketSale, quantity);
    const handlePopstate = () => {
      proccessCheckout(ticketSale, quantity);
    };
    window.addEventListener("popstate", handlePopstate);

    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, [tickets, quantity]);

  const handleCheckout = () => {
    if (!quantity || !subtotal) {
      alert("Pilih ticket terlebih dahulu");
    } else {
      localStorage.setItem("checkout", JSON.stringify(checkout));
      navigate("/checkout-tickets");
    }
  };

  return (
    <Public>
      <section className="w-full h-full">
        <main className="container ">
          {loading || !poster ? (
            <LoadingTickets />
          ) : (
            <>
              <div className="w-full grid lg:grid-cols-2 md:grid-cols-1 gap-4 mb-5">
                <div className="w-full grid grid-cols-1 lg:col-span-1 col-span-2 gap-8 row-span-2">
                  <div className="w-full  lg:col-span-1  col-span-2  lg:h-[40vh] md:h-[50vh] h-[40vh]  mr-4 overflow-hidden rounded-md lg:-mb-10">
                    <img
                      className="w-full h-full"
                      src={`http://localhost:8080/${poster}`}
                      alt=""
                    />
                  </div>
                  <div className="flex h-fit  flex-col lg:col-span-1 col-span-2  ">
                    <div className="text-[#e4e6eb] bg-[#161618] shadow-sm-light shadow-[#0a0a0a] rounded-md p-4 ">
                      <div className="">
                        <h1 className="text-base lg:text-lg font-[500] line-clamp-2">
                          {headline}
                        </h1>
                      </div>
                      <div className="text-sm lg:text-base">
                        <p>
                          <Icon className="mr-2" icon={faCalendarDay} />
                          {dateFormater(start_date, end_date)}
                        </p>
                        <p>
                          <Icon className="mr-2" icon={faClock} />
                          {start_time}
                        </p>
                        <p>
                          <Icon className="mr-2" icon={faMapLocation} />
                          {venue}
                        </p>
                        <p>
                          <Icon className="mr-2" icon={faCity} />
                          {regions?.region_city}
                        </p>
                        <div className="w-full mt-10 flex justify-between items-center text-left">
                          <h1>Total</h1>
                          <h1 className="text-base lg:text-lg font-[500]">
                            {convertPrice(subtotal)}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full h-fit grid grid-cols-1 lg:gap-5  lg:col-span-1 md:col-span-1  col-span-2 row-span-2 lg:order-2 md:order-2 order-3">
                  <div>
                    <h1 className="text-lg font-[500] mb-5">Pilih Tiket</h1>
                    <div
                      className={`${
                        tickets.length > 3 && "overflow-y-scroll"
                      }  flex flex-col gap-2  pr-2 lg:h-[54vh] h-[45vh] `}
                    >
                      {tickets.map((items) => (
                        <TicketsCard
                          key={items.id}
                          id={items.id}
                          category={items.category}
                          price={items.price}
                          quantity={quantity}
                          dispatch={dispatch}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="w-full h-fit  lg:mb-10 lg:mt-0 mt-40">
                    <div className="w-full h-[6vh]  flex justify-end">
                      <button
                        onClick={handleCheckout}
                        className="h-full px-5 bg-primary-orange text-sm rounded-md  font-[500] text-stone-300"
                      >
                        Lanjutkan
                      </button>
                    </div>
                  </div>
                </div>
                <div className="w-full col-span-2  order-4 ">
                  <h1 className="text-xl font-[500] mb-4">Deskripsi</h1>
                  <p className="text-sm mb-2 text-justify">{description}</p>
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
