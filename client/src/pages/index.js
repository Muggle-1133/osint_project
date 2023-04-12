import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import MainNavbar from "../components/MainNavbar";
import MainSection from "../components/MainSection";
import InfoSection from "../components/InfoSection/index";
import Services from "../components/Services/index";
import Footer from "../components/Footer/index";
import {
  homeObjOne,
  homeObjTwo,
  homeObjSearch,
} from "../components/InfoSection/Data";
import Loading from "../components/Search/Loading";

const Home = ({ loginStat, setLoginStatus }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <>
          <Sidebar isOpen={isOpen} toggle={toggle} />
          <MainNavbar
            toggle={toggle}
            loginStat={loginStat}
            setLoginStatus={setLoginStatus}
          />
          <MainSection loginStat={loginStat} />
          <InfoSection {...homeObjOne} />
          <Services />
          {loginStat ? (
            <InfoSection {...homeObjSearch} setLoading={setLoading} />
          ) : (
            <InfoSection {...homeObjTwo} />
          )}
          <Footer />
        </>
      )}
    </>
  );
};

export default Home;
