import { Carousel } from "flowbite-react";
import img1 from "../assets/img/hero1.jpg";
import img2 from "../assets/img/hero2.jpg";
import img3 from "../assets/img/hero3.jpg";
import img4 from "../assets/img/hero4.jpg";
import img5 from "../assets/img/hero5.jpg";
import img6 from "../assets/img/hero6.jpg";

import Slider from "react-slick";
import { useState } from "react";
import CustomDots from "../utils/components/CustomDots";

export default function SlidingInterval() {
  const [sliderRef, setSliderRef] = useState(null);
  const settings = {
    arrows: false,
    dots: true,
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "150px",
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 5000,
    adaptiveHeight: true,
    pauseOnHover: false,
    appendDots: (dots) => <ul>{dots}</ul>,
    customPaging: (i) => (
      <div className="ft-slick__dots--custom">
        <div className="loadinghero" />
      </div>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          centerMode: false,

          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          centerMode: false,
          initialSlide: 0,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          adaptiveWidth: true,
          swipeToSlide: true,
        },
      },
    ],
  };
  return (
    // <Carousel slideInterval={5000} className="w-full h-auto md:h-[40vh]">
    //   <div className="relative flex flex-col">
    //     <img alt="..." src={img1} />
    //     <div className=" opacity-0 bg-heroblack absolute w-full h-full flex justify-center items-center hover:opacity-100 transition duration-700 ease-in-out">
    //       <h1 className="text-white text-3xl font-bold font-jose ">Blue</h1>
    //     </div>
    //   </div>
    //   <div className="relative flex flex-col">
    //     <img alt="..." src={img2} />
    //     <div className=" opacity-0 bg-heroblack absolute w-full h-full flex justify-center items-center hover:opacity-100 transition duration-700 ease-in-out">
    //       <h1 className="text-white text-3xl font-bold font-jose ">
    //         Green Day
    //       </h1>
    //     </div>
    //   </div>
    //   <div className="relative flex flex-col">
    //     <img alt="..." src={img3} />
    //     <div className=" opacity-0 bg-heroblack absolute w-full h-full flex justify-center items-center hover:opacity-100 transition duration-700 ease-in-out">
    //       <h1 className="text-white text-4xl font-bold font-jose ">
    //         Blink 182
    //       </h1>
    //     </div>
    //   </div>
    //   <div className="relative flex flex-col">
    //     <img alt="..." src={img4} />
    //     <div className=" opacity-0 bg-heroblack absolute w-full h-full flex justify-center items-center hover:opacity-100 transition duration-700 ease-in-out">
    //       <h1 className="text-white text-3xl font-bold font-jose ">
    //         Arctic Monkeys
    //       </h1>
    //     </div>
    //   </div>
    //   <div className="relative flex flex-col">
    //     <img alt="..." src={img5} />
    //     <div className=" opacity-0 bg-heroblack absolute w-full h-full flex justify-center items-center hover:opacity-100 transition duration-700 ease-in-out">
    //       <h1 className="text-white text-3xl font-bold font-jose ">
    //         Simple Plan
    //       </h1>
    //     </div>
    //   </div>
    //   <div className="relative flex flex-col">
    //     <img alt="..." src={img6} />
    //     <div className=" opacity-0 bg-heroblack absolute w-full h-full flex justify-center items-center hover:opacity-100 transition duration-700 ease-in-out">
    //       <h1 className="text-white text-3xl font-bold font-jose ">
    //         Bring Me The Horizon
    //       </h1>
    //     </div>
    //   </div>
    // </Carousel>
    <div>
      <div>
        <Slider {...settings} ref={(slider) => setSliderRef(slider)}>
          <div className="w-full lg:h-60 h-40 rounded-lg overflow-hidden shadow-sm-light shadow-[#0a0a0a] ">
            <img className="w-full h-full" alt="..." src={img1} />
          </div>
          <div className="w-full lg:h-60 h-40 rounded-lg overflow-hidden shadow-sm-light shadow-[#0a0a0a]">
            <img className="w-full h-full" alt="..." src={img2} />
          </div>
          <div className="w-full lg:h-60 h-40 rounded-lg overflow-hidden shadow-sm-light shadow-[#0a0a0a]">
            <img className="w-full h-full" alt="..." src={img3} />
          </div>
          <div className="w-full lg:h-60 h-40 rounded-lg overflow-hidden shadow-sm-light shadow-[#0a0a0a]">
            <img className="w-full h-full" alt="..." src={img4} />
          </div>
          <div className="w-full lg:h-60 h-40 rounded-lg overflow-hidden shadow-sm-light shadow-[#0a0a0a]">
            <img className="w-full h-full" alt="..." src={img5} />
          </div>
          <div className="w-full lg:h-60 h-40 rounded-lg overflow-hidden shadow-sm-light shadow-[#0a0a0a]">
            <img className="w-full h-full" alt="..." src={img6} />
          </div>
        </Slider>
      </div>
      {/* <CustomDots
        currentSlide={sliderRef ? sliderRef.state.currentSlide : 0}
        slideCount={sliderRef ? sliderRef.props.children.length : 0}
        goTo={(index) => sliderRef.slickGoTo(index)}
      /> */}
    </div>
  );
}
