import React from "react";
import Icon1 from "../images/img2-1.png";
import Icon2 from "../images/img3-3.png";
import Icon3 from "../images/img3-4.png";

import {
  ServicesContainer,
  ServicesH1,
  ServicesWrapper,
  ServicesCard,
  ServicesIcon,
  ServicesH2,
  ServicesP,
} from "./ServicesElements";

const Services = () => {
  return (
    <ServicesContainer id="services">
      <ServicesH1>제공하는 서비스</ServicesH1>
      <ServicesWrapper>
        <ServicesCard>
          <ServicesIcon src={Icon1} />
          <ServicesH2>가시성이 높은 대시보드</ServicesH2>
          <ServicesP>
            검색 결과로 얻은 정보들을 통합하여 대시보드 형태로 제공합니다.
          </ServicesP>
        </ServicesCard>
        <ServicesCard>
          <ServicesIcon src={Icon2} />
          <ServicesH2>
            취약 정보 확인
          </ServicesH2>
          <ServicesP>
            검색 결과 중 보안 위험 요소로 판단되는 정보들을 추출하여 제공합니다.
          </ServicesP>
        </ServicesCard>
        <ServicesCard>
          <ServicesIcon src={Icon3} />
          <ServicesH2>대시보드 컨텐츠 저장</ServicesH2>
          <ServicesP>
            export 기능을 통해 대시보드 화면을 PNG 또는 PDF 형식으로 다운받을 수 있습니다.
          </ServicesP>
        </ServicesCard>
      </ServicesWrapper>
    </ServicesContainer>
  );
};

export default Services;
