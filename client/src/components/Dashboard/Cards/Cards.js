import React from "react";
import "./Cards.css";
import Card from "../Card/Card";

const Cards = ({ values }) => {
  let shodan_data = 0;
  if (values.shodan.this_year_cve) {
    shodan_data += values.shodan.this_year_cve.length;
  }
  if (values.shodan.previous_year_cve) {
    shodan_data += values.shodan.previous_year_cve.length;
  }

  const GraphCardData = {
    title: "검색엔진별 취약점 탐지 개수",
    color: {
      backGround: "#383838a1",
      boxShadow: "rgb(80 80 80 / 52%) 0px 10px 20px 0px",
    },
    series: [
      {
        name: "탐지 개수(number of detections)",
        data: [
          values.virustotal.total_detected_virus,
          shodan_data,
          values.hunter.total_leaked_emails,
        ],
      },
    ],
  };

  const now = new Date();
  let thisYear = now.getFullYear();
  let previousYear = now.getFullYear() - 1;
  let thisYear_cve_len;
  let previousYear_cve_len;
  if (
    values.shodan.this_year_cve === "" ||
    values.shodan.this_year_cve === undefined
  ) {
    thisYear_cve_len = 0;
  } else {
    thisYear_cve_len = values.shodan.this_year_cve.length;
  }

  if (
    values.shodan.previous_year_cve === "" ||
    values.shodan.previous_year_cve === undefined
  ) {
    previousYear_cve_len = 0;
  } else {
    previousYear_cve_len = values.shodan.previous_year_cve.length;
  }

  const shodanGraphData = {
    title: "CVE Lists",
    color: {
      backGround: "#383838a1",
      boxShadow: "rgb(80 80 80 / 52%) 0px 10px 20px 0px",
    },
    series: [
      {
        name: "CVE Lists",
        data: [
          {
            x: thisYear + "",
            y: thisYear_cve_len,
          },
          {
            x: previousYear + "",
            y: previousYear_cve_len,
          },
        ],
      },
    ],
  };
  return (
    <div className="parentContainer1">
      <Card
        title={GraphCardData.title}
        color={GraphCardData.color}
        series={GraphCardData.series}
        shodan_title={shodanGraphData}
        shodan_series={shodanGraphData.series}
        values={values}
      />
    </div>
  );
};

export default Cards;
