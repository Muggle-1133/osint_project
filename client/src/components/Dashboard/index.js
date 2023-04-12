import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/index";
import Loading from "../Search/Loading";
import { useLocation } from "react-router-dom";
import { Container } from "./DashboardElements";
import Sidebar from "./Sidebar/Sidebar";
import Cards from "./Cards/Cards";
import NetworktTable from "./netcraftWrap/NetworkTable";
import InfoTable from "./netcraftWrap/InfoTable";
import VirusTable from "./virusWrap/Table";
import HunterTable from "./hunterWrap/Table";
import ShodanInfoTable from "./shodanWrap/InfoTable";
import VulnTable from "./shodanWrap/VulnTable";
import CveTable from "./shodanWrap/cveTable";
import TipTable from "./tipWrap/Table";
import CipherTable from "./netcraftWrap/Table";
import SSLTable from "./tipWrap/sslTable";
import "./Dashboard.css";
import SearchForm from "./SearchForm/SearchForm";
import Axios from "axios";
import SearchHistoryTable from "./SearchHistory";

const Dashboard = ({ setLoginStatus }) => {
  const currentLocation = useLocation();
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(0);
  const values = currentLocation.state.isValue;

  const Text = "로그아웃";
  const location = "/signout";
  const iconClass = "fa-solid fa-arrow-right-to-bracket";
  // search history 부분
  const userIdx = sessionStorage.getItem("user_id");
  const today = new Date();

  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);
  const hours = ("0" + today.getHours()).slice(-2);
  const minutes = ("0" + today.getMinutes()).slice(-2);
  const seconds = ("0" + today.getSeconds()).slice(-2);
  const dateString = year + "-" + month + "-" + day;
  const timeString = hours + ":" + minutes + ":" + seconds;
  const dateTime = dateString + " " + timeString;

  const vulnerableLists = [
    {
      name: "CVE-CODE",
      item:
        values.shodan.this_year_cve.length +
        values.shodan.previous_year_cve.length,
    },
    {
      name: "Malware",
      item:
        values.tip_result.malware.warningDetails.length +
        values.virustotal.total_detected_virus,
    },
    { name: "Email", item: values.hunter.total_leaked_emails },
    { name: "Log4j", item: values.shodan.cve_log4j.length },
    { name: "Allow FTP anonymous access", item: values.shodan.vuln_ftp },
    { name: "Apache directory listing", item: values.shodan.vuln_dir_listings },
    {
      name: "Telnet connection with root account",
      item: values.shodan.vuln_root_telnet,
    },
  ];
  const filteredArr = vulnerableLists.filter((obj) => obj.item > 0);
  let vulnerableItems = "";
  for (let i = 0; i < filteredArr.length; i++) {
    if (i === filteredArr.length - 1) {
      vulnerableItems += filteredArr[i].name;
    } else {
      vulnerableItems += filteredArr[i].name + ", ";
    }
  }
  useEffect(() => {
    if (!loading) {
      Axios.post(
        "//" + window.location.hostname + ":4000/api/insertSearchData",
        {
          idx: userIdx,
          dateTime: dateTime,
          searchAddress: values.netcraft.site,
          vulnerableItems: vulnerableItems,
        }
      ).then((res) => {
        if (res.data.err) {
          console.log(res.data.err);
        } else {
          //console.log(res.data);
        }
        return () => setLoading(false);
      });
    }
  }, [values]);

  return (
    <>
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <>
          <Container>
            <Navbar
              Text={Text}
              location={location}
              iconClass={iconClass}
              setLoginStatus={setLoginStatus}
            />
            <div className="MainContainer">
              <Sidebar
                values={values.netcraft.site}
                selected={selected}
                setSelected={setSelected}
              />
              <div className="MainSection">
                {selected === 0 ? (
                  <>
                    <SearchForm
                      values={values.netcraft.site}
                      setLoading={setLoading}
                    />
                    <Cards values={values} />
                    <div className="parentContainer2">
                      <div className="MainWrap2">
                        <ShodanInfoTable values={values} />
                        <NetworktTable values={values} />
                        <InfoTable values={values} />
                      </div>
                    </div>
                    <div className="parentContainer2">
                      <div className="MainWrap2">
                        <VirusTable values={values} />
                        <VulnTable values={values} />
                        <TipTable values={values} />
                      </div>
                    </div>
                    <div className="parentContainer2">
                      <div className="MainWrap2">
                        <CveTable values={values} />
                        <HunterTable values={values} />
                      </div>
                    </div>
                    <div className="parentContainer2">
                      <div className="MainWrap2">
                        <CipherTable values={values} />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="searchHistoryContainer">
                      <SearchHistoryTable userIdx={userIdx} />
                    </div>
                  </>
                )}
              </div>
            </div>
          </Container>
        </>
      )}
    </>
  );
};
export default Dashboard;
