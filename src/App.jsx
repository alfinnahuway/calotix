import { Card } from "flowbite-react";
import Slider from "react-slick";

function App() {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 2,
		slidesToScroll: 1,
	};

	return (
		<>
			<Card classsName="w-[calc(100vw-5rem)] mx-auto" href="#">
				<Slider {...settings}>
					<div>
						<img src="https://images.unsplash.com/photo-1682685796014-2f342188a635?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" />
					</div>
					<div>
						<img src="https://images.unsplash.com/photo-1682685796014-2f342188a635?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" />
					</div>
					<div>
						<img src="https://images.unsplash.com/photo-1682685796014-2f342188a635?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" />
					</div>
				</Slider>
			</Card>
		</>
	);
}

export default App;
