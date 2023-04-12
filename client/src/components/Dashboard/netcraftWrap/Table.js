import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
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
  coupleTableContainer: {
    height: "325px",
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

const CipherTable = ({ values }) => {
  const rows = [];
  if (
    values.netcraft.validity_period !== undefined &&
    values.netcraft.validity_period !== ""
  ) {
    rows.push(createData("유효기간", values.netcraft.validity_period));
    rows.push(
      createData("공개키 알고리즘", values.netcraft.public_key_algorithm)
    );
    rows.push(createData("프로토콜 버전", values.netcraft.protocol_version));
    rows.push(createData("서명 알고리즘", values.netcraft.signature_algorithm));
  }
  const rightRows = [];
  if (
    values.netcraft.validity_period !== undefined &&
    values.netcraft.validity_period !== ""
  ) {
    rightRows.push(createData("HTTP 서버", values.netcraft.Server));
    rightRows.push(
      createData("완전 순방향 비밀성", values.netcraft.perfect_forward_secrecy)
    );
    rightRows.push(
      createData("OCSP stapling 지원", values.netcraft.OCSP_stapling_response)
    );
  }
  const leftRendering = () => {
    const result = [];
    for (let i = 0; i < 4; i++) {
      result.push(
        <TableRow
          style={{ border: "none", padding: "16px" }}
          key={"leftRender" + i}
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
                  width: "20px",
                  height: "21.5px",
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

  const rightRendering = () => {
    const result = [];
    for (let i = 0; i < 4 - rightRows.length; i++) {
      result.push(
        <TableRow
          style={{ border: "none", padding: "16px" }}
          key={"rightRender" + i}
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
                  width: "20px",
                  height: "21.5px",
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
  const classes = useStyles();
  return (
    <div className="cipherTable">
      <TableContainer
        style={{
          background: "rgba(56, 56, 56, 0.63)",
          borderRadius: "0.4rem",
        }}
      >
        <Table aria-label="simple table" style={{ width: "100%" }}>
          <caption
            className={classes.caption}
            style={{
              fontSize: "18px",
              color: "#eee",
              fontWeight: "bold",
              padding: "10px 15px",
              fontFamily: "SpoqaHanSansNeo-Regular",
            }}
          >
            <img
              src={logo}
              style={{ width: "37px", marginRight: "10px" }}
              alt=""
            />
            SSL/TLS 정보
          </caption>
          <Table>
            <Table style={{ float: "left", width: "50%" }}>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={row.name + index} className={classes.row}>
                    <TableCell
                      className={classes.row}
                      scope="row"
                      style={{
                        color: "#f0f0f0",
                        fontFamily: "SpoqaHanSansNeo-Regular",
                        fontSize: "15px",
                        fontWeight: "bold",
                        textAlign: "center",
                        borderBottom: "1px solid rgb(64 64 64 / 45%)",
                        width: "30%",
                      }}
                    >
                      {row.name}
                    </TableCell>
                    <TableCell
                      className={classes.row}
                      scope="row"
                      style={{
                        color: "#11D386",
                        fontFamily: "SpoqaHanSansNeo-Regular",
                        fontSize: "15px",
                        textAlign: "center",
                        borderBottom: "1px solid rgb(64 64 64 / 45%)",
                      }}
                    >
                      {row.value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              {4 - rows.length === 0 ? <></> : <>{leftRendering()}</>}
            </Table>
            <Table style={{ float: "right", width: "50%" }}>
              <TableBody style={{ width: "100%" }}>
                {rightRows.map((row, index) => (
                  <TableRow key={row.name + index} className={classes.row}>
                    <TableCell
                      className={classes.row}
                      scope="row"
                      style={{
                        color: "#f0f0f0",
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
                      scope="row"
                      style={{
                        color: "#11D386",
                        fontFamily: "SpoqaHanSansNeo-Regular",
                        fontSize: "15px",
                        textAlign: "center",
                        borderBottom: "1px solid rgb(64 64 64 / 45%)",
                      }}
                    >
                      {row.value}
                    </TableCell>
                  </TableRow>
                ))}
                {4 - rightRows.length === 0 ? <></> : <>{rightRendering()}</>}
              </TableBody>
            </Table>
          </Table>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CipherTable;
