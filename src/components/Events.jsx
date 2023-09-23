import Slider from "react-slick";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import EventsCard from "./cards/events/EventsCard";
import LoadingEvents from "./cards/events/LoadingEvents";
import { setEvents } from "../redux/slice/events/eventSlices";

const Events = () => {
  const sliderRef = useRef(null);
  const dispatch = useDispatch();
  const events = useSelector((state) => state.eventslices.events);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [eventShow, setEventShow] = useState(4);

  const lastIndex = events.length - eventShow;

  const previous = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const next = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const beforeChange = (prev, next) => {
    setIndex(next);
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 800,
    slidesToShow: eventShow,
    slidesToScroll: 3,
    initialSlide: 0,
    beforeChange: beforeChange,
    swipe: loading ? false : true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 2,
          initialSlide: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          initialSlide: 0,
          slidesToShow: 1.5,
          slidesToScroll: 1,
          arrows: false,
          adaptiveWidth: true,
          swipeToSlide: true,
        },
      },
    ],
  };

  const getAllEvent = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/events/fetch`
      );
      dispatch(setEvents(response.data.data));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      localStorage.removeItem("checkout");
    }
  };

  useEffect(() => {
    getAllEvent();
  }, []);

  const loopLoadingCards = () => {
    const fillCards = [];

    for (let i = 0; i < 4; i++) {
      fillCards.push(<LoadingEvents key={i} />);
    }

    return fillCards;
  };

  return (
    <section className="w-full">
      <main className="container py-5">
        <div className="w-full flex justify-between items-center p-4">
          <h1 className="w-full text-xl font-[500] drop-shadow-lg text-stone-300">
            Event Terbaru
          </h1>
          <div
            className={`w-full flex  justify-end gap-3 max-md:hidden max-sm:hidden  ${
              loading && "hidden"
            }`}
          >
            <button
              className={`w-8 h-8 rotate-45 bg-[#161618] pr-1 pt-1 flex justify-center items-center rounded-md shadow-sm focus: shadow-[#0a0a0a] ${
                index === 0 ? "text-gray-400" : "text-primary-orange"
              }`}
              onClick={previous}
              disabled={index === 0}
            >
              <Icon className="rotate-[-45deg]" icon={faAngleLeft} size="xl" />
            </button>
            <button
              className={`w-8 h-8 -rotate-45 bg-[#161618] pl-1 pt-1 flex justify-center items-center rounded-md shadow-sm shadow-[#0a0a0a] ${
                index >= lastIndex ? "text-gray-400" : "text-primary-orange"
              }`}
              onClick={next}
              disabled={index >= lastIndex}
            >
              <Icon className="rotate-[45deg]" icon={faAngleRight} size="xl" />
            </button>
          </div>
        </div>

        <Slider ref={sliderRef} {...settings}>
          {loading || (!events && events.length < 0)
            ? loopLoadingCards()
            : events.map(
                ({
                  id,
                  headline,
                  poster,
                  start_date,
                  end_date,
                  tickets,
                  regions,
                }) => (
                  <EventsCard
                    key={id}
                    id={id}
                    headline={headline}
                    poster={poster}
                    start_date={start_date}
                    end_date={end_date}
                    tickets={tickets}
                    regions={regions}
                  />
                )
              )}
        </Slider>
      </main>
    </section>
  );
};

export default Events;
