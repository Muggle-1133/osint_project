import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@mui/styles";
import "./Table.css";
import { TipTableContainer } from "./tipTableElements";
import { Background, ModalBox, ModalContainer } from "../DashboardElements";
import { UilTimes } from "@iconscout/react-unicons";
import logo from "../images/tip-logo.png";

function createData(name, value) {
  return { name, value };
}
const MyStyles = makeStyles({
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

const SSLTable = ({ values }) => {
  const classes = MyStyles();
  const rows = [];
  /*
  createData(
      "Heartbleed 취약점",
      values.tip_result.heartbleedVulnerability.status
    ),
    createData(
      "POODLE 공격 예방",
      values.tip_result.tlsFallbackScsvSupported.status
    ),
    createData(
      "인증서 발급 CA(인증 기관) 확인",
      values.tip_result.selfSignedCertificate.status
    ),
    createData(
      "OCSP 스테이플링 사용 설정 여부",
      values.tip_result.ocspStaplingEnabled.status
    ),
  */
  if (
    values.tip_result.heartbleedVulnerability.status !== undefined &&
    values.tip_result.heartbleedVulnerability.status !== ""
  ) {
    createData(
      "Heartbleed 취약점",
      values.tip_result.heartbleedVulnerability.status
    );
    createData(
      "POODLE 공격 예방",
      values.tip_result.tlsFallbackScsvSupported.status
    );
    createData(
      "인증서 발급 CA(인증 기관) 확인",
      values.tip_result.selfSignedCertificate.status
    );
    createData(
      "OCSP 스테이플링 사용 설정 여부",
      values.tip_result.ocspStaplingEnabled.status
    );
  }
  const rendering = () => {
    const result = [];
    for (let i = 0; i < 4; i++) {
      result.push(
        <TableRow style={{ border: "none", padding: "16px" }}>
          <TableCell colSpan={2} style={{ border: "none" }}>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                opacity: "0.35",
                color: "#C9C9C9",
                textTransform: "uppercase",
              }}
            >
              no data
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
    <TipTableContainer
      style={{ width: "calc(33% - 7px)", height: "100%", flexShrink: "0" }}
    >
      <TableContainer
        style={{
          background: "rgba(56, 56, 56, 0.63)",
          borderRadius: "0.4rem",
        }}
      >
        <Table aria-label="simple table">
          <TableHead style={{ padding: "8px" }}>
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
                    style={{ width: "37px", marginRight: "10px" }}
                    alt=""
                  />
                  SSL 인증서 분석
                </div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name} className={classes.row}>
                <TableCell
                  component="th"
                  scope="row"
                  style={{
                    width: "65%",
                    color: "#F0F0F0",
                    fontWeight: "bold",
                    borderBottom: "1px solid rgb(64 64 64 / 45%)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {row.name}
                </TableCell>
                <TableCell
                  align="left"
                  style={{
                    borderBottom: "1px solid rgb(64 64 64 / 45%)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span className="TableValues">{row.value}</span>
                </TableCell>
              </TableRow>
            ))}
            {rows.length === 0 ? <></> : <>{rendering()}</>}
          </TableBody>
        </Table>
      </TableContainer>
    </TipTableContainer>
  );
};

export default SSLTable;
