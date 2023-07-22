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

const Events = () => {
  const sliderRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [ticket, setTicket] = useState([]);

  const previous = () => {
    sliderRef.current.slickPrev();
  };

  const next = () => {
    sliderRef.current.slickNext();
  };

  const beforeChange = (prev, next) => {
    setIndex(next);
  };

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: false,
    beforeChange: beforeChange,
    dots: false,
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
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          arrows: false,
          dots: false,
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

        setTicket(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getTicket();
  }, []);

  const eventCards = (id, headline, posterUrl1, date, sale, location) => {
    return (
      <Link
        key={id}
        className="w-full text-[#0e0c0a] bg-neutral-950  flex flex-col overflow-hidden shadow-md shadow-zinc-900 rounded-md border border-neutral-800 hover:shadow-orange-400"
      >
        <div className="w-full h-40 overflow-hidden">
          <img className="w-full h-full" src={posterUrl1} alt="" />
        </div>
        <div className="w-full h-2/5  flex flex-col px-4 py-3 gap-20 border-t  border-neutral-800 ">
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

          <div className="bottom-0 py-2 border-t border-neutral-800 w-full text-slate-100">
            <p className="text-xs">Mulai dari</p>
            <p className="text-xs font-semibold">
              {convertPrice(
                sale.reduce((valMin, itemSale) => {
                  const prices = itemSale.price;
                  return prices < valMin ? prices : valMin;
                }, Infinity)
              )}{" "}
              -{" "}
              {convertPrice(
                sale.reduce((valMax, itemSale) => {
                  const prices = itemSale.price;
                  return prices > valMax ? prices : valMax;
                }, 0)
              )}
            </p>
          </div>
        </div>
      </Link>
    );
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
        <h1 className="px-3 text-xl font-bold">Event Terbaru</h1>
        <div className="w-full flex justify-end gap-5 p-4 max-sm:hidden">
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
              index === slidesToShow ? "text-gray-400" : "text-[#e37027]"
            }`}
            onClick={next}
            disabled={index === slidesToShow}
          >
            <Icon icon={faAngleRight} size="xl" />
          </button>
        </div>
        <Slider ref={sliderRef} {...settings}>
          {ticket
            .slice(0, 10)
            .map(({ id, headline, posterUrl1, date, sale, location }) =>
              eventCards(id, headline, posterUrl1, date, sale, location)
            )}
        </Slider>
      </main>
    </section>
  );
};

export default Events;
