import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@mui/styles";
import { Background, ModalBox, ModalContainer } from "../DashboardElements";
import { UilTimes } from "@iconscout/react-unicons";
import "./Table.css";
import logo from "../images/Shodan_logo.png";

function createData(name, value, detail) {
  return { name, value, detail };
}

const useStyles = makeStyles({
  // hide last border
  row: {
    "&:last-child td, &:last-child th": {
      borderBottom: "none",
    },
  },
  tableHeade: {
    background: "rgba(56, 56, 56, 0.63)",
  },
});

const makeStyle = (value) => {
  if (typeof value === "object" && value.length === 1) {
    return {
      color: "red",
    };
  } else if (typeof value === "object" && value.length === 0) {
    return {
      color: "#A6A8A9",
    };
  } else {
    if (value === 1) {
      return {
        color: "red",
      };
    } else {
      return {
        color: "#A6A8A9",
      };
    }
  }
};

const Modal = ({ row, setShowModal }) => {
  return (
    <ModalContainer>
      <Background>
        <ModalBox
          left="56.5%"
          top="55%"
          height="16%"
          width="calc(100% - 192px - 60%)"
        >
          <UilTimes onClick={() => setShowModal(false)} />
          <div className="shodanModalContent">
            <ul>
              <li>
                <i className="fa-solid fa-circle-exclamation"></i>
                {row.detail}
              </li>
              <li>
                - 탐지결과가 <b style={{ color: "#3182c5" }}>None</b>일 경우
                해당 취약점이 탐지되지 않았음을 의미합니다.
              </li>
              <li>
                - 탐지결과가 <b style={{ color: "#ed2a2a" }}>Detect</b>일 경우
                해당 취약점이 탐지되었음을 의미합니다.
              </li>
            </ul>
          </div>
        </ModalBox>
      </Background>
    </ModalContainer>
  );
};

const VulnTable = ({ values }) => {
  let rows = [
    createData(
      "Log4j CVE 코드 탐지",
      values.shodan.cve_log4j,
      "Log4j CVE 코드 탐지는 해당 주소에서 발견된 CVE-CODE 중 Log4j와 관련된 CVE-CODE가 있는지 확인하는 항목입니다."
    ),
    createData(
      "익명 FTP 접속 허용 여부",
      values.shodan.vuln_ftp,
      "익명 FTP 접속 허용 여부는 FTP 접속 시 익명 계정(Anonymous user)으로 접속하는 것을 허용하였는지 확인하는 항목입니다."
    ),
    createData(
      "Apache 디렉터리 리스팅",
      values.shodan.vuln_dirListings,
      "Apache 디렉터리 리스팅은 아파치 서버에서 디렉터리 검색 기능의 활성화 여부를 확인하는 항목입니다."
    ),
    createData(
      "Telnet 접속 시 root 계정 접속 ",
      values.shodan.vuln_rootTelnet,
      "Telnet 접속 시 root 계정 접속은 Telnet 접속시 root계정으로 접속했던 적이 있는지 확인하는 항목입니다."
    ),
  ];

  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState("");

  return (
    <div className="osintTable">
      {showModal ? (
        <Modal row={showDetails} setShowModal={setShowModal} />
      ) : (
        <></>
      )}
      <TableContainer
        style={{
          background: "rgba(56, 56, 56, 0.63)",
          borderRadius: "0.4rem",
        }}
      >
        <Table aria-label="simple data">
          <TableHead>
            <TableRow className={classes.tableHeade}>
              <TableCell
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#eee",
                  padding: "10px 15px",
                  border: "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={logo}
                    style={{ width: "37px", marginRight: "10px" }}
                    alt=""
                  />
                  취약점 스캔 항목
                </div>
              </TableCell>
              <TableCell
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#eee",
                  border: "none",
                  textAlign: "center",
                }}
              >
                <div>탐지 결과</div>
              </TableCell>
              <TableCell
                style={{ border: "none", borderRadius: "0 0.4rem 0 0" }}
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.name} className={classes.row}>
                <TableCell
                  className={classes.row}
                  component="th"
                  scope="row"
                  style={{
                    fontSize: "14px",
                    color: "#f0f0f0",
                    borderBottom: "1px solid rgb(64 64 64 / 45%)",
                  }}
                >
                  <div>{row.name}</div>
                </TableCell>
                <TableCell
                  style={{
                    borderBottom: "1px solid rgb(64 64 64 / 45%)",
                    textAlign: "center",
                    fontSize: "14px",
                  }}
                >
                  <span style={makeStyle(row.value)} className="status">
                    {row.value === 1 ? "Detected" : "None"}
                  </span>
                </TableCell>
                <TableCell
                  className="Details"
                  style={{
                    borderBottom: "1px solid rgb(64 64 64 / 45%)",
                    textAlign: "center",
                  }}
                >
                  <span
                    className="detailBtn"
                    onClick={() => {
                      setShowModal(true);
                      setShowDetails(rows[index]);
                    }}
                  >
                    Details
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default VulnTable;
