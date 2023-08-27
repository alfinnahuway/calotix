import Slider from "react-slick";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "../../node_modules/react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { useRef, useState } from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { linkVideos } from "../data/linkVideos";
const Highlight = () => {
  const sliderRef = useRef(null);
  const [index, setIndex] = useState(0);

  const createCards = (id, link, title, description) => {
    return (
      <div
        key={id}
        className="w-full flex flex-col bg-neutral-950 border   border-zinc-800  p-6 rounded-lg group relative"
      >
        <div className="-left-[1px] absolute bottom-28 w-5 h-10 bg-[#0c0a09] border-t border-t-zinc-800 border-b border-b-zinc-800 border-r border-r-zinc-800 rounded-e-3xl z-10"></div>
        <div className="-right-[1px] absolute bottom-28 w-5 h-10 bg-[#0c0a09] rounded-s-3xl z-10 border-t border-t-zinc-800 border-b border-b-zinc-800 border-l border-l-zinc-800"></div>
        <div className="w-full rounded-lg overflow-hidden border border-zinc-800 shadow-sm group-hover:shadow-orange-400">
          <LiteYouTubeEmbed
            id={link}
            title="YouTube video player"
            activeClass="lyt-activated"
            iframeClass=""
            playerClass="lty-playbtn"
            wrapperClass="yt-lite"
          />
        </div>
        <div className="w-full h-40 flex flex-col  py-6 px-2 font-semibold border-t border-zinc-900">
          <h1 className="line-clamp-2 font-semibold text-neutral-300">
            {title}
          </h1>
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
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
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
    <section className="w-full">
      <main className="container mx-auto">
        <div className="w-full p-4 flex justify-between max-sm:hidden">
          <h1 className="text-xl font-semibold text-neutral-300">
            Highlight Videos
          </h1>
          <div className="flex gap-4">
            <button
              className={`hover:text-gray-600 ${
                index === 0 ? "text-gray-400" : "text-orange-400"
              }`}
              onClick={previous}
              disabled={index === 0}
            >
              <Icon icon={faAngleLeft} size="xl" />
            </button>
            <button
              className={`hover:text-gray-600 ${
                index === slidesToShow ? "text-gray-400" : "text-orange-400"
              }`}
              onClick={next}
              disabled={index === slidesToShow}
            >
              <Icon icon={faAngleRight} size="xl" />
            </button>
          </div>
        </div>
        <Slider ref={sliderRef} {...settings}>
          {linkVideos.map(({ id, link, title, description }) =>
            createCards(id, link, title, description)
          )}
        </Slider>
      </main>
    </section>
  );
};

export default Highlight;
