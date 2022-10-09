import React from "react";
import { useNavigate } from "react-router-dom";
import "../LandingPage/LandingPage.css";
import "react-pro-sidebar/dist/css/styles.css";

function LandingPage() {
  const navigate = useNavigate();

  const clickMe = () => {
    navigate("/idcard");
  };

  return (
    <div
      style={
        {
          // display: 'flex', justifyContent: 'center', alignItems: 'center'
          // , width: '100%', height: '100vh'
        }
      }
    >
      <section id="home">
        <video auto muted autoPlay loop width="100%" height="100%">
          <source src="img/video.mp4" type="video/mp4" />
        </video>
        <div class="home__container">
          {/* <img src="imgs/i.jpg" alt="me" class="home__avatar" > */}
          <h1 class="home__title">Chou_Chou</h1>
          <h3 class="home__description">Frontend Developer</h3>
        </div>
        <div class="div_button">
          <button class="aaaa" onClick={clickMe}>
            IDCARD
          </button>
          <button class="bbbb">122222IDCA</button>
        </div>
        {/* <div class="div_button2">
          <button>IDCARD2222222222</button>
          <button>IDCARD2222222222</button>
        </div> */}
      </section>
    </div>
  );
}

export default LandingPage;
