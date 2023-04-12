import React from "react";
import ReactApexChart from "react-apexcharts";
import "./tipGraph.css";

const TipGraph = ({ param }) => {
  const data = {
    options: {
      chart: {
        height: 280,
        type: "radialBar",
      },

      series: [param.values.tip_result.reputationScore],
      colors: ["#20E647"],
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            size: "65%",
            background: "#293450",
          },
          track: {
            dropShadow: {
              enabled: true,
              top: 2,
              left: 0,
              blur: 4,
              opacity: 0.15,
            },
          },
          dataLabels: {
            name: {
              offsetY: -10,
              color: "#fff",
              fontSize: "18px",
            },
            value: {
              color: "#fff",
              fontSize: "30px",
              show: true,
              formatter: function (val) {
                return val;
              },
            },
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "vertical",
          gradientToColors: ["#4CBFFD"],
          stops: [0, 100],
        },
      },
      stroke: {
        lineCap: "butt",
      },
      labels: ["reputation score"],
      tooltip: {
        enabled: true,
        enabledOnSeries: undefined,
        shared: true,
        followCursor: false,
        intersect: false,
        inverseOrder: false,
        custom: undefined,
        fillSeriesColor: false,
        theme: false,
        style: {
          fontSize: "12px",
          fontFamily: undefined,
        },
        onDatasetHover: {
          highlightDataSeries: false,
        },
        y: {
          formatter: function (value) {
            return value + "점";
          },
        },
      },
    },
  };

  return (
    <div
      className="tipGraph"
      style={{
        backGround: "#383838a1",
      }}
    >
      <div className="tipGraphContainer">
        <div className="tipSpanContainer">
          <span>도메인 평가 점수</span>
        </div>
        <ReactApexChart
          options={data.options}
          series={data.options.series}
          type="radialBar"
        />
      </div>
    </div>
  );
};

export default TipGraph;
