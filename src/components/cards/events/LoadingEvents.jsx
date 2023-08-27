const LoadingEvents = () => {
  return (
    <div className="animate-pulse w-full h-96 bg-neutral-800 rounded-md overflow-hidden flex flex-col space-x-1 relative">
      <div className="w-full h-40  bg-neutral-700"></div>
      <div className="w-full flex flex-col px-4 py-3 gap-20 border-t  border-neutral-800 ">
        <div className="w-full py-2">
          <div className="w-20 h-2 mb-3 bg-neutral-700 rounded-sm"></div>
          <div className="w-40 h-3 mb-2 bg-neutral-700 rounded-sm"></div>
          <div className="w-24 h-2 bg-neutral-700 rounded-sm"></div>
        </div>
        <div className="bottom-0 absolute py-5 border-t border-neutral-800 w-full text-slate-100">
          <div className="w-16 h-1 bg-neutral-700 rounded-sm mb-2"></div>
          <div className="w-20 h-2 bg-neutral-700 rounded-sm"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingEvents;
