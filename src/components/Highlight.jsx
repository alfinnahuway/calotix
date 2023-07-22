import Slider from "react-slick";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "../../node_modules/react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { useRef, useState } from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { highlightList } from "./highlight-list/highLightList";
const Highlight = () => {
  const sliderRef = useRef(null);
  const [index, setIndex] = useState(0);

  const createCards = (id, link, title, description) => {
    return (
      <div
        key={id}
        className="w-full flex flex-col bg-stone-800 border border-[#656565] overflow-hidden shadow-sm-light shadow-[#25201b]"
      >
        <div className="w-full">
          <LiteYouTubeEmbed
            id={link}
            title="YouTube video player"
            activeClass="lyt-activated"
            iframeClass=""
            playerClass="lty-playbtn"
            wrapperClass="yt-lite"
          />
        </div>
        <div className="w-full h-40 flex flex-col p-4 font-semibold">
          <h1 className="line-clamp-2">{title}</h1>
          <p>{description}</p>
        </div>
      </div>
    );
  };

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
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: false,
    beforeChange: beforeChange,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
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
        },
      },
    ],
  };

  // Mendapatkan lebar tampilan saat ini
  const currentWidth = window.innerWidth;

  // Mendapatkan properti slidesToShow berdasarkan responsif
  let slidesToShow = 2; // Nilai default jika tidak ada responsif yang cocok

  for (const responsiveSetting of settings.responsive) {
    if (currentWidth <= responsiveSetting.breakpoint) {
      slidesToShow = responsiveSetting.settings.slidesToShow;
      break;
    }
  }
  return (
    <>
      <section className="w-full">
        <main className="container mx-auto">
          <div className="w-full h-16 flex justify-end gap-5 px-4 max-sm:hidden">
            <button
              className={`hover:text-gray-600 ${
                index === 0 ? "text-gray-400" : "text-orange-600"
              }`}
              onClick={previous}
              disabled={index === 0}
            >
              <Icon icon={faAngleLeft} size="xl" />
            </button>
            <button
              className={`hover:text-gray-600 ${
                index === slidesToShow ? "text-gray-400" : "text-orange-600"
              }`}
              onClick={next}
              disabled={index === slidesToShow}
            >
              <Icon icon={faAngleRight} size="xl" />
            </button>
          </div>
          <Slider ref={sliderRef} {...settings}>
            {highlightList.map(({ id, link, title, description }) =>
              createCards(id, link, title, description)
            )}
          </Slider>
        </main>
      </section>
    </>
  );
};

export default Highlight;
