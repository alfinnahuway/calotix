import { useEffect } from "react";
import Public from "../layouts/Public";
import { useSelector, useDispatch } from "react-redux";
import {
  setFetchCheckout,
  setLoading,
  setPayment,
} from "../redux/slice/tickets/checkoutTicket";
import axios from "axios";
import { dateFormater } from "../utils/dateFormater";
import { convertPrice } from "../utils/converterRupiah";
import { paymentMethods } from "../data/paymentMethods";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faTicket,
  faCalendarAlt,
  faMapLocationDot,
  faCity,
} from "@fortawesome/free-solid-svg-icons";
const CheckoutTickets = () => {
  const items = localStorage.getItem("checkout");
  const checkoutData = JSON.parse(items);
  const total = checkoutData.tickets.reduce((sum, item) => sum + item.total, 0);
  const dispatch = useDispatch();
  const { headline, poster, venue, regions, start_date, end_date } =
    useSelector((state) => state.checkout.fetchCheckout);
  const payment = useSelector((state) => state.checkout.payment);
  const loading = useSelector((state) => state.checkout.loading);
  const tax = paymentMethods.find((items) => items.name === payment);
  const totalTax =
    payment === "gopay" ? tax?.costService * total : tax?.costService || 0;
  const navigate = useNavigate();
  const { token } = useAuth();
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/events/detail/${checkoutData.eventId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.data;
      dispatch(setFetchCheckout(data));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setPayment(""));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onChecked = (e) => {
    dispatch(setPayment(e.target.value));
  };

  const checkoutSystem = async () => {
    try {
      checkoutData.payment = payment;
      const response = await axios.post(
        "http://localhost:8080/api/orders/create",
        checkoutData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate(`/transaction/${response.data.orderId}/payment`);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!payment) {
      alert("Pilih Metode Pembayaran!!");
      return;
    }
    dispatch(setLoading(true));
    const myTimeout = setTimeout(checkoutSystem, 2000);
    function myStopFunction() {
      clearTimeout(myTimeout);
    }
  };

  return (
    <Public>
      <section className="w-full h-full mb-10">
        <main className="container">
          <div className="w-full grid lg:grid-cols-3 sm:grid-cols-1 gap-4">
            <div className="lg:col-span-3">
              <h1 className="text-xl font-[500] p-2">Detail Pemesanan</h1>
              <div className="w-full bg-[#161618] shadow-sm-light shadow-[#0a0a0a] p-5 rounded-lg">
                <div className="w-full h-full grid lg:grid-cols-3 grid-cols-1 gap-3 text-stone-300">
                  <div className="lg:h-[40vh] h-[20vh] lg:col-span-2 col-span-3 overflow-hidden rounded-lg mb-4">
                    <img
                      className="w-full h-full"
                      src={`http://localhost:8080/${poster}`}
                      alt=""
                    />
                  </div>
                  <div className="w-full lg:col-span-1 col-span-3 ">
                    <h1 className="lg:text-xl text-base font-[700]">
                      {headline}
                    </h1>
                    <p className="lg:text-base text-sm">
                      <Icon className="mr-2" icon={faCalendarAlt} size="sm" />
                      {dateFormater(start_date, end_date)}
                    </p>
                    <p className="lg:text-base text-sm">
                      <Icon
                        className="mr-2"
                        icon={faMapLocationDot}
                        size="sm"
                      />
                      {venue}
                    </p>
                    <p className="lg:text-base text-sm">
                      <Icon className="mr-2" icon={faCity} size="sm" />
                      {regions?.region_city}
                    </p>
                  </div>
                  <div className="lg:w-full overflow-x-scroll col-span-3 ">
                    <table className="lg:w-full  w-[40rem] text-stone-300">
                      <thead className="border-b border-t border-stone-600 pb-4">
                        <tr className="lg:text-base md:text-sm text-sm">
                          <th className="text-left">Kategori Tiket</th>
                          <th className="text-center">Jumlah</th>
                          <th className="text-right">Harga</th>
                          <th className="text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {checkoutData.tickets.map((matchTicket) => (
                          <tr
                            className="lg:text-base md:text-sm text-sm"
                            key={matchTicket.id}
                          >
                            <td>
                              <Icon
                                className="mr-2 -rotate-45"
                                icon={faTicket}
                                size="sm"
                              />
                              {matchTicket.category}
                            </td>

                            <td className="text-center">
                              {matchTicket.quantity}
                            </td>
                            <td className="text-right">
                              {convertPrice(matchTicket.price)}
                            </td>
                            <td className="text-right">
                              {convertPrice(
                                matchTicket.quantity * matchTicket.price
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-fit lg:col-span-2">
              <h1 className="text-xl font-[500] p-2">Pembayaran</h1>
              <div className="w-full  h-full bg-[#161618] shadow-sm-light shadow-[#0a0a0a]  flex  items-start p-5   rounded-lg">
                <div className="lg:grid-cols-6 md:grid-cols-3 grid-cols-2 w-full grid  gap-5">
                  {paymentMethods.map((items) => (
                    <div
                      key={items.id}
                      className={`w-full h-20 bg-white rounded-lg flex justify-center items-center lg:p-0 px-5 ${
                        payment === items.name
                          ? "border-2 border-primary-orange shadow-sm-light shadow-[#e37027]"
                          : "border-2 border-white  "
                      }`}
                    >
                      <input
                        type="radio"
                        className="hidden"
                        name={items.name}
                        id={items.name}
                        value={items.name}
                        onChange={onChecked}
                        checked={payment === items.name}
                      />
                      <label
                        htmlFor={items.name}
                        className="w-full max-sm:h-16 cursor-pointer  p-6 "
                      >
                        <img
                          src={items.link}
                          alt={items.name}
                          className="w-full lg:h-full sm:h-6 max-sm:h-5"
                        />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="">
              <h1 className="text-xl font-[500] p-2">Detail Pembayaran</h1>
              <div className=" text-[#e4e6eb] bg-[#161618] shadow-sm-light shadow-[#0a0a0a] rounded-md  p-5">
                <div className="flex flex-col gap-2 mb-4 text-lg font-[300]">
                  <div className="w-full h-10 flex justify-between gap-2">
                    <input
                      className="w-full text-[#161618] focus:outline-none border-none focus:ring-0 rounded-md"
                      type="text"
                      placeholder="Masukan Promo"
                    />
                    <button className="w-full h-full leading-4 bg-[#e37027] rounded-md">
                      Masukan
                    </button>
                  </div>
                  <div className="flex flex-col mt-5 gap-2 lg:text-base md:text-sm text-sm">
                    <div className="flex justify-between ">
                      <p>Total Harga Tiket </p>
                      <p>{convertPrice(total)}</p>
                    </div>
                    <div className="flex justify-between ">
                      <p>Biaya Layanan </p>
                      <p>{convertPrice(totalTax)}</p>
                    </div>
                    <div className="flex justify-between ">
                      <p>Potongan</p>
                      <p>{convertPrice(totalTax)}</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between font-[700] mb-6">
                  <p className="text-lg">Total Bayar </p>
                  <p className="text-xl">{convertPrice(total + totalTax)}</p>
                </div>
                <div className="flex justify-center items-center">
                  <button
                    onClick={handleSubmit}
                    className={`w-full py-3 flex justify-center items-center bg-primary-orange   hover:bg-[#f78949] font-[600] rounded-lg relative overflow-hidden transition-transform duration-500 ease-in-out transform hover:-translate-y-1 focus:outline-none ${
                      loading ? "pointer-events-none bg-transparent" : ""
                    }`}
                  >
                    {loading ? (
                      <div className="loading absolute gap-1 flex items-end h-[20px] right-32">
                        <div className="w-[6px] rounded-t-lg h-0 bg-primary-orange animate-loading"></div>
                        <div className="w-[6px] rounded-t-lg h-0 bg-primary-orange animate-loading-delay-150"></div>
                        <div className="w-[6px] rounded-t-lg h-0 bg-primary-orange animate-loading-delay-300"></div>
                        <div className="w-[6px] rounded-t-lg h-0 bg-primary-orange animate-loading-delay-450"></div>
                        <div className="w-[6px] rounded-t-lg h-0 bg-primary-orange animate-loading-delay-600"></div>
                        <div className="w-[6px] rounded-t-lg h-0 bg-primary-orange animate-loading-delay-750"></div>
                        <div className="w-[6px] rounded-t-lg h-0 bg-primary-orange animate-loading-delay-900"></div>
                        <div className="w-[6px] rounded-t-lg h-0 bg-primary-orange animate-loading-delay-1050"></div>
                      </div>
                    ) : (
                      "Bayar Tiket"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>
    </Public>
  );
};

export default CheckoutTickets;
