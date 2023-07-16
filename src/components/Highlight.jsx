import Slider from "react-slick";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "../../node_modules/react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

const Highlight = () => {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	return (
		<>
			<section className="w-full">
				<main className="w-[80%] mx-auto">
					<Slider {...settings}>
						<div className="w-full">
							<LiteYouTubeEmbed
								id="9qD254rDtPs"
								title="YouTube video player"
								activeClass="lyt-activated"
								iframeClass=""
								playerClass="lty-playbtn"
								wrapperClass="yt-lite"
							/>
						</div>
						<div className="w-full">
							<LiteYouTubeEmbed
								id="9qD254rDtPs"
								title="YouTube video player"
								activeClass="lyt-activated"
								iframeClass=""
								playerClass="lty-playbtn"
								wrapperClass="yt-lite"
							/>
						</div>
					</Slider>
				</main>
			</section>
		</>
	);
};

export default Highlight;
