import Footerlocal from "../components/Footer";
import Header from "../components/Header";
import PropTypes from "prop-types";

const Public = ({ children }) => {
  return (
    <main>
      <Header />
      <div className="py-10">{children}</div>
      <Footerlocal />
    </main>
  );
};

export default Public;

Public.propTypes = {
  children: PropTypes.node,
};
