import {
  increment,
  decrement,
} from "../../../redux/slice/tickets/counterTicket";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { convertPrice } from "../../../utils/converterRupiah";

const TicketsCard = ({ id, category, price, quantity, dispatch }) => {
  const incrementCounter = () => {
    dispatch(increment({ id }));
  };

  const decrementCounter = () => {
    dispatch(decrement({ id }));
  };

  return (
    <div className="w-full flex items-center justify-between bg-[#161618]  rounded-md py-2  px-10 relative border border-zinc-800  hover:border-[#e37027] group">
      <div className="-left-[1px] absolute bottom-6 w-6 h-12 bg-[#212121] border-t border-t-zinc-800 border-b border-b-zinc-800 border-r border-zinc-800 rounded-e-3xl z-10 group-hover:border-t-[#e37027] group-hover:border-b-[#e37027] group-hover:border-r-[#e37027]"></div>
      <div className="-right-[1px] absolute bottom-6 w-6 h-12 bg-[#212121] rounded-s-3xl z-10 border-t border-t-zinc-800 border-b border-b-zinc-800 border-l border-l-zinc-800 group-hover:border-t-[#e37027] group-hover:border-b-[#e37027] group-hover:border-l-[#e37027]"></div>
      <div className="w-3/4 h-[5rem] flex justify-center flex-col items-start text-sm font-[600]">
        <h1 className="">{category}</h1>
        <h1 className="">{convertPrice(price)}</h1>
      </div>
      <div className="h-full flex items-center border-l border-dashed border-zinc-800  pl-4 gap-3">
        {/* Counter start */}
        <button onClick={decrementCounter} className="hover:text-[#e37027]">
          <Icon icon={faMinusCircle} />
        </button>
        <p>{quantity[id] || 0}</p>
        <button onClick={incrementCounter} className="hover:text-[#e37027]">
          <Icon icon={faPlusCircle} />
        </button>
        {/* Counter end */}
      </div>
    </div>
  );
};

export default TicketsCard;
