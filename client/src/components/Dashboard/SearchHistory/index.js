import Axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@mui/styles";
import "./Table.css";

function createData(index, date, searchAddress, vulnItems) {
  return { index, date, searchAddress, vulnItems };
}
const useStyles = makeStyles({
  // hide last border
  row: {
    "&:last-child td, &:last-child th": {
      border: "none",
    },
  },
  tableHeade: {
    background: "#40404061",
  },
});

const SearchHistoryTable = ({ userIdx }) => {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  let styleItem = "noItems";
  let values = [];
  useEffect(() => {
    Axios.post("//" + window.location.hostname + ":4000/api/search_history", {
      idx: userIdx,
    }).then((res) => {
      if (res.data.err) {
        console.log(res.data.err);
      } else {
        for (let i = 0; i < res.data.length; i++) {
          values.push(
            createData(
              i + 1,
              res.data[i].searchDate,
              res.data[i].searchAddress,
              res.data[i].vulnerableItems
            )
          );
        }
        setRows(values);
      }
    });
  }, []);

  return (
    <div className="searchHistoryTable">
      <TableContainer
        style={{
          background: "rgb(58 58 58 / 45%)",
          borderRadius: "0.4rem",
          fontFamily: "SpoqaHanSansNeo-Regular",
        }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow className={classes.tableHeade}>
              <TableCell
                style={{
                  fontFamily: "SpoqaHanSansNeo-Regular",
                  fontSize: "15px",
                  fontWeight: "bold",
                  color: "#fff",
                  borderBottom: "none",
                }}
              >
                번호
              </TableCell>
              <TableCell
                style={{
                  fontFamily: "SpoqaHanSansNeo-Regular",
                  fontSize: "15px",
                  fontWeight: "bold",
                  color: "#fff",
                  textAlign: "center",
                  borderBottom: "none",
                }}
              >
                검색 날짜
              </TableCell>
              <TableCell
                style={{
                  fontFamily: "SpoqaHanSansNeo-Regular",
                  fontSize: "15px",
                  fontWeight: "bold",
                  color: "#fff",
                  borderBottom: "none",
                }}
                align="center"
              >
                검색 주소
              </TableCell>
              <TableCell
                style={{
                  fontFamily: "SpoqaHanSansNeo-Regular",
                  fontSize: "15px",
                  fontWeight: "bold",
                  color: "#fff",
                  borderBottom: "none",
                }}
                align="center"
              >
                취약점 항목
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.index} className={classes.row}>
                <TableCell
                  component="th"
                  scope="row"
                  style={{
                    width: "10%",
                    color: "#11d386",
                    fontSize: "14px",
                    borderBottom: "1px solid rgb(82 82 82 / 45%)",
                    fontFamily: "SpoqaHanSansNeo-Regular",
                    paddingLeft: "20px",
                  }}
                  className={classes.row}
                >
                  {row.index}
                </TableCell>
                <TableCell
                  className={classes.row}
                  align="center"
                  style={{
                    borderBottom: "1px solid rgb(82 82 82 / 45%)",
                    width: "24%",
                    fontFamily: "SpoqaHanSansNeo-Regular",
                    color: "#eee",
                  }}
                >
                  {row.date}
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    borderBottom: "1px solid rgb(82 82 82 / 45%)",
                    width: "36%",
                    fontFamily: "SpoqaHanSansNeo-Regular",
                    color: "#eee",
                  }}
                >
                  {row.searchAddress}
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    borderBottom: "1px solid rgb(82 82 82 / 45%)",
                    width: "30%",
                    fontFamily: "SpoqaHanSansNeo-Regular",
                    color: "#eee",
                  }}
                >
                  <span className={styleItem}>
                    {row.vulnItems === null || undefined ? "None" : row.vulnItems}
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

export default SearchHistoryTable;
