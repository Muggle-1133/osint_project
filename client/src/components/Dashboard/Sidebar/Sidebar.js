import React, { useEffect, useState, useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import Logo from "../images/user.png";
import { SidebarData } from "../Data/Data";
import { UilExport } from "@iconscout/react-unicons";
import {
  DropdownBox,
  DropdownList,
  DropdownMenu,
  Item,
} from "./DropdwnElements";
import "./Sidebar.css";

const Sidebar = ({ selected, setSelected, values }) => {
  const [isActive, setIsActive] = useState(false);
  const [showDropdown, setShowDropdown] = useState("none");
  const [isToggle, setIsToggle] = useState(false);
  const exportRef = useRef();
  const handleClickOutside = (e) => {
    if (exportRef && !exportRef.current.contains(e.target)) {
      setIsToggle(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    if (isToggle) {
      setShowDropdown("block");
    } else {
      setShowDropdown("none");
    }

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isToggle]);

  const username = sessionStorage.getItem("user_name");
  // 이미지로 내보내기
  const exportImage = () => {
    let date = new Date();
    const downfileName = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}-${values}-dashboard.png`;

    html2canvas(document.querySelector(".MainContainer"), {
      backgroundColor: "#5e5e5e3b",
    }).then((canvas) => {
      onSaveAs(canvas.toDataURL("image/png"), downfileName);
    });

    const onSaveAs = (uri, filename) => {
      let link = document.createElement("a");
      document.body.appendChild(link);
      link.href = uri;
      link.download = filename;
      link.click();
      document.body.removeChild(link);
    };
  };
  // pdf로 내보내기
  const exportPdf = () => {
    let date = new Date();
    let currentDate = `${date.getFullYear()}/${
      date.getMonth() + 1
    }/${date.getDate()} `;
    const downfileName = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}-${values}-dashboard.pdf`;

    let textTitle = values + " Dashboard result";
    let textEnd = "source by TRI accessed " + currentDate;
    html2canvas(document.querySelector(".MainContainer"), {
      backgroundColor: "#171616",
    }).then(function (canvas) {
      // 캔버스를 이미지로 변환
      let imgData = canvas.toDataURL("image/png");

      let imgWidth = 190; // 이미지 가로 길이(mm) / A4 기준 210mm
      let pageHeight = 295; // 출력 페이지 세로 길이 계산 A4 기준
      let imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let margin = 10; // 출력 페이지 여백설정
      let doc = new jsPDF("p", "mm", "a4");
      let position = 37;
      doc.line(15, 10, 195, 10); // 선그리기(시작x, 시작y, 종료x, 종료y)
      doc.text(textTitle, 60, 20);
      doc.text(textEnd, 107, 240);
      // 첫 페이지 출력
      doc.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // 한 페이지 이상일 경우 루프 돌면서 출력
      while (heightLeft >= 20) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      // 파일 저장
      doc.save(downfileName);
    });
  };

  return (
    <div className="SidebarContainer">
      <div className="Sidebar">
        {/* logo */}
        <div className="logo">
          <img src={Logo} alt="" />
        </div>
        <span className="usernameSpan">{username}</span>

        {/* menu */}
        <div className="menu">
          {SidebarData.map((item, index) => {
            return (
              <div
                className={
                  selected === index ? "menuItem itemActive" : "menuItem"
                }
                key={index}
                onClick={() => setSelected(index)}
              >
                <item.icon />
                <span>{item.heading}</span>
              </div>
            );
          })}
          <DropdownList ref={exportRef} onClick={() => setIsToggle(!isToggle)}>
            <UilExport />
            export
            <DropdownBox display={showDropdown}>
              <DropdownMenu>
                <Item
                  className="listItemBox"
                  onClick={() => {
                    exportImage();
                  }}
                >
                  <i className="fa-solid fa-image"></i>
                  PNG
                </Item>
                <Item
                  style={{ border: "none" }}
                  className="listItemBox"
                  onClick={() => {
                    exportPdf();
                  }}
                >
                  <i className="fa-solid fa-file-pdf"></i>
                  PDF
                </Item>
              </DropdownMenu>
            </DropdownBox>
          </DropdownList>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
