import styled from "styled-components";
import { MdKeyboardArrowRight, MdArrowForward } from "react-icons/md";

export const MainContainer = styled.div`
  background: #000100;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  height: calc(100vh - 80px);
  position: relative;
  z-index: 1;

  :before {
    content: "";
    poosition: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.2) 0%,
        rgba(0, 0, 0, 0.6) 100%
      ),
      linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, transparent 100%);
    z-index: 2;
  }
`;

export const MainBg = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const VideoBg = styled.video`
    width: 100%;
    height: 100%;
    /* <video>태그의 크기를 조정하는 방법으로 사용되는 속성 */
    -o-object-fit: cover;
    object-fit: cover:
    background: #232a34;
`;

export const MainContent = styled.div`
  z-index: 3;
  max-width: 1200px;
  position: absolute;
  padding: 8px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

export const MainH1 = styled.h1`
  color: #fff;
  font-size: 48px;
  text-align: center;
  margin-bottom: 20px;

  @media screen and (max-width: 768px) {
    font-size: 40px;
  }

  @media screen and (max-width: 480px) {
    font-size: 32px;
  }
`;

export const MainP = styled.p`
  margin-top: 5px;
  margin-bottom: 20px;
  color: #fff;
  font-size: 24px;
  text-align: center;
  max-width: 600px;

  @media screen and (max-width: 768px) {
    font-size: 24px;
  }

  @media screen and (max-width: 480px) {
    font-size: 18px;
  }
`;

export const MainBtnWrapper = styled.div`
  margin-top: 22px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const ArrowForward = styled(MdArrowForward)`
  margin-left: 6px;
  font-size: 23px;
`;

export const ArrowRight = styled(MdKeyboardArrowRight)`
  margin-left: 6px;
  font-size: 23px;
`;

export const homeLocation = {
  id: "home",
};
