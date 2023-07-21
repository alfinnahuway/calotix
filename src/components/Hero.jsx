import { Carousel } from "flowbite-react";
const Hero = () => {
  return (
    <>
      <main className="main-hero relative w-full h-screen bg-center bg-cover bg-no-repeat overflow-hidden">
        <div className="absolute w-full h-screen flex justify-center items-center">
          <h1 className="text-orange-600 font-bold text-7xl md:text-5xl p-4">
            Nikmati Acara Mu Tanpa
            <span className="text-change text-white"> Ribet</span>
          </h1>
        </div>
      </main>

      <Carousel>
        <img
          alt="..."
          src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
        />
        <img
          alt="..."
          src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
        />
        <img
          alt="..."
          src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
        />
        <img
          alt="..."
          src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
        />
        <img
          alt="..."
          src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
        />
      </Carousel>
    </>
  );
};
export default Hero;
