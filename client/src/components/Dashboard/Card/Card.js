import React from "react";
import "./Card.css";
import ReactApexChart from "react-apexcharts";
import CveChart from "../shodanWrap/Chart";
import TipGraph from "../tipWrap/tipGraph";

const Card = (props) => {
  return (
    <div className="MainWrap1">
      <DonutGraphCard param={props} />
      <CveChart param={props} />
      {/* <VulnTable values={props.values} /> */}
      <TipGraph param={props} />
    </div>
  );
};

function GraphCard({ param }) {
  const data = {
    options: {
      chart: {
        height: "auto",
        type: "bar",
        width: "100%",
        foreColor: "#EEEEEE",
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150,
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350,
          },
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: false,
          columnWidth: "52%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#8C46FF"],
      legend: {
        show: true,
        showForSingleSeries: true,
        customLegendItems: ["탐지 개수"],
        markers: {
          fillColors: ["#8C46FF"],
        },
      },
      grid: {
        show: false,
      },
      xaxis: {
        categories: ["virus total", "shodan", "hunter"],
        style: {
          labels: {
            show: true,
            fontSize: "15px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 400,
          },
        },
      },
      yaxis: {
        labels: {
          show: true,
          align: "right",
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: [],
            fontSize: "14px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 400,
            cssClass: "apexcharts-yaxis-label",
          },
          offsetX: 0,
          offsetY: 0,
          rotate: 0,
        },
      },
    },
  };

  return (
    <div
      className="GraphCard"
      style={{
        background: param.color.backGround,
      }}
    >
      <span>{param.title}</span>
      <div className="graphContainer">
        <ReactApexChart
          options={data.options}
          series={param.series}
          type="bar"
        />
      </div>
    </div>
  );
}

function DonutGraphCard({ param }) {
  let shodan_data = 0;
  let tipData =
    param.values.tip_result.malware.warningDetails.length +
    param.values.tip_result.vulnerability.length;

  let riskScore = Number(param.values.netcraft.risk_rating);
  if (param.values.shodan.this_year_cve) {
    shodan_data += param.values.shodan.this_year_cve.length;
  }
  if (param.values.shodan.previous_year_cve) {
    shodan_data += param.values.shodan.previous_year_cve.length;
  }
  shodan_data += param.values.shodan.vuln_ftp;
  shodan_data += param.values.shodan.vuln_dir_listings;
  shodan_data += param.values.shodan.vuln_root_telnet;

  const options = {
    series: [
      param.values.virustotal.total_detected_virus,
      shodan_data,
      param.values.hunter.total_leaked_emails,
      riskScore,
      tipData,
    ],
    options: {
      chart: {
        width: 380,
        type: "pie",
        foreColor: "#EEEEEE",
      },
      labels: ["Virus Total", "Shodan", "Hunter", "Netcraft", "TIP"],
      legend: {
        show: true,
        offsetX: 0,
        offsetY: 0,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
      tooltip: {
        y: {
          formatter: function (value) {
            return value + "개";
          },
        },
      },
    },
  };
  return (
    <div
      className="GraphCard"
      style={{
        background: param.color.backGround,
      }}
    >
      <span>검색엔진별 취약점 비율</span>
      <div className="graphContainer">
        <ReactApexChart
          options={options.options}
          series={options.series}
          type="pie"
        />
      </div>
    </div>
  );
}
export default Card;
