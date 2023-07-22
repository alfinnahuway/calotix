import Footerlocal from "../components/Footer";
import Header from "../components/Header";
import PropTypes from "prop-types";

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

Public.propTypes = {
	children: PropTypes.node,
};
