import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@mui/styles";
import "./Table.css";
import { Background, ModalBox, ModalContainer } from "../DashboardElements";
import { TipTableContainer } from "./tipTableElements";
import { UilTimes } from "@iconscout/react-unicons";
import logo from "../images/tip-logo.png";

function createData(code, name, value, detail, item) {
  return {
    id: code,
    vulnName: name,
    vulnValue: value,
    desc: detail,
    division: item,
  };
}
function createScoreData(value, detail, id, division) {
  return {
    value,
    detail,
    id,
    division,
  };
}
const useStyles = makeStyles({
  // hide last border
  row: {
    "&:last-child td, &:last-child th": {
      border: "none",
    },
  },
  tableHeade: {
    background: "rgba(56, 56, 56, 0.63)",
  },
  caption: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(56, 56, 56, 0.63)",
    width: "100%",
  },
});

const Modal = ({ row, setShowModal, uniqueKey, division }) => {
  return (
    <ModalContainer>
      <Background>
        <ModalBox
          left="85%"
          top="55%"
          height="16%"
          width="calc(100% - 192px - 60%)"
        >
          <UilTimes onClick={() => setShowModal(false)} />
          <div className="shodanModalContent">
            <div className="referDescInfo">
              <i className="fa-solid fa-circle-exclamation"></i>
              {division}
            </div>
            <ul className="modalUl">
              {row.map((item, index) => (
                <li key={uniqueKey + index}>{item}</li>
              ))}
            </ul>
          </div>
        </ModalBox>
      </Background>
    </ModalContainer>
  );
};

const TipTable = ({ values }) => {
  const rows = [];
  if (values.tip_result.vulnerability.length !== 0) {
    for (let i = 0; i < values.tip_result.vulnerability.length; i++) {
      let listNum = "취약점 항목";
      let warningDescription = [];
      listNum += i + 1;
      for (
        let j = 0;
        j < values.tip_result.vulnerability[i].warnings.length;
        j++
      ) {
        warningDescription.push(
          values.tip_result.vulnerability[i].warnings[j].warningDescription
        );
      }
      rows.push(
        createData(
          values.tip_result.vulnerability[i]["testCode"],
          listNum,
          values.tip_result.vulnerability[i]["test"],
          warningDescription,
          "취약점 설명"
        )
      );
    }
  }
  const scoreRow = createScoreData(
    values.tip_result.reputationScore,
    [
      "도메인 평가 점수는 TIP OSINT 검색엔진에서 제공하는 평가 점수로, 다양한 보안 데이터 소스를 기반으로 한 종합적인 안전 점수입니다. 0은 위험하고 100은 안전합니다.",
    ],
    "scoreUniqueKey",
    "도메인 평가 점수 설명"
  );
  const classes = useStyles();
  const [showDetails, setShowDetails] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [mapKey, setMapKey] = useState("");
  const [item, setItem] = useState("");
  const rendering = () => {
    const result = [];
    for (let i = 0; i < 4 - rows.length - 1; i++) {
      result.push(
        <TableRow
          style={{ border: "none", padding: "16px" }}
          key={"TipRender" + i}
        >
          <TableCell colSpan={2} style={{ border: "none" }}>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                opacity: "0.35",
                color: "#C9C9C9",
                textTransform: "uppercase",
                fontSize: "15px",
              }}
            >
              source by
              <img
                src={logo}
                style={{
                  width: "42px",
                  margin: "0 15px",
                  filter: "brightness(100%)",
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
    <TipTableContainer width="calc(33% - 7px)">
      {showModal ? (
        <Modal
          row={showDetails}
          setShowModal={setShowModal}
          uniqueKey={mapKey}
          division={item}
        />
      ) : (
        <></>
      )}
      <TableContainer
        style={{
          background: "rgba(56, 56, 56, 0.63)",
          borderRadius: "0.4rem",
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
                }}
                colSpan={2}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={logo}
                    style={{ width: "42px", marginRight: "15px" }}
                    alt=""
                  />
                  도메인 평가 결과
                </div>
              </TableCell>
            </TableRow>
          </TableHead>
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
                  width: "39%",
                }}
              >
                도메인 평가 점수
              </TableCell>
              <TableCell
                style={{
                  color: "#11d386",
                  borderBottom: "1px solid rgb(64 64 64 / 45%)",
                  fontFamily: "SpoqaHanSansNeo-Regular",
                  fontSize: "15px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                <span
                  className="domainScore"
                  onClick={() => {
                    setShowModal(true);
                    setShowDetails(scoreRow.detail);
                    setMapKey(scoreRow.id);
                    setItem(scoreRow.division);
                  }}
                >
                  {scoreRow.value}점
                </span>
              </TableCell>
            </TableRow>
            {rows.map((row, index) => (
              <TableRow className={classes.row} key={row.vulnName + index}>
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
                  {row.vulnName}
                </TableCell>
                <TableCell
                  className={classes.row}
                  align="left"
                  style={{
                    color: "#11D386",
                    borderBottom: "1px solid rgb(64 64 64 / 45%)",
                    textAlign: "center",
                    fontSize: "15px",
                  }}
                >
                  <span
                    className="showVuln"
                    onClick={() => {
                      setShowModal(true);
                      setShowDetails(row.desc);
                      setMapKey(row.id);
                      setItem(row.division);
                    }}
                  >
                    {row.vulnValue}
                  </span>
                </TableCell>
              </TableRow>
            ))}
            {4 - rows.length === 1 ? <></> : <>{rendering()}</>}
          </TableBody>
        </Table>
      </TableContainer>
    </TipTableContainer>
  );
};

export default TipTable;
