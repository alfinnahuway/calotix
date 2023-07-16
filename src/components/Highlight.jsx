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
            <div className="w-full flex flex-col ">
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
              <div className="w-full flex flex-col p-4 border">
                <h1>Name</h1>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Obcaecati id culpa ratione fugit eius earum, magni, nostrum
                  neque atque, eum corporis modi? Odit sint culpa modi illum
                  natus. Assumenda, dolor.
                </p>
              </div>
            </div>
            <div className="w-full">
              <div className="w-full">
                <LiteYouTubeEmbed
                  id="Fpn1imb9qZg"
                  title="YouTube video player"
                  activeClass="lyt-activated"
                  iframeClass=""
                  playerClass="lty-playbtn"
                  wrapperClass="yt-lite"
                />
              </div>
              <div className="w-full flex flex-col p-4 border">
                <h1>Name</h1>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Obcaecati id culpa ratione fugit eius earum, magni, nostrum
                  neque atque, eum corporis modi? Odit sint culpa modi illum
                  natus. Assumenda, dolor.
                </p>
              </div>
            </div>
            <div className="w-full">
              <div className="w-full">
                <LiteYouTubeEmbed
                  id="QO3j9niG1Og"
                  title="YouTube video player"
                  activeClass="lyt-activated"
                  iframeClass=""
                  playerClass="lty-playbtn"
                  wrapperClass="yt-lite"
                />
              </div>
              <div className="w-full flex flex-col p-4 border">
                <h1>Name</h1>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Obcaecati id culpa ratione fugit eius earum, magni, nostrum
                  neque atque, eum corporis modi? Odit sint culpa modi illum
                  natus. Assumenda, dolor.
                </p>
              </div>
            </div>
            <div className="w-full">
              <div className="w-full">
                <LiteYouTubeEmbed
                  id="QO3j9niG1Og"
                  title="YouTube video player"
                  activeClass="lyt-activated"
                  iframeClass=""
                  playerClass="lty-playbtn"
                  wrapperClass="yt-lite"
                />
              </div>
              <div className="w-full flex flex-col p-4 border">
                <h1>Name</h1>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Obcaecati id culpa ratione fugit eius earum, magni, nostrum
                  neque atque, eum corporis modi? Odit sint culpa modi illum
                  natus. Assumenda, dolor.
                </p>
              </div>
            </div>
          </Slider>
        </main>
      </section>
    </>
  );
};

export default Highlight;
