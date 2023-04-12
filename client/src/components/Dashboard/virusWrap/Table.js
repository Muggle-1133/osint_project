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
import { UilTimes } from "@iconscout/react-unicons";
import vtLogo from "../images/VirusTotal_logo.png";
import tipLogo from "../images/tip-logo.png";
function createData(name, value, detail, source) {
  return { name, value, detail, source };
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
});

const Modal = ({ row, setShowModal, source }) => {
  return (
    <ModalContainer>
      <Background>
        <ModalBox
          left="27.6%"
          top="55%"
          height="16%"
          width="calc(100% - 192px - 60%)"
        >
          <UilTimes onClick={() => setShowModal(false)} />
          <div className="shodanModalContent">
            <ul>
              {source === "tip" ? (
                <li>
                  <img src={tipLogo} alt="TIP_logo" style={{ width: "35px" }} />
                </li>
              ) : (
                <li>
                  <img
                    src={vtLogo}
                    alt="virustotal_logo"
                    style={{ width: "30px" }}
                  />
                </li>
              )}
              <li>
                <i className="fa-solid fa-circle-exclamation"></i>
                {row.detail}
              </li>
            </ul>
          </div>
        </ModalBox>
      </Background>
    </ModalContainer>
  );
};

const VirusTable = ({ values }) => {
  let warningDetails = [];
  if (values.tip_result.malware.warningDetails.length === 0) {
    warningDetails.push("No dangerous");
  } else {
    for (let i = 0; i < values.tip_result.malware.warningDetails.length; i++) {
      warningDetails.push(values.tip_result.malware.warningDetails[i]);
    }
  }

  const rows = [
    createData(
      "스캔된 Security Vendors의 수",
      values.virustotal.scan_vendor_cnt,
      "스캔된 Security Vendors는 해당 URL의 바이러스 유무를 검사하는 업체의 수를 나타내는 항목입니다.",
      "virustotal"
    ),
    createData(
      "탐지된 바이러스 개수",
      values.virustotal.total_detected_virus,
      "탐지된 바이러스 개수는 해당 URL에서 발견된 바이러스의 총 개수를 나타내는 항목입니다.",
      "virustotal"
    ),
    createData(
      "Malware 안전 점수",
      values.tip_result.malware.safeScore,
      "Malware 안전 점수는 다양한 보안 데이터 소스를 기반으로 측장한 안전 점수입니다. 0은 위험하고 100은 안전합니다.",
      "tip"
    ),
    createData(
      "세부 위험 항목",
      warningDetails[0],
      "위험하다고 판단된 도메인의 경우 Phishing, Malware , Spam, Bad reputation, Denial of service attack 5가지 항목 중의 탐지된 항목으로 분류됩니다.",
      "tip"
    ),
  ];
  const classes = useStyles();
  const [showDetails, setShowDetails] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showSource, setShowSource] = useState("");

  return (
    <div className="osintTable">
      {showModal ? (
        <Modal
          row={showDetails}
          setShowModal={setShowModal}
          source={showSource}
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
                  padding: "10px 15px",
                  border: "none",
                }}
                colSpan={2}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={vtLogo}
                    style={{ width: "37px", marginRight: "10px" }}
                    alt=""
                  />
                  <img
                    src={tipLogo}
                    style={{ width: "37px", marginRight: "14px" }}
                    alt=""
                  />
                  바이러스 & 멀웨어 검사 결과
                </div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.name} className={classes.row}>
                <TableCell
                  component="th"
                  scope="row"
                  style={{
                    width: "56%",
                    color: "#F0F0F0",
                    fontSize: "15px",
                    borderBottom: "1px solid rgb(64 64 64 / 45%)",
                  }}
                  className={classes.row}
                >
                  <div>{row.name}</div>
                </TableCell>
                <TableCell
                  className={classes.row}
                  align="center"
                  style={{
                    borderBottom: "1px solid rgb(64 64 64 / 45%)",
                    width: "175px",
                    maxWidth: "185px",
                    height: "54px",
                    maxHeight: "60px",
                    fontSize: "15px",
                  }}
                >
                  <span
                    className="valuesText"
                    onClick={() => {
                      setShowModal(true);
                      setShowDetails(rows[index]);
                      setShowSource(row.source);
                    }}
                  >
                    {row.value}
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
export default VirusTable;
