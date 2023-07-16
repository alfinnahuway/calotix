import { Card } from "flowbite-react";
import Slider from "react-slick";

const Dashboard = () => {
	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 2,
		slidesToScroll: 1,
		className: "w-[97%] mx-auto h-full",
	};

	return (
		<div className="w-[calc(100vw-5rem)] h-screen mx-auto flex justify-center items-center">
			<Card className="h-[50%] w-full">
				<Slider {...settings}>
					<div className="w-full h-full">
						<img
							className="w-full h-full"
							src="https://images.unsplash.com/photo-1661956600684-97d3a4320e45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
						/>
					</div>
					<div className="w-full h-full">
						<img
							className="w-full h-full"
							src="https://images.unsplash.com/photo-1661956600684-97d3a4320e45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
						/>
					</div>
					<div className="w-full h-full">
						<img
							className="w-full h-full"
							src="https://images.unsplash.com/photo-1661956600684-97d3a4320e45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
						/>
					</div>
				</Slider>
			</Card>
		</div>
	);
};

export default Dashboard;
