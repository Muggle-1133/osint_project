import React from "react";
import Search from "../components/Search";

const SearchPage = ({ loginStat }) => {
  return (
    <>
      <Search loginStat={loginStat} />
    </>
  );
};
export default SearchPage;
