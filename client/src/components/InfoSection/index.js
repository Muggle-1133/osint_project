import React from "react";
import { SignupBtnWrap, SignupBtnLink } from "../ButtonElements";
import Search from "../Search";
import {
  InfoContainer,
  InfoWrapper,
  ImgWrap,
  InfoRow,
  Column1,
  Column2,
  TextWrapper,
  TopLine,
  Heading,
  Subtitle,
  Img,
} from "./InfoElements";

const InfoSection = ({
  lightBg,
  id,
  imgStart,
  topLine,
  lightText,
  headline,
  darkText,
  description,
  buttonLabel,
  img,
  alt,
  setLoading
}) => {
  return (
    <>
      <InfoContainer lightBg={lightBg} id={id}>
        <InfoWrapper>
          <InfoRow imgStart={imgStart}>
            <Column1>
              <TextWrapper>
                <TopLine>{topLine}</TopLine>
                <Heading lightText={lightText}>{headline}</Heading>
                <Subtitle darkText={darkText}>{description}</Subtitle>
                {id === "signup" ? (
                  <SignupBtnWrap>
                    <SignupBtnLink to="/signin">{buttonLabel}</SignupBtnLink>
                  </SignupBtnWrap>
                ) : (
                  <></>
                )}
                {id === "search" ? (
                  <Search setLoading={setLoading}/>
                ) : (
                  <></>
                )}
              </TextWrapper>
            </Column1>
            <Column2>
              <ImgWrap>
                <Img src={img} alt={alt} />
              </ImgWrap>
            </Column2>
          </InfoRow>
        </InfoWrapper>
      </InfoContainer>
    </>
  );
};

export default InfoSection;
