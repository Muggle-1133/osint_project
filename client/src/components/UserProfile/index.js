import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/index";
import { Container } from "../Signin/SigninElements";
import PasswordTab from "./passwordTab";
import "./profile.css";

const profileTab = ({ userData }) => {
  return (
    <div className="profile tabShow">
      <h1>사용자 정보</h1>
      <h2>user name</h2>
      <input
        type="text"
        className="infoInput"
        value={userData.username}
        readOnly
      />
      <h2>Email</h2>
      <input
        type="text"
        className="infoInput"
        value={userData.email}
        readOnly
      />
      <h2>Password</h2>
      <input
        type="password"
        className="infoInput"
        value={userData.password}
        readOnly
      />
    </div>
  );
};

function UserProfile({ setLoginStatus }) {
  const userData = {
    idx: sessionStorage.getItem("user_id"),
    email: sessionStorage.getItem("email"),
    username: sessionStorage.getItem("user_name"),
    password: sessionStorage.getItem("password"),
  };
  const Text = "로그아웃";
  const location = "/signout";
  const iconClass = "fa-solid fa-arrow-right-to-bracket";
  const [icon, setIcon] = useState("userIcon");
  const activeClass = "iconActive";
  const noneActive = "iconContain";
  useEffect(() => {
    //console.log(icon);
  }, [icon]);
  return (
    <Container>
      <Navbar
        Text={Text}
        location={location}
        iconClass={iconClass}
        setLoginStatus={setLoginStatus}
      />
      <div className="profileBackground">
        <div className="profileContainer">
          <div className="leftWrap">
            <nav className="profileNav">
              <div className={icon === "userIcon" ? "iconActive" : "tab"}>
                <span
                  onClick={() => {
                    setIcon("userIcon");
                  }}
                  className={icon === "userIcon" ? activeClass : noneActive}
                >
                  <i className="fa-solid fa-user"></i>
                </span>
              </div>
              <div>
                <span
                  onClick={() => {
                    setIcon("passwordIcon");
                  }}
                  className={icon === "passwordIcon" ? activeClass : noneActive}
                >
                  <i className="fa-solid fa-lock"></i>
                </span>
              </div>
            </nav>
          </div>
          <div className="rightWrap">
            {icon === "userIcon" ? (
              profileTab({ userData })
            ) : (
              <>
                <PasswordTab userData={userData} />
              </>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default UserProfile;
