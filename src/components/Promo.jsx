import {useState} from 'react'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {slides} from './listPromo/listPromo'
const Promo = () => {

    
    const [currentIndex, setCurrentIndex] = useState(0);
    const prevSlide = () => {
      const isFirstSlide = currentIndex === 0;
      const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
      setCurrentIndex(newIndex);
    };
    const nextSlide = () => {
      const isLastSlide = currentIndex === slides.length - 1;
      const newIndex = isLastSlide ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
    };

  return (
    <div>
      <div className="mx-5">
        <h1 className="font-extrabold max-w-[1184px] mx-auto text-xl mb-2 mt-5">Promo Terbaru</h1>
        <div style={{ backgroundImage: `url(${slides[currentIndex].imgUrl})` }} className="mx-auto max-w-[1184px] h-[200px] md:h-[600px] rounded-sm bg-center bg-cover duration-500 relative py-10">
          <div className="text-stone-50 absolute top-[50%] hover:bg-black/50 left-2 cursor-pointer">
            <FaChevronLeft onClick={prevSlide} size={20} />
          </div>
          <div className="text-stone-50 absolute top-[50%] hover:bg-black/50 right-2 cursor-pointer">
            <FaChevronRight onClick={nextSlide} size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Promo