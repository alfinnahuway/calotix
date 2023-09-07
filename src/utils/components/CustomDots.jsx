const CustomDots = ({ currentSlide, slideCount, goTo }) => {
  return (
    <div className="flex justify-center mt-4">
      {Array.from({ length: slideCount }, (_, i) => (
        <button
          key={i}
          className={`w-6 h-6 rounded-full mx-2 focus:outline-none ${
            currentSlide === i ? "bg-blue-500" : "bg-gray-300"
          }`}
          onClick={() => goTo(i)}
        ></button>
      ))}
    </div>
  );
};

export default CustomDots;
