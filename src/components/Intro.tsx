import React, { useState } from "react";
import { IonButton, IonText, IonContent } from "@ionic/react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { chevronForward } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import "swiper/css";
import "../assets/styles/Intro.css";
import IntroPng1 from "../assets/images/bg2.webp";
import IntroPng2 from "../assets/images/bg3.webp";
import IntroPng3 from "../assets/images/bg4.webp";
import LogoType from "../assets/images/logotype.webp";

interface ContainerProps {
  onFinish: () => void;
}

const SwiperButtonNext = () => {
  const swiper = useSwiper();
  return (
    <IonButton
      onClick={() => swiper.slideNext()}
      className="next-button"
      fill="clear"
    >
      <IonIcon icon={chevronForward} />
    </IonButton>
  );
};

const Intro: React.FC<ContainerProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(33);

  const handleSlideChange = (swiper: any) => {
    const newProgress = ((swiper.activeIndex + 1) / 3) * 100;
    setProgress(newProgress);
  };

  return (
    <IonContent className="intro-container mx-auto block md:1/3">
      
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>

      <Swiper onSlideChange={handleSlideChange} className="h-full">
        <SwiperSlide>
          <div className="slide-container">
          <img loading="lazy" 
              src={LogoType}
              alt="Logo Type"
              className="logotype"
            />

            <img loading="lazy" 
              src={IntroPng1}
              alt="Personal Cooking"
              className="slide-image"
            />
            <IonText>
              <h3 className="slide-title  caprasimo-bold">
                Your Personal
                <br />
                Cooking Companion
              </h3>
              <p className="slide-description instrument-sans-regular">
                CookPal makes cooking easier and more fun! Save, edit, and
                access your recipes anytime, anywhere.
              </p>
            </IonText>
            <SwiperButtonNext />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="slide-container">
          <img loading="lazy" 
              src={LogoType}
              alt="Logo Type"
              className="logotype"
            />
            <img loading="lazy"  src={IntroPng2} alt="Add Recipe" className="slide-image" />
            <IonText>
              <h2 className="slide-title  caprasimo-bold">Add Your Recipe</h2>
              <p className="slide-description instrument-sans-regular">
                Easily store and organize your favorite recipes to cook your
                favorite dishes. Track ingredients and instructions for each
                recipe.
              </p>
            </IonText>
            <SwiperButtonNext />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="slide-container">
          <img loading="lazy" 
              src={LogoType}
              alt="Logo Type"
              className="logotype"
            />
            <img loading="lazy" 
              src={IntroPng3}
              alt="Cook with Confidence"
              className="slide-image"
            />
            <IonText>
              <h2 className="slide-title  caprasimo-bold">
                Cook with
                <br />
                Confidence
              </h2>
              <p className="slide-description instrument-sans-regular">
                Never second-guess your recipes again! CookPal helps you each
                step, from selecting ingredients to making delicious meals.
              </p>
            </IonText>
            <IonButton
              onClick={onFinish}
              className="get-started-button"
              expand="block"
            >
              Get Started
            </IonButton>
          </div>
        </SwiperSlide>
      </Swiper>
    </IonContent>
  );
};

export default Intro;
