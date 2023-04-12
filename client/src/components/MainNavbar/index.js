import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import "./Navbar.css";
import {
  Nav,
  NavbarContainer,
  MobileIcon,
  NavMenu,
  NavLinks,
  NavItem,
  NavBtn,
  NavBtnLink,
  SignOutBtn,
  NavBtnList,
  NavBtnDropdown,
  DropdownMenu,
  MypageBtnBox,
  MypageBtnLink,
} from "./MainNavbarElements";
import { IconContext } from "react-icons/lib";
import { FaBars } from "react-icons/fa";
import logo from "../images/logo.png";
import { animateScroll as scroll } from "react-scroll";
const MainNavbar = ({ toggle, loginStat, setLoginStatus }) => {
  const [scrollNav, setScrollNav] = useState(false);
  const history = useHistory();
  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };
  const [isToggle, setIsToggle] = useState(false);
  const [showDropdown, setShowDropdown] = useState("none");

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
  const profileIconRef = useRef();
  const handleClickOutside = (e) => {
    if (profileIconRef && !profileIconRef.current.contains(e.target)) {
      setIsToggle(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNav);
    document.addEventListener("mousedown", handleClickOutside);

    if (isToggle) {
      setShowDropdown("block");
    } else {
      setShowDropdown("none");
    }

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isToggle]);
  const toggleHome = () => {
    scroll.scrollToTop();
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav scrollNav={scrollNav}>
          <NavbarContainer>
            <div className="NavbarLogo" to="/" onClick={toggleHome}>
              <img src={logo} alt="logo" />
            </div>
            <MobileIcon onClick={toggle}>
              <FaBars />
            </MobileIcon>
            <NavMenu>
              <NavItem>
                <NavLinks
                  to="home"
                  smooth={true}
                  duration={500}
                  spy={true}
                  exact="true"
                  offset={-80}
                >
                  Home
                </NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks
                  smooth={true}
                  duration={500}
                  spy={true}
                  exact="true"
                  offset={-80}
                  to="solution"
                >
                  Solution
                </NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks
                  to="services"
                  smooth={true}
                  duration={500}
                  spy={true}
                  exact="true"
                  offset={-80}
                >
                  Services
                </NavLinks>
              </NavItem>
              <NavItem>
                {loginStat === false ? (
                  <NavLinks
                    to="signup"
                    smooth={true}
                    duration={500}
                    spy={true}
                    exact="true"
                    offset={-80}
                  >
                    Sign Up
                  </NavLinks>
                ) : (
                  <NavLinks
                    to="search"
                    smooth={true}
                    duration={500}
                    spy={true}
                    exact="true"
                    offset={-80}
                  >
                    Search
                  </NavLinks>
                )}
              </NavItem>
            </NavMenu>
            {loginStat === false ? (
              <NavBtn>
                <NavBtnLink
                  to="/signin"
                  padding="14px 17px"
                  fontSize="17px"
                  background="transparent"
                  color="#fff"
                >
                  <i className="fa-solid fa-right-to-bracket"></i>
                  로그인
                </NavBtnLink>
              </NavBtn>
            ) : (
              <NavBtnList className="navBtnLi" ref={profileIconRef}>
                <i
                  className="fa fa-user-circle-o"
                  onClick={() => setIsToggle(!isToggle)}
                ></i>
                <NavBtnDropdown display={showDropdown}>
                  <DropdownMenu>
                    <MypageBtnBox>
                      <MypageBtnLink to="/mypage">
                        <i className="fa-solid fa-user"></i>
                        마이페이지
                      </MypageBtnLink>
                    </MypageBtnBox>
                    <SignOutBtn onClick={onClickSignOut}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          gap: "17px",
                        }}
                      >
                        <i className="fa-solid fa-arrow-right-to-bracket"></i>
                        로그아웃
                      </div>
                    </SignOutBtn>
                  </DropdownMenu>
                </NavBtnDropdown>
              </NavBtnList>
            )}
          </NavbarContainer>
        </Nav>
      </IconContext.Provider>
    </>
  );
};

export default MainNavbar;
