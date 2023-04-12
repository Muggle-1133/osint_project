import React, { useState } from "react";
import Video from "../../videos/video.mp4";
import {
  VideoBg,
  MainBg,
  MainContainer,
  MainContent,
  MainH1,
  MainP,
  MainBtnWrapper,
  ArrowForward,
  ArrowRight,
  homeLocation,
} from "./MainElements";
import { Button } from "../ButtonElements";

const MainSection = ({ loginStat }) => {
  const [hover, setHover] = useState(false);
  let link = "";
  if (loginStat) {
    link = "search";
  } else {
    link = "signup";
  }
  const onHover = () => {
    setHover(!hover);
  };
  return (
    <MainContainer id={homeLocation.id}>
      <MainBg>
        <VideoBg autoPlay loop muted src={Video} type="video/mp4" />
      </MainBg>
      <MainContent>
        <MainH1>
          Try to Responde Security Threat <br />
          Intelligently
        </MainH1>
        <MainP>OSINT 검색 엔진 기반 통합 정보 제공 및 보안 위험 분석</MainP>
        <MainBtnWrapper>
          <Button
            to={link}
            onMouseEnter={onHover}
            onMouseLeave={onHover}
            primary="true"
            dark="true"
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            offset={-80}
          >
            Get started
            {hover ? <ArrowForward /> : <ArrowRight />}
          </Button>
        </MainBtnWrapper>
      </MainContent>
    </MainContainer>
  );
};

export default MainSection;
