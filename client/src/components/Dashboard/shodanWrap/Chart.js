import React from "react";
import ReactApexChart from "react-apexcharts";
import "./Chart.css";

const CveChart = ({ param }) => {
  const now = new Date();
  const thisYear = now.getFullYear();
  const previousYear = now.getFullYear() - 1;
  let thisLow = 0;
  let thisMedium = 0;
  let thisHigh = 0;
  let thisCritical = 0;
  let previousLow = 0;
  let previousMedium = 0;
  let previousHigh = 0;
  let preCritical = 0;

  if (param.values.shodan.this_year_cvss.length !== 0) {
    for (let i = 0; i < param.values.shodan.this_year_cvss.length; i++) {
      if (
        param.values.shodan.this_year_cvss[i] >= 0.1 &&
        param.values.shodan.this_year_cvss <= 3.9
      ) {
        thisLow += 1;
      } else if (
        param.values.shodan.this_year_cvss[i] >= 4.0 &&
        param.values.shodan.this_year_cvss[i] <= 6.9
      ) {
        thisMedium += 1;
      } else if (
        param.values.shodan.this_year_cvss[i] >= 7.0 &&
        param.values.shodan.this_year_cvss[i] <= 8.9
      ) {
        thisHigh += 1;
      } else if (
        param.values.shodan.this_year_cvss[i] >= 9.0 &&
        param.values.shodan.this_year_cvss[i] <= 10.0
      ) {
        thisCritical += 1;
      }
    }
  }

  if (param.values.shodan.previous_year_cvss.length !== 0) {
    for (let i = 0; i < param.values.shodan.previous_year_cvss.length; i++) {
      if (
        param.values.shodan.previous_year_cvss[i] >= 0.1 &&
        param.values.shodan.previous_year_cvss[i] <= 3.9
      ) {
        previousLow += 1;
      } else if (
        param.values.shodan.previous_year_cvss[i] >= 4.0 &&
        param.values.shodan.previous_year_cvss[i] <= 6.9
      ) {
        previousMedium += 1;
      } else if (
        param.values.shodan.previous_year_cvss[i] >= 7.0 &&
        param.values.shodan.previous_year_cvss[i] <= 8.9
      ) {
        previousHigh += 1;
      } else if (
        param.values.shodan.previous_year_cvss[i] >= 9.0 &&
        param.values.shodan.previous_year_cvss[i] <= 10.0
      ) {
        preCritical += 1;
      }
    }
  }
  const cveListData = {
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
          columnWidth: "48%",
        },
      },
      dataLabels: {
        enabled: true,
      },
      colors: ["#FA3F36"],
      legend: {
        show: true,
        showForSingleSeries: true,
        customLegendItems: ["CVE Lists"],
        markers: {
          fillColors: ["#FA3F36"],
        },
      },
      grid: {
        show: false,
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
  const cveTotalData = {
    options: {
      series: [
        {
          name: "저위험도",
          data: [thisLow, previousLow],
        },
        {
          name: "중위험도",
          data: [thisMedium, previousMedium],
        },
        {
          name: "고위험도",
          data: [thisHigh, previousHigh],
        },
        {
          name: "심각",
          data: [thisCritical, preCritical],
        },
      ],
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        foreColor: "#EEEEEE",
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            enabled: false,
          },
          columnWidth: "70%",
          barHeight: "56%",
        },
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
      },
      xaxis: {
        categories: [thisYear + "년", previousYear + "년"],
      },
      yaxis: {
        labels: {
          show: true,
          align: "right",
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: [],
            fontSize: "15px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 400,
            cssClass: "apexcharts-yaxis-label",
          },
          offsetX: 0,
          offsetY: 0,
          rotate: 0,
        },
      },
      fill: {
        opacity: 1,
      },
      colors: ["#FDDF03", "#FE8A15", "#FD4303", "#E70303"],
      legend: {
        position: "bottom",
        horizontalAlign: "center",
        markers: {
          fillColors: ["#FDDF03", "#FE8A15", "#FD4303", "#E70303"],
        },
      },
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
      className="shodanGraph"
      style={{
        background: param.color.backGround,
      }}
    >
      <span>
        {param.values.shodan.this_year_cvss.length !== 0 ||
        param.values.shodan.previous_year_cvss.length !== 0
          ? "탐지된 CVE-CODE 위험도 분류"
          : param.shodan_title.title}
      </span>
      <div className="shodanGraphContainer">
        {param.values.shodan.this_year_cvss.length !== 0 ||
        param.values.shodan.previous_year_cvss.length !== 0 ? (
          <ReactApexChart
            options={cveTotalData.options}
            series={cveTotalData.options.series}
            type="bar"
          />
        ) : (
          <ReactApexChart
            options={cveListData.options}
            series={param.shodan_series}
            type="bar"
          />
        )}
      </div>
    </div>
  );
};

export default CveChart;
