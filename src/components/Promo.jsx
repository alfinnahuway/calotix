import {useState} from 'react'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {images} from './listPromo/listPromo'
const Promo = () => {

    
    const [currentImage, setCurrentImage] = useState(0);
    const prevImage = () => {
      const isFirstImage = currentImage === 0;
      const newImage = isFirstImage ? images.length - 1 : currentImage - 1;
      setCurrentImage(newImage);
    };
    const nextImage = () => {
      const isLastImage = currentImage === images.length - 1;
      const newImage = isLastImage ? 0 : currentImage + 1;
      setCurrentImage(newImage);
    };

  return (
    <div>
      <div className="mx-5">
        <h1 className="font-extrabold max-w-[1184px] mx-auto text-xl mb-2 mt-5">Promo Terbaru</h1>
        <div style={{backgroundImage: `url(${images[currentImage].imgUrl})` }} className="mx-auto max-w-[1184px] h-[200px] md:h-[600px] rounded-sm bg-center bg-cover duration-500 relative py-10">
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
}

export default Promo