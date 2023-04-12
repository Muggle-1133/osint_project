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
import logo from "../images/Shodan_logo.png";

function createData(id, cvss, refer) {
  return { cve: id, cvss_score: cvss, references: refer };
}

const myStyles = makeStyles({
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

const Modal = ({ row, setShowModal, uniqueKey }) => {
  return (
    <ModalContainer>
      <Background>
        <ModalBox
          left="42%"
          top="74%"
          height="18%"
          width="calc(100% - 190px - 33%)"
        >
          <UilTimes onClick={() => setShowModal(false)} />
          <div className="cveTableModalContent">
            <div className="referInfo">
              <i className="fa-solid fa-circle-exclamation"></i>
              해당 CVE-CODE의 참조 문서 링크입니다.
            </div>
            <ul className="modalUl">
              {row.map((item, index) => (
                <li key={uniqueKey + index}>
                  <a href={item} target="_blank" rel="noopener noreferrer">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </ModalBox>
      </Background>
    </ModalContainer>
  );
};

const CveTable = ({ values }) => {
  const thisYearRows = [];
  const preYearRows = [];
  const classes = myStyles();
  const [showDetails, setShowDetails] = useState([]);
  const [mapKey, setMapKey] = useState("");
  const [showModal, setShowModal] = useState(false);
  if (
    values.shodan.this_year_cve.length !== 0 &&
    values.shodan.this_year_cvss.length !== 0
  ) {
    for (let i = 0; i < values.shodan.this_year_cve.length; i++) {
      thisYearRows.push(
        createData(
          values.shodan.this_year_cve[i],
          values.shodan.this_year_cvss[i],
          values.shodan.this_year_cve_refer[values.shodan.this_year_cve[i]]
        )
      );
    }
  } else if (
    values.shodan.this_year_cve.length !== 0 &&
    values.shodan.this_year_cvss.length === 0
  ) {
    for (let i = 0; i < values.shodan.this_year_cve.length; i++) {
      thisYearRows.push(
        createData(
          values.shodan.this_year_cve[i],
          "None",
          values.shodan.this_year_cve_refer[values.shodan.this_year_cve[i]]
        )
      );
    }
  }
  if (
    values.shodan.previous_year_cve.length !== 0 &&
    values.shodan.previous_year_cvss.length !== 0
  ) {
    for (let i = 0; i < values.shodan.previous_year_cve.length; i++) {
      preYearRows.push(
        createData(
          values.shodan.previous_year_cve[i],
          values.shodan.previous_year_cvss[i],
          values.shodan.previous_year_cve_refer[
            values.shodan.previous_year_cve[i]
          ]
        )
      );
    }
  } else if (
    values.shodan.previous_year_cve.length !== 0 &&
    values.shodan.previous_year_cvss.length === 0
  ) {
    for (let i = 0; i < values.shodan.previous_year_cve.length; i++) {
      preYearRows.push(
        createData(
          values.shodan.previous_year_cve[i],
          "None",
          values.shodan.previous_year_cve_refer[
            values.shodan.previous_year_cve[i]
          ]
        )
      );
    }
  }
  const leftRendering = () => {
    const result = [];
    for (let i = 0; i < 5 - preYearRows.length; i++) {
      result.push(
        <TableRow
          style={{ border: "none", padding: "16px" }}
          key={"preYearRows" + i}
        >
          <TableCell colSpan={3} style={{ border: "none" }}>
            <span
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
                  width: "25px",
                  margin: "0 15px",
                }}
                alt=""
              />
            </span>
          </TableCell>
        </TableRow>
      );
    }
    return result;
  };
  const rightRendering = () => {
    const result = [];
    for (let i = 0; i < 5 - thisYearRows.length; i++) {
      result.push(
        <TableRow
          style={{ border: "none", padding: "16px" }}
          key={"thisYearRows" + i}
        >
          <TableCell colSpan={3} style={{ border: "none" }}>
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
                  width: "25px",
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
    <div className="cveTable">
      {showModal ? (
        <Modal
          row={showDetails}
          setShowModal={setShowModal}
          uniqueKey={mapKey}
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
            CVE-CODE 목록
          </caption>
          <div className={classes.coupleTableContainer}>
            <Table style={{ float: "left", width: "50%" }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{
                      color: "#F0F0F0",
                      fontSize: "15px",
                      fontWeight: "bold",
                      fontFamily: "SpoqaHanSansNeo-Regular",
                      borderBottom: "none",
                      textAlign: "center",
                      width: "45%",
                    }}
                  >
                    CVE ID
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#F0F0F0",
                      fontSize: "15px",
                      fontWeight: "bold",
                      fontFamily: "SpoqaHanSansNeo-Regular",
                      borderBottom: "none",
                      textAlign: "center",
                      width: "35%",
                    }}
                  >
                    CVSS
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#F0F0F0",
                      fontSize: "15px",
                      fontWeight: "bold",
                      fontFamily: "SpoqaHanSansNeo-Regular",
                      borderBottom: "none",
                      textAlign: "center",
                    }}
                  >
                    references
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {preYearRows.map((row) => (
                  <TableRow
                    key={row.cve + row.cvss_score}
                    className={classes.row}
                  >
                    <TableCell
                      className={classes.row}
                      scope="row"
                      style={{
                        color: "#d1d1d1",
                        fontFamily: "SpoqaHanSansNeo-Regular",
                        fontSize: "15px",
                        textAlign: "center",
                        borderBottom: "none",
                      }}
                    >
                      {row.cve}
                    </TableCell>
                    <TableCell
                      className={classes.row}
                      scope="row"
                      style={{
                        color: "#d1d1d1",
                        fontFamily: "SpoqaHanSansNeo-Regular",
                        fontSize: "15px",
                        textAlign: "center",
                        borderBottom: "none",
                      }}
                    >
                      {row.cvss_score}
                    </TableCell>
                    <TableCell
                      className={classes.row}
                      scope="row"
                      style={{
                        fontFamily: "SpoqaHanSansNeo-Regular",
                        fontSize: "15px",
                        textAlign: "center",
                        borderBottom: "none",
                      }}
                    >
                      <span
                        className="referBtn"
                        onClick={() => {
                          setShowModal(true);
                          setShowDetails(row.references);
                          setMapKey(row.cve);
                        }}
                      >
                        detail
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
                {5 - preYearRows.length <= 0 ? <></> : <>{leftRendering()}</>}
              </TableBody>
            </Table>
            <Table style={{ float: "right", width: "50%" }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{
                      color: "#F0F0F0",
                      fontSize: "15px",
                      fontWeight: "bold",
                      fontFamily: "SpoqaHanSansNeo-Regular",
                      borderBottom: "none",
                      textAlign: "center",
                      width: "45%",
                    }}
                  >
                    CVE ID
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#F0F0F0",
                      fontSize: "15px",
                      fontWeight: "bold",
                      fontFamily: "SpoqaHanSansNeo-Regular",
                      borderBottom: "none",
                      textAlign: "center",
                      width: "35%",
                    }}
                  >
                    CVSS
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#F0F0F0",
                      fontSize: "15px",
                      fontWeight: "bold",
                      fontFamily: "SpoqaHanSansNeo-Regular",
                      borderBottom: "none",
                      textAlign: "center",
                    }}
                  >
                    references
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {thisYearRows.map((row, index) => (
                  <TableRow
                    key={row.cve + row.cvss_score}
                    className={classes.row}
                  >
                    <TableCell
                      className={classes.row}
                      scope="row"
                      style={{
                        color: "#d1d1d1",
                        fontFamily: "SpoqaHanSansNeo-Regular",
                        fontSize: "15px",
                        textAlign: "center",
                        borderBottom: "none",
                      }}
                    >
                      {row.cve}
                    </TableCell>
                    <TableCell
                      className={classes.row}
                      scope="row"
                      style={{
                        color: "#d1d1d1",
                        fontFamily: "SpoqaHanSansNeo-Regular",
                        fontSize: "15px",
                        textAlign: "center",
                        borderBottom: "none",
                      }}
                    >
                      {row.cvss_score}
                    </TableCell>
                    <TableCell
                      className={classes.row}
                      scope="row"
                      style={{
                        fontFamily: "SpoqaHanSansNeo-Regular",
                        fontSize: "15px",
                        textAlign: "center",
                        borderBottom: "none",
                      }}
                    >
                      <span
                        className="referBtn"
                        onClick={() => {
                          setShowModal(true);
                          setShowDetails(row.references);
                          setMapKey(row.cve);
                        }}
                      >
                        detail
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
                {5 - thisYearRows.length <= 0 ? <></> : <>{rightRendering()}</>}
              </TableBody>
            </Table>
          </div>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CveTable;
