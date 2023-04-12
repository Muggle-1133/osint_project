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
});

const NetworkTable = ({ values }) => {
  const networkRow = [
    createData("IPv4 주소", values.netcraft.ip_addr),
    createData("도메인", values.netcraft.domain),
    createData("네임서버", values.netcraft.nameserver),
    createData("도메인 등록기관", values.netcraft.domain_registrar),
    createData("DNS 관리자 이메일", values.netcraft.dns_admin),
  ];
  const classes = useStyles();
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
                  네트워크 정보
                </div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {networkRow.map((row) => (
              <TableRow key={row.name} className={classes.row}>
                <TableCell
                  component="th"
                  scope="row"
                  style={{
                    width: "40%",
                    color: "#F0F0F0",
                    fontWeight: "bold",
                    borderBottom: "1px solid rgb(64 64 64 / 45%)",
                    fontSize: "15px",
                  }}
                >
                  {row.name}
                </TableCell>
                <TableCell
                  align="left"
                  style={{
                    borderBottom: "1px solid rgb(64 64 64 / 45%)",
                    height: "100%",
                    fontSize: "15px",
                  }}
                >
                  <span className="TableValues">{row.value}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default NetworkTable;
