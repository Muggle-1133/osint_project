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
import "../virusWrap/Table.css";
import logo from "../images/hunter-logo.png";

function createData(name, value) {
  return { name, value };
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

const Modal = ({ setShowModal }) => {
  return (
    <ModalContainer>
      <Background>
        <ModalBox
          left="85%"
          top="74%"
          height="16%"
          width="calc(100% - 192px - 60%)"
        >
          <UilTimes onClick={() => setShowModal(false)} />
          <div className="shodanModalContent">
            <ul>
              <li key="findEmailLists">
                <i className="fa-solid fa-circle-exclamation"></i>
                발견된 이메일 개수는 해당 도메인 계정 이메일을 검색 날짜를
                기준으로 웹의 공개 소스로 부터 찾아 반환됩니다.
              </li>
              <li key="showEmailLists">
                <i className="fa-solid fa-circle-exclamation"></i>
                발견된 이메일 개수 중 최대 10개까지 이메일 목록을 보여줍니다.
              </li>
            </ul>
          </div>
        </ModalBox>
      </Background>
    </ModalContainer>
  );
};

const HunterTable = ({ values }) => {
  let emailRows = [];
  let listNum = "";
  let total_leaked_emails = values.hunter.total_leaked_emails;
  let countEmail = 0;
  if (total_leaked_emails > 10) {
    countEmail = 10;
  } else {
    countEmail = total_leaked_emails;
  }

  for (let i = 0; i < countEmail; i++) {
    listNum = i + 1 + "";
    emailRows.push(createData(listNum, values.hunter.email_lists[i]));
  }
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);
  const renderingTable = () => {
    const result = [];
    for (let i = 0; i < 5 - emailRows.length; i++) {
      result.push(
        <TableRow
          style={{ border: "none", padding: "0px" }}
          key={"HunterRender" + i}
        >
          <TableCell colSpan={2} style={{ border: "none" }}>
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: "0.35",
                color: "#C9C9C9",
                textTransform: "uppercase",
              }}
            >
              No data
              <img
                src={logo}
                style={{
                  width: "22px",
                  margin: "0 15px",
                }}
                alt=""
              />
            </div>
          </TableCell>
        </TableRow>
      );
    }
    return result;
  };
  return (
    <div className="hunterTable">
      {showModal ? <Modal setShowModal={setShowModal} /> : <></>}
      <TableContainer
        style={{
          background: "rgba(56, 56, 56, 0.63)",
          borderRadius: "0.4rem 0.4rem 0 0",
          width: "100%",
        }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow className={classes.tableHeade}>
              <TableCell
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#eee",
                  border: "none",
                  padding: "10px 15px",
                }}
                colSpan={2}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={logo}
                    style={{ width: "37px", marginRight: "10px" }}
                    alt=""
                  />
                  이메일 탐지 결과
                </div>
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
      <div className="tableCotentContainer">
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell
                  component="th"
                  scope="row"
                  style={{
                    color: "#F0F0F0",
                    fontSize: "15px",
                    fontFamily: "SpoqaHanSansNeo-Regular",
                    borderBottom: "1px solid rgb(64 64 64 / 45%)",
                    textAlign: "center",
                  }}
                >
                  발견된 이메일 개수
                </TableCell>
                <TableCell
                  style={{
                    color: "#F1323E",
                    borderBottom: "1px solid rgb(64 64 64 / 45%)",
                    fontFamily: "SpoqaHanSansNeo-Regular",
                    fontSize: "15px",
                    textAlign: "center",
                  }}
                >
                  <span
                    className="emailCount"
                    onClick={() => {
                      setShowModal(true);
                    }}
                  >
                    {total_leaked_emails}개
                  </span>
                </TableCell>
              </TableRow>
              {emailRows.map((row, index) => (
                <TableRow className={classes.row} key={row.name + "hunterKey"}>
                  {index === emailRows.length - 1 ? (
                    <>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          color: "#d1d1d1",
                          fontFamily: "SpoqaHanSansNeo-Regular",
                          fontSize: "15px",
                          fontWeight: "bold",
                          textAlign: "center",
                          borderBottom: "1px solid rgb(64 64 64 / 45%)",
                        }}
                      >
                        {row.name}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          textAlign: "center",
                          borderBottom: "1px solid rgb(64 64 64 / 45%)",
                        }}
                      >
                        <span className="showResults">{row.value}</span>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell
                        className={classes.row}
                        component="th"
                        scope="row"
                        style={{
                          color: "#d1d1d1",
                          fontFamily: "SpoqaHanSansNeo-Regular",
                          fontSize: "15px",
                          fontWeight: "bold",
                          textAlign: "center",
                          borderBottom: "1px solid rgb(64 64 64 / 45%)",
                        }}
                      >
                        {row.name}
                      </TableCell>
                      <TableCell
                        className={classes.row}
                        align="left"
                        style={{
                          borderBottom: "1px solid rgb(64 64 64 / 45%)",
                          textAlign: "center",
                        }}
                      >
                        <span className="showResults">{row.value}</span>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
              {5 - emailRows.length <= 0 ? <></> : <>{renderingTable()}</>}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default HunterTable;
