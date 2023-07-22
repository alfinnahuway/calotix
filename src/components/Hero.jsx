import React, { useState, useEffect } from "react";
import SlidingInterval from "./HeroCarousel";

const Hero = () => {
  const textList = ["Ribet", "Antri"];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % textList.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      {/* <main className="hero-img w-full h-screen">
        <div className="bg-heroblack flex flex-col w-full h-screen justify-center items-center">
          <h1 className=" text-orange-500 font-jose font-bold text-6xl p-4 md:text-7xl">
            Nikmati Acara Mu Tanpa&nbsp;
            <span className="text-change text-white">
              {textList[currentTextIndex]}
            </span>
          </h1>
          <div className="w-full p-4">
            <a className="bg-orange-500" href="">
              Ayo Jelajahi
            </a>
          </div>
        </div>
      </main> */}
      <SlidingInterval />
    </>
  );
};
export default Hero;