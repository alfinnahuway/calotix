import Events from "../components/Events";
import Hero from "../components/Hero";
import Highlight from "../components/Highlight";
import Promo from "../components/Promo";
import Public from "../layouts/Public";

const Dashboard = () => {
	return (
		<Public>
			<Hero />
			<Events />
			<Highlight />
			<Promo />
		</Public>
	);
};

export default Dashboard;
