import { Navbar } from "flowbite-react";
import Footerlocal from "../components/Footer";
import PropTypes from 'prop-types';

const Public = ({ children }) => {
  return (
    <main>
      <Navbar />
      {children}

      <Footerlocal />
    </main>
  );
};

export default Public;


Public.propTypes = {
  children: PropTypes.node
};