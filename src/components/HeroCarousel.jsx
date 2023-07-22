import { Carousel } from "flowbite-react";
import img1 from "../assets/img/backgroundSlider-00.jpg";
import img2 from "../assets/img/backgroundSlider-01.jpg";
import img3 from "../assets/img/backgroundSlider-02.jpg";
import img4 from "../assets/img/backgroundSlider-03.jpg";
import img5 from "../assets/img/backgroundSlider-04.jpg";
import img6 from "../assets/img/backgroundSlider-05.jpg";

export default function SlidingInterval() {
  return (
    <Carousel slideInterval={5000} className="w-full h-auto md:h-[40vh]">
      <div className="relative flex flex-col">
        <img alt="..." src={img1} />
        <div className=" opacity-0 bg-heroblack absolute w-full h-full flex justify-center items-center hover:opacity-100 transition duration-700 ease-in-out">
          <h1 className="text-white text-3xl font-bold font-jose ">Blue</h1>
        </div>
      </div>
      <div className="relative flex flex-col">
        <img alt="..." src={img2} />
        <div className=" opacity-0 bg-heroblack absolute w-full h-full flex justify-center items-center hover:opacity-100 transition duration-700 ease-in-out">
          <h1 className="text-white text-3xl font-bold font-jose ">
            Green Day
          </h1>
        </div>
      </div>
      <div className="relative flex flex-col">
        <img alt="..." src={img3} />
        <div className=" opacity-0 bg-heroblack absolute w-full h-full flex justify-center items-center hover:opacity-100 transition duration-700 ease-in-out">
          <h1 className="text-white text-4xl font-bold font-jose ">
            Blink 182
          </h1>
        </div>
      </div>
      <div className="relative flex flex-col">
        <img alt="..." src={img4} />
        <div className=" opacity-0 bg-heroblack absolute w-full h-full flex justify-center items-center hover:opacity-100 transition duration-700 ease-in-out">
          <h1 className="text-white text-3xl font-bold font-jose ">
            Arctic Monkeys
          </h1>
        </div>
      </div>
      <div className="relative flex flex-col">
        <img alt="..." src={img5} />
        <div className=" opacity-0 bg-heroblack absolute w-full h-full flex justify-center items-center hover:opacity-100 transition duration-700 ease-in-out">
          <h1 className="text-white text-3xl font-bold font-jose ">
            Simple Plan
          </h1>
        </div>
      </div>
      <div className="relative flex flex-col">
        <img alt="..." src={img6} />
        <div className=" opacity-0 bg-heroblack absolute w-full h-full flex justify-center items-center hover:opacity-100 transition duration-700 ease-in-out">
          <h1 className="text-white text-3xl font-bold font-jose ">
            Bring Me The Horizon
          </h1>
        </div>
      </div>
    </Carousel>
  );
}
