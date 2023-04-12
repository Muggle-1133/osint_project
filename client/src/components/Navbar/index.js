import React from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import "../MainNavbar/Navbar.css";
import {
  Nav,
  NavbarContainer,
  NavBtn,
  NavBtnLink,
  SignOutBtn,
  NavbarLogo,
  NavbarBox,
} from "./NavbarElements";
import { IconContext } from "react-icons/lib";
import logo from "../images/logo.png";

const Navbar = ({ Text, location, iconClass, setLoginStatus }) => {
  const history = useHistory();
  // signout 버튼 클릭 시 세션 삭제
  const onClickSignOut = () => {
    Axios.post("//" + window.location.hostname + ":4000/api/logout", {}).then(
      (res, err) => {
        // 성공적으로 로그아웃된 경우
        if (res.data.message) {
          console.log(res.data.message);
          sessionStorage.removeItem("user_id");
          setLoginStatus(false);
          history.push("/");
        } else {
          console.log(err);
        }
      }
    );
  };
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav>
          <NavbarContainer>
            <NavbarLogo className="NavbarLogo" to="/">
              <img src={logo} alt="logo" />
            </NavbarLogo>

            {Text === "로그아웃" ? (
              <NavbarBox>
                <NavBtn>
                  <NavBtnLink to="/">
                    <i className="fa-solid fa-house"></i>홈
                  </NavBtnLink>
                </NavBtn>
                <NavBtn>
                  <SignOutBtn onClick={onClickSignOut}>
                    <i className="fa-solid fa-arrow-right-to-bracket"></i>
                    로그아웃
                  </SignOutBtn>
                </NavBtn>
              </NavbarBox>
            ) : (
              <NavbarBox>
                <NavBtn>
                  <NavBtnLink to="/">
                    <i className="fa-solid fa-house"></i>홈
                  </NavBtnLink>
                </NavBtn>
                <NavBtn>
                  <NavBtnLink to={location}>
                    <i className={iconClass}></i>
                    {Text}
                  </NavBtnLink>
                </NavBtn>
              </NavbarBox>
            )}
          </NavbarContainer>
        </Nav>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;
