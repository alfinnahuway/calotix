import Public from "../layouts/Public";
import Highlight from "../components/Highlight";
import Hero from "../components/Hero";
import Promo from "../components/Promo";

const Dashboard = () => {
  return (
    <Public>
      <Hero />
      <Highlight />
      <Promo />
    </Public>
  );
};

export default Dashboard;