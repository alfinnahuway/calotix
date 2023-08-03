import Slider from "react-slick";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { convertPrice } from "../utils/converterRupiah";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faMapLocation,
  faCalendarDay,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { reduceMaxValue, reduceMinValue } from "../utils/reduceValue";

const Events = () => {
  const sliderRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [ticket, setTicket] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eventShow, setEventShow] = useState(4);

  const lastIndex = ticket.length - eventShow;

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
    speed: 500,
    slidesToShow: eventShow,
    slidesToScroll: 1,
    initialSlide: 0,
    beforeChange: beforeChange,
    arrows: false,
    // swipe: loading,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          initialSlide: 0,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          adaptiveWidth: true,
        },
      },
    ],
  };

  useEffect(() => {
    const getTicket = async () => {
      try {
        const response = await axios.get(
          "https://64bb45695e0670a501d6e6b5.mockapi.io/ticket"
        );

        setTicket(response.data.slice(0, 10));
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getTicket();

    const handleResize = () => {
      // Mendapatkan lebar tampilan saat ini
      const currentWidth = window.innerWidth;
      setEventShow(4);
      // Mendapatkan properti slidesToShow berdasarkan responsif
      for (const responsiveSetting of settings.responsive) {
        if (currentWidth <= responsiveSetting.breakpoint) {
          setEventShow(responsiveSetting.settings.slidesToShow);
          break;
        }
      }
    };

    // Tambahkan event listener pada resize window
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [settings]);

  const eventCards = (id, headline, posterUrl1, date, sale, location) => {
    return (
      <Link
        to={`/detail/${id}`}
        key={id}
        className=" text-[#0e0c0a] bg-[#161618]  flex flex-col overflow-hidden shadow-sm-light shadow-[#0a0a0a] rounded-md  hover:shadow-orange-400 my-2"
      >
        <div className="w-full h-40 overflow-hidden">
          <img className="w-full h-full" src={posterUrl1} alt="" />
        </div>
        <div className="w-full h-2/5  flex flex-col px-4 py-3 gap-20 border-t  border-[#212124]">
          <div className="w-full">
            <p className="text-sm mb-3 text-slate-300">
              <Icon className="mr-2" icon={faMapLocation} size="sm" />
              {location}
            </p>
            <h1 className="line-clamp-1 font-semibold mb-1 text-slate-100">
              {headline}
            </h1>
            <p className="text-sm text-slate-100">
              <Icon className="mr-2 text" icon={faCalendarDay} />
              {date}
            </p>
          </div>

          <div className="bottom-0 py-2 border-t border-[#212124] w-full text-slate-100">
            <p className="text-xs">Mulai dari</p>
            <p className="text-xs font-semibold">
              {convertPrice(reduceMinValue(sale))} -{" "}
              {convertPrice(reduceMaxValue(sale))}
            </p>
          </div>
        </div>
      </Link>
    );
  };

  const ELoadingCards = () => {
    const fillCards = [];
    const cards = (i) => {
      return (
        <div
          key={i}
          className="animate-pulse w-full h-96 bg-neutral-800 rounded-md overflow-hidden flex space-x-1 relative"
        >
          <div className="w-full h-40  bg-neutral-700"></div>
          <div className="w-full flex flex-col px-4 py-3 gap-20 border-t  border-neutral-800 ">
            <div className="w-full py-2">
              <div className="w-20 h-2 mb-3 bg-neutral-700 rounded-sm"></div>
              <div className="w-40 h-3 mb-2 bg-neutral-700 rounded-sm"></div>
              <div className="w-24 h-2 bg-neutral-700 rounded-sm"></div>
            </div>
            <div className="bottom-0 absolute py-5 border-t border-neutral-800 w-full text-slate-100">
              <div className="w-16 h-1 bg-neutral-700 rounded-sm mb-2"></div>
              <div className="w-20 h-2 bg-neutral-700 rounded-sm"></div>
            </div>
          </div>
        </div>
      );
    };
    for (let i = 0; i < 4; i++) {
      fillCards.push(cards(i));
    }

    return fillCards;
  };

  // Mendapatkan lebar tampilan saat ini
  const currentWidth = window.innerWidth;

  // Mendapatkan properti slidesToShow berdasarkan responsif
  let slidesToShow = 6; // Nilai default jika tidak ada responsif yang cocok

  for (const responsiveSetting of settings.responsive) {
    if (currentWidth <= responsiveSetting.breakpoint) {
      slidesToShow = responsiveSetting.settings.slidesToShow;
      break;
    }
  }

  return (
    <section className="w-full mt-8">
      <main className="container">
        <div className="w-full flex justify-between items-center p-4">
          <h1 className="w-full text-xl font-bold">Event Terbaru</h1>
          <div
            className={`w-full  justify-end gap-5 md:hidden sm:hidden lg:flex ${
              loading && "hidden"
            }`}
          >
            <button
              className={`hover:text-gray-600 ${
                index === 0 ? "text-gray-400" : "text-[#e37027]"
              }`}
              onClick={previous}
              disabled={index === 0}
            >
              <Icon icon={faAngleLeft} size="xl" />
            </button>
            <button
              className={`hover:text-gray-600 ${
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
          {loading
            ? ELoadingCards()
            : ticket && ticket.length > 0
            ? ticket.map(({ id, headline, posterUrl1, date, sale, location }) =>
                eventCards(id, headline, posterUrl1, date, sale, location)
              )
            : ELoadingCards()}
        </Slider>
      </main>
    </section>
  );
};

export default Events;
