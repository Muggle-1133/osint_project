import styled from "styled-components";

export const ServicesContainer = styled.div`
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #010606;

  @media screen and (max-width: 768px) {
    height: 1100px;
  }

  @media screen and (max-width: 480px) {
    height: 1300px;
  }
`;

export const ServicesWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  justify-content: center;
  grid-gap: 16px;
  padding: 0 50px;

  @media screen and (max-width: 1000px) {
    grid=template-columns: 1fr 1fr;
  }
  @media screen and (max-width: 768px) {
    grid=template-columns: 1fr;
    padding: 0 20px;
  }
`;
export const ServicesCard = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
  max-height: 340px;
  padding: 20px;
  width: 320px;
  height: 320px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.03);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }
`;

export const ServicesIcon = styled.img`
  height: 160px;
  width: 191px;
  margin-bottom: 10px;
`;

export const ServicesH1 = styled.h1`
  font-size: 40px;
  color: #fff;
  margin-bottom: 64px;

  @media screen and (max-width: 480px) {
    font-size: 32px;
  }
`;

export const ServicesH2 = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
  text-align: center;
`;

export const ServicesP = styled.p`
  font-size: 16px;
  text-align: center;
`;
