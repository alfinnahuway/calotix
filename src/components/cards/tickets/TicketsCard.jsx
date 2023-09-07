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
    <div className="w-full flex items-center justify-between bg-[#161618]  rounded-md py-2  px-10 relative border border-zinc-800  hover:border-primary-orange group">
      <div className="-left-[1px] absolute bottom-10 w-6 h-12 bg-[#212121] border-t border-t-zinc-800 border-b border-b-zinc-800 border-r border-zinc-800 rounded-e-3xl z-10 group-hover:border-t-primary-orange group-hover:border-b-primary-orange group-hover:border-r-primary-orange"></div>
      <div className="-right-[2px] absolute bottom-10 w-6 h-12 bg-[#212121] rounded-s-3xl z-10 border-t border-t-zinc-800 border-b border-b-zinc-800 border-l border-l-zinc-800 group-hover:border-t-primary-orange group-hover:border-b-primary-orange group-hover:border-l-primary-orange"></div>
      <div className="w-full h-[7rem] flex justify-center flex-col gap-3 items-start text-stone-300 lg:text-base md:text-sm text-xs">
        <h1 className="">{category}</h1>
        <h1 className="">{convertPrice(price)}</h1>
      </div>
      <div className="h-full flex items-center border-l border-dashed border-zinc-800  pl-4 gap-3 text-xs lg:text-base md:text-sm">
        {/* Counter start */}
        <button
          onClick={decrementCounter}
          className="hover:text-primary-orange"
        >
          <Icon icon={faMinusCircle} />
        </button>
        <p>{quantity[id] || 0}</p>
        <button
          onClick={incrementCounter}
          className="hover:text-primary-orange"
        >
          <Icon icon={faPlusCircle} />
        </button>
        {/* Counter end */}
      </div>
    </div>
  );
};

export default TicketsCard;
