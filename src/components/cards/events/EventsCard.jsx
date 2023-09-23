import { Link } from "react-router-dom";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faMapLocation,
  faCalendarDay,
} from "@fortawesome/free-solid-svg-icons";
import { convertPrice } from "../../../utils/converterRupiah";
import { reduceMaxValue, reduceMinValue } from "../../../utils/reduceValue";
import { dateFormater } from "../../../utils/dateFormater";
const EventsCard = ({
  id,
  headline,
  poster,
  start_date,
  end_date,
  tickets,
  regions,
}) => {
  return (
    <Link
      to={`/detail/${id}`}
      key={id}
      className="w-full text-[#0e0c0a] bg-[#161618]  flex flex-col overflow-hidden shadow-sm-light shadow-[#0a0a0a] rounded-md  hover:shadow-primary-orange my-2"
    >
      <div className="w-full lg:h-40 md:h-40 h-32 overflow-hidden">
        <img className="w-full h-full" src={poster} alt="" />
      </div>
      <div className="w-full  flex flex-col px-4 py-3 lg:gap-16 md:gap-20 max-sm:gap-10 border-t  border-[#212124] ">
        <div className="w-full">
          <p className=" lg:text-sm md:text-sm text-xs text-slate-300">
            <Icon className="mr-2" icon={faMapLocation} size="sm" />
            {regions?.region_city}
          </p>
          <h1 className="line-clamp-1 font-[500] mb-1 text-slate-100 lg:text-base max-sm:text-sm">
            {headline}
          </h1>
          <p className="lg:text-sm md:text-sm text-xs text-slate-100">
            <Icon className="mr-2 text" icon={faCalendarDay} />
            {dateFormater(start_date, end_date)}
          </p>
        </div>

        <div className="mt-10 lg:mt-0 md:mt-0 sm:mt-20 bottom-0 py-2 border-t border-[#212124] w-full text-slate-100">
          <p className="text-xs">Mulai dari</p>
          <p className="text-xs font-semibold">
            {convertPrice(reduceMinValue(tickets))} -{" "}
            {convertPrice(reduceMaxValue(tickets))}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default EventsCard;
