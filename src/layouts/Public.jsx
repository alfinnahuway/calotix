import { Navbar } from "flowbite-react";

const Public = ({ children }) => {
	return (
		<section>
			<Navbar />
			{children}
		</section>
	);
};

export default Public;
