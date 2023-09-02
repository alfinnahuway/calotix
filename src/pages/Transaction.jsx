import { useEffect } from "react";
import Public from "../layouts/Public";
import moment from "moment";
import axios from "axios";
import { useAuth } from "../hooks/auth";
import { useSelector, useDispatch } from "react-redux";
import { setAllOrder } from "../redux/slice/transaction/transactionSlice";
import { convertPrice } from "../utils/converterRupiah";

const Transaction = () => {
  const allOrder = useSelector((state) => state.transactionSlice.allOrder);
  const { token } = useAuth();
  const dispatch = useDispatch();

  const getAllTransaction = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setAllOrder(response.data));
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTransaction();
  }, []);
  return (
    <Public>
      <section className="w-full h-full">
        <main className="container">
          <div className="grid grid-cols-2">
            <div className="grid grid-cols-1 gap-2">
              {allOrder.map((order) => (
                <div key={order.id} className="w-full bg-[#161618]  p-4">
                  <h1>{order.event?.headline}</h1>
                  <p>{convertPrice(order.amount)}</p>
                  <div className="w-full flex justify-between ">
                    <div>
                      <p>Kode Pesanan</p>
                      <p>Tanggal Pesanan</p>
                    </div>
                    <div>
                      <p>{order.id}</p>
                      <p>{moment(order.createdAt).format("DD MMMM YYYY")}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </section>
    </Public>
  );
};

export default Transaction;
