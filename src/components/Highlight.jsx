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
  const lastIndex = linkVideos.length - 3;

  const createCards = (id, link, title, description) => {
    return (
      <div
        key={id}
        className="h-80 flex flex-col bg-[#161618] shadow-sm-light shadow-[#0a0a0a]  p-6 rounded-md group relative my-2"
      >
        {/* <div className="-left-[1px] absolute bottom-28 w-5 h-10 bg-[#212121] border-t border-t-zinc-800 border-b border-b-zinc-800 border-r border-r-zinc-800 rounded-e-3xl z-10"></div>
        <div className="-right-[1px] absolute bottom-28 w-5 h-10 bg-[#212121] rounded-s-3xl z-10 border-t border-t-zinc-800 border-b border-b-zinc-800 border-l border-l-zinc-800"></div> */}
        <div className="rounded-lg overflow-hidden border border-zinc-800 shadow-sm group-hover:shadow-orange-400">
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
          slidesToShow: 1.5,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <section className="w-full">
      <main className="container py-10">
        <div className="w-full p-4 flex justify-between">
          <h1 className="text-xl font-[500] drop-shadow-md text-stone-300">
            Sorotan Konser
          </h1>
          <div className=" gap-4 hidden lg:flex md:flex">
            <button
              className={` w-8 h-8 rotate-45 bg-[#161618] pr-1 pt-1 flex justify-center items-center rounded-md shadow-sm focus: shadow-[#0a0a0a] ${
                index === 0 ? "text-gray-400" : "text-primary-orange"
              }`}
              onClick={previous}
              disabled={index === 0}
            >
              <Icon className="rotate-[-45deg]" icon={faAngleLeft} size="xl" />
            </button>
            <button
              className={` w-8 h-8 -rotate-45 bg-[#161618] pl-1 pt-1 flex justify-center items-center rounded-md shadow-sm shadow-[#0a0a0a] ${
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
          {linkVideos.map(({ id, link, title, description }) =>
            createCards(id, link, title, description)
          )}
        </Slider>
      </main>
    </section>
  );
};

export default Highlight;
