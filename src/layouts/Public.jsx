import Footerlocal from "../components/Footer";
import Header from "../components/Header";
const Public = ({ children }) => {
  return (
    <main>
      <Header />
      {children}
      <Footerlocal />
    </main>
  );
};

export default Public;
