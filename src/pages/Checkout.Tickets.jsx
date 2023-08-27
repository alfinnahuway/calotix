import { useEffect } from "react";
import Public from "../layouts/Public";
import { useSelector, useDispatch } from "react-redux";
import {
  setFetchCheckout,
  setPayment,
} from "../redux/slice/tickets/checkoutTicket";
import axios from "axios";
import { dateFormater } from "../utils/dateFormater";
import { convertPrice } from "../utils/converterRupiah";
import { paymentMethods } from "../data/paymentMethods";
import { useNavigate } from "react-router-dom";

const CheckoutTickets = () => {
  const items = localStorage.getItem("checkout");
  const checkoutData = JSON.parse(items);
  const total = checkoutData.tickets.reduce((sum, item) => sum + item.total, 0);
  const dispatch = useDispatch();
  const { headline, poster, venue, start_date, end_date } = useSelector(
    (state) => state.checkout.fetchCheckout
  );
  const payment = useSelector((state) => state.checkout.payment);
  const tax = paymentMethods.find((items) => items.name === payment);
  const totalTax =
    payment === "gopay" ? tax?.costService * total : tax?.costService || 0;
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/events/detail/${checkoutData.eventId}`
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!payment) {
      alert("Pilih Metode Pembayaran!!");
      return;
    }
    try {
      checkoutData.payment = payment;
      const response = await axios.post(
        "http://localhost:8080/api/orders",
        checkoutData
      );
      navigate(`/transaction/${response.data.orderId}/payment`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Public>
      <section className="w-full h-full mb-10">
        <main className="container">
          <div className="w-full grid lg:grid-cols-3 sm:grid-cols-1 gap-4">
            <div className="lg:col-span-2">
              <h1 className="text-xl font-[500] p-2">Detail Pemesanan</h1>
              <div className="w-full border p-5 rounded-lg">
                <div className="w-full h-full grid lg:grid-cols-2 sm:grid-cols-1 max-sm:grid-cols-1 gap-3">
                  <div className="lg:col-span-1 sm:col-span-2 max-sm:col-span-2 overflow-hidden rounded-lg">
                    <img
                      className="w-full"
                      src={`http://localhost:8080/uploads/poster/${poster}`}
                      alt=""
                    />
                  </div>
                  <div className="w-full">
                    <h1 className="lg:text-xl sm:text-lg max-sm:text-md font-[700]">
                      {headline}
                    </h1>
                    <p>Tanggal: {dateFormater(start_date, end_date)}</p>
                    <p>Tempat: {venue}</p>
                  </div>
                  <div className="w-full col-span-2">
                    <table className="w-full">
                      <thead className=" border-b border-t">
                        <tr>
                          <th className="text-left">Kategori Tiket</th>
                          <th className="text-right">Harga</th>
                          <th className="text-right">Jumlah</th>
                        </tr>
                      </thead>
                      <tbody>
                        {checkoutData.tickets.map((matchTicket) => (
                          <tr key={matchTicket.id}>
                            <td>{matchTicket.category}</td>
                            <td className="text-right">
                              {convertPrice(matchTicket.price)}
                            </td>
                            <td className="text-right">
                              {matchTicket.quantity}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:order-2 sm:order-3 max-sm:order-3 lg:mt-0 sm:mt-16 max-sm:mt-12 pt-11">
              <div className=" text-[#e4e6eb] bg-[#161618] shadow-sm-light shadow-[#0a0a0a] rounded-md  p-4">
                <h1 className="font-[500] text-xl mb-6">Detail Harga</h1>
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
                  <div className="flex justify-between ">
                    <p>Total Harga Tiket </p>
                    <p>{convertPrice(total)}</p>
                  </div>
                  <div className="flex justify-between ">
                    <p>Biaya Layanan </p>
                    <p>{convertPrice(totalTax)}</p>
                  </div>
                </div>
                <div className="flex justify-between font-[700] mb-6">
                  <p className="text-lg">Total Bayar </p>
                  <p className="text-xl">{convertPrice(total + totalTax)}</p>
                </div>
                <div className="flex justify-center items-center">
                  <button
                    onClick={handleSubmit}
                    className="w-full p-2 bg-[#e37027] hover:bg-[#f78949] font-[600] rounded-lg"
                  >
                    Bayar Tiket
                  </button>
                </div>
              </div>
            </div>
            <div className="lg:order-3  md:order-2 max-sm:order-2 w-full h-full lg:col-span-2 mt-5 ">
              <h1 className="text-xl font-[500] p-2">Metode Pembayaran</h1>
              <div className="w-full  h-full bg-[#161618]  flex justify-center items-center px-10  py-8 rounded-lg">
                <div className="lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-3 max-sm:grid-cols-2 w-full grid  gap-5">
                  {paymentMethods.map((items) => (
                    <div
                      key={items.id}
                      className={`w-full  bg-white rounded-lg flex justify-center items-center ${
                        payment === items.name
                          ? "border-2 border-[#e37027] shadow-sm-light shadow-[#e37027]"
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
          </div>
        </main>
      </section>
    </Public>
  );
};

export default CheckoutTickets;
