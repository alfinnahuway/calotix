const LoadingCalotix = () => {
  return (
    <div className="loading gap-1 flex items-end h-[20px] ml-10 z-[3000]">
      <div className="w-[10px] rounded-t-lg h-0 bg-primary-orange animate-loading"></div>
      <div className="w-[10px] rounded-t-lg h-0 bg-primary-orange animate-loading-delay-150"></div>
      <div className="w-[10px] rounded-t-lg h-0 bg-primary-orange animate-loading-delay-300"></div>
      <div className="w-[10px] rounded-t-lg h-0 bg-primary-orange animate-loading-delay-450"></div>
      <div className="w-[10px] rounded-t-lg h-0 bg-primary-orange animate-loading-delay-600"></div>
      <div className="w-[10px] rounded-t-lg h-0 bg-primary-orange animate-loading-delay-750"></div>
      <div className="w-[10px] rounded-t-lg h-0 bg-primary-orange animate-loading-delay-900"></div>
      <div className="w-[10px] rounded-t-lg h-0 bg-primary-orange animate-loading-delay-1050"></div>
    </div>
  );
};

export default LoadingCalotix;
