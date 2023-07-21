import { Navbar } from "flowbite-react";
import Footerlocal from "../components/Footer";
import Promo from "../components/Promo"
const Public = ({ children }) => {
	return (
		<main>
			<Navbar />
			{children}
			<Promo />
			<Footerlocal />
		</main>
	);
};

export default Public;
