import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@mui/styles";
import "./Table.css";
import logo from "../images/netcraft_logo.png";

function createData(name, value) {
  return { name, value };
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
  },
});

const InfoTable = ({ values }) => {
  const infoRow = [
    createData("사이트", values.netcraft.site),
    createData("사이트 타이틀", values.netcraft.site_title),
  ];

  if (
    values.netcraft.server_side_tech.technology_name[0] !== undefined &&
    values.netcraft.server_side_tech.technology_name.length !== 0 &&
    values.netcraft.server_side_tech.technology_name.length > 1
  ) {
    let server_side_tech =
      values.netcraft.server_side_tech.technology_name[0] + "...";
    infoRow.push(createData("서버사이드 스크립트", server_side_tech));
  } else if (
    values.netcraft.server_side_tech.technology_name[0] !== undefined &&
    values.netcraft.server_side_tech.technology_name.length !== 0 &&
    values.netcraft.server_side_tech.technology_name.length === 1
  ) {
    let server_side_tech = values.netcraft.server_side_tech.technology_name[0];
    infoRow.push(createData("서버사이드 스크립트", server_side_tech));
  }
  if (
    values.netcraft.client_side_tech.technology_name[0] !== undefined &&
    values.netcraft.client_side_tech.technology_name.length !== 0 &&
    values.netcraft.client_side_tech.technology_name.length > 1
  ) {
    let client_side_tech =
      values.netcraft.client_side_tech.technology_name[0] + "...";
    infoRow.push(createData("클라이언트사이드 스크립트", client_side_tech));
  } else if (
    values.netcraft.client_side_tech.technology_name[0] !== undefined &&
    values.netcraft.client_side_tech.technology_name.length !== 0 &&
    values.netcraft.client_side_tech.technology_name.length === 1
  ) {
    let client_side_tech = values.netcraft.client_side_tech.technology_name[0];
    infoRow.push(createData("클라이언트사이드 스크립트", client_side_tech));
  }
  infoRow.push(createData("위험 등급", values.netcraft.risk_rating));
  const classes = useStyles();

  const rendering = () => {
    const result = [];
    for (let i = 0; i < 5 - infoRow.length; i++) {
      result.push(
        <TableRow
          style={{ border: "none", padding: "16px" }}
          key={"NetcraftRender" + i}
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
              no data
              <img
                src={logo}
                style={{
                  width: "22px",
                  height: "22px",
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
    <div className="osintTable">
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
                    src={logo}
                    style={{ width: "37px", marginRight: "10px" }}
                    alt=""
                  />
                  웹 사이트 정보
                </div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {infoRow.map((row) => (
              <TableRow key={row.name} className={classes.row}>
                <TableCell
                  component="th"
                  scope="row"
                  style={{
                    width: "50%",
                    color: "#F0F0F0",
                    fontWeight: "bold",
                    borderBottom: "1px solid rgb(64 64 64 / 45%)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    fontSize: "15px",
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
                    fontSize: "15px",
                  }}
                >
                  <span className="TableValues">{row.value}</span>
                </TableCell>
              </TableRow>
            ))}
            {5 - infoRow.length === 0 ? <></> : <>{rendering()}</>}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default InfoTable;
