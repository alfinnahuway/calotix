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

const DetailEvent = () => {
  const { id } = useParams();
  const {
    headline,
    poster,
    venue,
    start_date,
    end_date,
    start_time,
    tickets,
    description,
  } = useSelector((state) => state.tickets.allTicket);
  const quantity = useSelector((state) => state.counter.quantity);
  const subtotal = useSelector((state) => state.counter.subtotal);
  const loading = useSelector((state) => state.tickets.loading);
  const checkout = useSelector((state) => state.checkout.checkoutTickets);
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
              <div className="w-full grid lg:grid-cols-3 md:grid-cols-1 gap-5 mb-5">
                <div className="w-full lg:h-[40vh] md:h-[50vh] sm:h-[30vh] lg:col-span-2 mr-4 overflow-hidden rounded-md ">
                  <img
                    className="w-full h-full"
                    src={`http://localhost:8080/uploads/poster/${poster}`}
                    alt=""
                  />
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
                      {dateFormater(start_date, end_date)}
                    </p>
                    <p>
                      <Icon className="mr-2 text" icon={faClock} />
                      {start_time}
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
                </div>
                <div className="w-full h-full">
                  <div className="h-[45vh] flex flex-col gap-2 overflow-y-scroll pr-5">
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
                  <div className="w-full bg-[#161618]  mt-3 flex justify-between items-center border border-zinc-800 text-sm font-[600] rounded-md overflow-hidden p-1">
                    <div className="w-full text-left ml-8">
                      <h1>Total</h1>
                      <h1>{convertPrice(subtotal)}</h1>
                    </div>
                    <div className="w-3/5 h-full text-right rounded-md overflow-hidden">
                      <button
                        onClick={handleCheckout}
                        className="w-full h-full py-4 bg-[#e37027]"
                      >
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
