import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { promo } from "../data/promo";
const Promo = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const prevImage = () => {
    const isFirstImage = currentImage === 0;
    const newImage = isFirstImage ? promo.length - 1 : currentImage - 1;
    setCurrentImage(newImage);
  };
  const nextImage = () => {
    const isLastImage = currentImage === promo.length - 1;
    const newImage = isLastImage ? 0 : currentImage + 1;
    setCurrentImage(newImage);
  };

  return (
    <div>
      <div className="container">
        <h1 className="font-extrabold mx-auto text-lg mb-1 mt-5">
          Promo Terbaru
        </h1>
        <div
          style={{ backgroundImage: `url(${promo[currentImage].imgUrl})` }}
          className="mx-auto h-[200px] md:h-[400px] rounded-sm bg-center bg-cover duration-500 relative py-10"
        >
          <div className="text-stone-50 absolute top-[50%] hover:bg-black/50 left-2 cursor-pointer">
            <FaChevronLeft onClick={prevImage} size={20} />
          </div>
          <div className="text-stone-50 absolute top-[50%] hover:bg-black/50 right-2 cursor-pointer">
            <FaChevronRight onClick={nextImage} size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promo;
