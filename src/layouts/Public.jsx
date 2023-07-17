import { Navbar } from "flowbite-react";
import Footerlocal from "../components/Footer";
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
