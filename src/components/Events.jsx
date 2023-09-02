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
    // swipe: loading,
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
          slidesToShow: 2,
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
        "http://localhost:8080/api/events/fetch"
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
    <section className="w-full mt-8">
      <main className="container">
        <div className="w-full flex justify-between items-center p-4">
          <h1 className="w-full text-xl font-bold drop-shadow-lg text-stone-300">
            Event Terbaru
          </h1>
          <div
            className={`w-full flex  justify-end gap-5 max-md:hidden max-sm:hidden  ${
              loading && "hidden"
            }`}
          >
            <button
              className={`hover:text-gray-600   ${
                index === 0 ? "text-gray-400" : "text-[#e37027]"
              }`}
              onClick={previous}
              disabled={index === 0}
            >
              <Icon icon={faAngleLeft} size="xl" />
            </button>
            <button
              className={`hover:text-gray-600  ${
                index >= lastIndex ? "text-gray-400" : "text-[#e37027]"
              }`}
              onClick={next}
              disabled={index >= lastIndex}
            >
              <Icon icon={faAngleRight} size="xl" />
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
