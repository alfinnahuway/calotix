import { useEffect } from "react";
import Public from "../layouts/Public";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setPaymentData,
  setStatusPayment,
} from "../redux/slice/payment/paymentSlices";
import { paymentMethods } from "../data/paymentMethods";
import { dateFormater } from "../utils/dateFormater";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faMapLocation,
  faCalendarDay,
  faCity,
  faWallet,
  faTicket,
  faMoneyBillWave,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { w3cwebsocket as WebSocketClient } from "websocket";
import LoadingDots from "../utils/components/LoadingDots";
import { convertPrice } from "../utils/converterRupiah";
import { useAuth } from "../hooks/auth";

const Payment = () => {
  const { token } = useAuth();
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const paymentData = useSelector((state) => state.paymentslices.paymentData);
  const statusPayment = useSelector(
    (state) => state.paymentslices.statusPayment
  );
  const {
    id,
    detailMethod,
    amount,
    event,
    orderBridges,
    merchant_id,
    paymentMethod,
  } = paymentData;
  const srcBank = paymentMethods.find((pay) => pay.name === detailMethod);

  const getDataPayment = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setPaymentData(response.data));
      dispatch(setStatusPayment(response.data.transaction_status));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataPayment();
  }, [orderId]);

  useEffect(() => {
    const ws = new WebSocketClient("ws://api-calotix-product.vercel.app"); // Menghubungkan ke server backend

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      const receivedData = JSON.parse(event.data);
      if (
        receivedData.type === "payment_notification" &&
        receivedData.transaction_status === "settlement"
      ) {
        dispatch(setStatusPayment(receivedData.transaction_status));
      }
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <Public>
      <section className="w-full h-full">
        <main className="container">
          <div className="w-full h-full grid grid-cols-3 gap-4">
            <div className="w-full h-full  row-span-1 bg-[#161618] rounded-lg shadow-md shadow-[#0a0a0a]">
              <div className="text-center">
                <h1 className="text-xl mt-4">
                  {statusPayment === "settlement" ? (
                    "Pembayaran Berhasil"
                  ) : (
                    <LoadingDots />
                  )}
                </h1>
                <Icon
                  className="w-10 h-10 mt-4 text-[#4caf50]"
                  icon={
                    statusPayment === "settlement"
                      ? faCheckCircle
                      : faMoneyBillWave
                  }
                  size="xl"
                />
              </div>
              <div className="grid grid-cols-1 gap-3  border border-stone-600 p-4 rounded-lg top-24 right-12 m-10">
                <div className="flex justify-between items-center border-b border-stone-600 py-2">
                  <h1>
                    <Icon className="mr-2 text" icon={faWallet} />
                    Virtual Account {paymentData.detailMethod?.toUpperCase()}
                  </h1>
                  <img
                    className="bg-white w-20 h-8 p-2 rounded-md"
                    src={srcBank?.link}
                    alt={paymentData.detailMethod}
                  />
                </div>
                <div>
                  <h1 className="text-sm text-stone-500 font-[500]">
                    Kode Pesanan
                  </h1>
                  <p>{id}</p>
                </div>
                <div>
                  <h1 className="text-sm text-stone-500 font-[500]">
                    Merchant ID
                  </h1>
                  <p>{merchant_id}</p>
                </div>
                <div>
                  <h1 className="text-sm text-stone-500 font-[500]">
                    Nomor Virtual Account
                  </h1>
                  <p>{paymentMethod}</p>
                </div>
                <div>
                  <h1 className="text-sm text-stone-500 font-[500]">
                    Total Pembayaran
                  </h1>
                  <p>{convertPrice(amount)}</p>
                </div>
              </div>
            </div>
            <div className="col-span-2 row-span-2 p-4 bg-[#161618] shadow-md shadow-[#0a0a0a] rounded-lg">
              <div className="flex justify-between py-3 border-b border-stone-600">
                <h1 className="">{id}</h1>
                <div className="flex gap-2">
                  <p>{dateFormater(event?.start_date, event?.end_date)}</p>
                  <p>{event?.start_time}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-4">
                <div className="w-full  pr-4 border-r border-stone-600">
                  <h1 className="text-2xl text-stone-300 font-[500] mb-2">
                    {event?.headline}
                  </h1>
                  <div className="overflow-hidden rounded-md mb-4">
                    <img src={event?.poster} alt="" />
                  </div>
                  <div className="pl-2">
                    <p>
                      <Icon className="mr-2 text" icon={faCalendarDay} />
                      {dateFormater(event?.start_date, event?.end_date)}
                    </p>
                    <p>
                      <Icon className="mr-2 text" icon={faClock} />
                      {event?.start_time + " - " + event?.end_time}
                    </p>

                    <p>
                      <Icon className="mr-2 text" icon={faMapLocation} />
                      {event?.venue}
                    </p>
                    <p>
                      <Icon className="mr-2 text" icon={faCity} />
                      {event?.region?.region_city}
                    </p>
                  </div>
                </div>

                <div className="w-full pl-4">
                  <h1>Info Ticket</h1>
                  {orderBridges?.map((items) => (
                    <div key={items.ticket_id} className="">
                      <p>
                        <Icon className="mr-5 text" icon={faTicket} />
                        {items.ticket.category}
                      </p>
                      <p className="pl-10">{items.quantity} Ticket</p>
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

export default Payment;
