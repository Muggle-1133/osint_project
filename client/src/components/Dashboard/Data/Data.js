// Sidebar imports
import { UilEstate, UilClipboard } from "@iconscout/react-unicons";

export const SidebarData = [
  {
    icon: UilEstate,
    heading: "대시보드",
  },
  {
    icon: UilClipboard,
    heading: "검색 기록",
  },
];

// Graph Card
export const GraphCardData = [
  {
    title: "탐지 개수(number of detections)",
    color: {
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "0px 10px 20px 0px rgb(224 198 245 / 52%)",
    },
    series: [
      {
        name: "탐지 개수(number of detections)",
        data: [
          {
            x: "virus total",
            y: 12,
          },
          {
            x: "hunter",
            y: 44,
          },
          {
            x: "shodan",
            y: 54,
          },
        ],
      },
    ],
  },
];
