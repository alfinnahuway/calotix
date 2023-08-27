import { useEffect } from "react";
import Public from "../layouts/Public";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPaymentData } from "../redux/slice/payment/paymentSlices";
import { paymentMethods } from "../data/paymentMethods";
import { dateFormater } from "../utils/dateFormater";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faMapLocation,
  faCalendarDay,
  faCity,
  faWallet,
  faTicket,
} from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { w3cwebsocket as WebSocketClient } from "websocket";

const Payment = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const paymentData = useSelector((state) => state.paymentslices.paymentData);
  const { id, bank, amount, va_number, event, orderBridges } = paymentData;
  const srcBank = paymentMethods.find((pay) => pay.name === bank);
  const websocketURL = "ws://localhost:8080/notification";

  const getDataPayment = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/orders/${orderId}`
      );
      dispatch(setPaymentData(response.data));
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataPayment();
  }, []);

  useEffect(() => {
    const client = new WebSocketClient(websocketURL);

    client.onopen = () => {
      console.log("WebSocket client connected");
    };

    client.onmessage = (message) => {
      const data = JSON.parse(message.data);
      if (data.type === "notification") {
        console.log((prevNotifications) => [
          ...prevNotifications,
          data.transactions,
        ]);
      }
    };

    return () => {
      client.close();
    };
  }, [websocketURL]);

  return (
    <Public>
      <section className="w-full h-full">
        <main className="container">
          <div className="w-full h-full grid grid-cols-3 gap-4">
            <div className="w-full h-full grid grid-cols-1 gap-3 row-span-1 bg-[#161618] p-4 rounded-lg">
              <div className="flex justify-between items-center border-b py-2">
                <h1>
                  <Icon className="mr-2 text" icon={faWallet} />
                  Virtual Account {paymentData.bank?.toUpperCase()}
                </h1>
                <img
                  className="bg-white w-20 h-8 p-2 rounded-md"
                  src={srcBank?.link}
                  alt={paymentData.bank}
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
                  Nomor Virtual Account
                </h1>
                <p>{va_number}</p>
              </div>
              <div>
                <h1 className="text-sm text-stone-500 font-[500]">
                  Total Pembayaran
                </h1>
                <p>{amount}</p>
              </div>
            </div>
            <div className="col-span-2 row-span-2 p-4 bg-[#161618] rounded-lg">
              <div className="flex justify-between py-3 border-b">
                <h1 className="">{id}</h1>
                <div className="flex gap-2">
                  <p>{dateFormater(event?.start_date, event?.end_date)}</p>
                  <p>{event?.start_time}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-4">
                <div className="w-full  pr-4 border-r">
                  <h1 className="text-2xl text-stone-300 font-[500] mb-2">
                    {event?.headline}
                  </h1>
                  <div className="overflow-hidden rounded-md mb-4">
                    <img
                      src={`http://localhost:8080/uploads/poster/${event?.poster}`}
                      alt=""
                    />
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
              <div className="w-full h-full"></div>
            </div>
          </div>
        </main>
      </section>
    </Public>
  );
};

export default Payment;
