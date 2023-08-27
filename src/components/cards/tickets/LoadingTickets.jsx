const LoadingTickets = () => {
  const ticketComponents = () => {
    return (
      <div className="w-full flex items-center justify-between bg-[#2d2d30] rounded-md py-2  px-10 relative">
        <div className="left-0 absolute bottom-6 w-6 h-12 bg-[#121212]  rounded-e-3xl z-10"></div>
        <div className="right-0 absolute bottom-6 w-6 h-12 bg-[#121212] rounded-s-3xl z-10 "></div>
        <div className="w-3/4 h-[5rem] flex justify-center flex-col items-start text-sm font-[600]">
          <h1 className=""></h1>
          <h1 className=""></h1>
        </div>
        <div className="h-full flex items-center border-l border-dashed border-zinc-800  pl-4 gap-3"></div>
      </div>
    );
  };

  return (
    <>
      <div className="w-full grid lg:grid-cols-3 md:grid-cols-1 gap-5 mb-5 animate-pulse">
        <div className="w-full h-[40vh] lg:col-span-2 mr-4 overflow-hidden rounded-md bg-[#2d2d30]"></div>
        <div className="w-full flex flex-col text-[#e4e6eb] bg-[#2d2d30] overflow-hidden rounded-md  p-4 gap-4">
          <div className="">
            <div className="w-48 h-4 bg-[#3e3e42] rounded-sm animate-pulse"></div>
          </div>
          <div>
            <p></p>
            <p></p>
            <p></p>
          </div>
        </div>
      </div>
      <div className="w-full grid lg:grid-cols-3 sm:grid-cols-1 gap-5 animate-pulse">
        <div className="w-full lg:col-span-2"></div>
        <div className="w-full h-full">
          <div className="w-full h-[41vh]flex flex-col gap-2  pr-5">
            {ticketComponents()}
          </div>
          <div className="pr-5  mt-3">
            <div className="w-full bg-neutral-800  rounded-md  px-10 py-2 border border-zinc-800 text-sm font-[600]">
              <h1></h1>
              <h1></h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadingTickets;
