import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@mui/styles";
import "../netcraftWrap/Table.css";
import logo from "../images/Shodan_logo.png";

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
  tableBodyContainer: {
    width: "100%",
    height: "55px",
    overflow: "overlay",
    "&::-webkit-scrollbar": {
      width: "10px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "hsla(0, 0%, 42%, 0.29)",
      borderRadius: "100px",
    },
  },
});

const ShodanInfoTable = ({ values }) => {
  let port_number = "";
  for (let i = 0; i < values.shodan.port.length; i++) {
    if (i === values.shodan.port.length - 1) {
      port_number += values.shodan.port[i];
    } else {
      port_number += values.shodan.port[i] + ", ";
    }
  }
  const infoRow = [
    createData("도시 이름", values.shodan.city),
    createData("국가 이름", values.shodan.country_name),
    createData("위도", values.shodan.location.latitude),
    createData("경도", values.shodan.location.longitude),
    createData("열린 포트 번호", port_number),
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
                <span style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={logo}
                    style={{
                      width: "37px",
                      height: "37px",
                      marginRight: "10px",
                    }}
                    alt=""
                  />
                  위치 및 열린 포트 정보
                </span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {infoRow.map((row, index) => (
              <TableRow key={row.name} className={classes.row}>
                <TableCell
                  component="th"
                  scope="row"
                  style={{
                    color: "#F0F0F0",
                    fontWeight: "bold",
                    fontSize: "15px",
                    borderBottom: "1px solid rgb(64 64 64 / 45%)",
                    width: "40%",
                  }}
                >
                  {row.name}
                </TableCell>
                <TableCell
                  align="left"
                  style={{
                    borderBottom: "1px solid rgb(64 64 64 / 45%)",
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

export default ShodanInfoTable;
