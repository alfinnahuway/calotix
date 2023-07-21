import { Navbar } from "flowbite-react";
import Footerlocal from "../components/Footer";
import Hero from "../components/Hero";
const Public = ({ children }) => {
  return (
    <main>
      <Navbar />
      <Hero />
      {children}
      <Footerlocal />
    </main>
  );
};

export default Public;
