import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { promo } from "../data/promo";
import { Link } from "react-router-dom";

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
    <div className="w-full">
      <div className="container py-5">
        <Link className="w-full h-20 lg:h-48 rounded-lg">
          <img
            className="w-full h-full rounded-xl"
            src={promo[0].imgUrl}
            alt=""
          />
        </Link>
      </div>
    </div>
  );
};

export default Promo;
