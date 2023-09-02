import { useState, useEffect } from "react";

const LoadingDots = () => {
  const [dots, setDots] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 3 ? prevDots + "." : ""));
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return <p> Menunggu Pembayaran {dots}</p>;
};

export default LoadingDots;
