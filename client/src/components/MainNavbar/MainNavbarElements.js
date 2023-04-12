import styled from "styled-components";
import { Link as LinkR } from "react-router-dom";
import { Link as LinkS } from "react-scroll";

export const Nav = styled.nav`
  background: #000;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  position: sticky;
  top: 0;
  z-index: 10;

  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }
`;

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80px;
  z-index: 1;
  width: 100%;
  padding: 0 24px;
  max-wiidth: 1100px;
`;

export const NavbarLogo = styled(LinkR)`
  justify-self: flex-start;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  margin-left: 24px;
  width: 160px;
`;
export const MobileIcon = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
    color: #fff;
  }
`;

export const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  //margin-right: -22px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavItem = styled.li`
  height: 80px;
`;
export const NavLinks = styled(LinkS)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  font-size: 18px;
  &.active {
    border-bottom: 3px solid #0fd870;
  }

  &:hover {
    color: #0fd870;
  }
`;
export const NavBtnLinkToS = styled(LinkR)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  font-size: 18px;
  &.active {
    border-bottom: 3px solid #0fd870;
  }

  &:hover {
    color: #0fd870;
  }
`;
export const NavBtnContainer = styled.div`
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
export const NavBtn = styled.nav`
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(LinkR)`
  background: ${(props) => props.background};
  display: inline-block;
  white-space: nowrap;
  padding: ${(props) => props.padding};
  color: ${(props) => props.color};
  font-size: ${(props) => props.fontSize};
  outline: none;
  border: none;
  cursor: pointer;
  text-decoration: none;
  line-height: 19px;
  transition: all 0.2s ease-in-out;

  i {
    margin-right: 8px;
    font-size: 18px;
    color: #fff;
    transition: all 0.2s ease-in-out;
  }
  &:hover {
    color: #0fd870;
  }
  &:hover i {
    color: #0fd870;
  }
`;

export const SignOutBtn = styled.button`
  height: 41px;
  width: 100%;
  background: #fff;
  display: inline-block;
  white-space: nowrap;
  color: #010606;
  font-size: 15px;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  line-height: 12px;
  border: none;
  border-radius: 6px;
  i {
    margin-left: -5px;
    font-size: 17px;
    color: #0c0c0c;
  }
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #0fd870;
    i {
      color: #0fd870;
      transition: all 0.2s ease-in-out;
    }
  }
`;
export const NavBtnDropdown = styled.ul`
  display: ${(props) => props.display};
  //display: none;
  position: absolute;
  width: 100%;
  left: 0px;
  top: 44px;
  margin: 0;
  padding: 0;
`;

export const NavBtnList = styled.li`
  top: 20px;
  height: 44px;
  width: 135px;
  padding: 10px 3px;
  transition: 0.2s;
  position: relative;
  display: inline-block;
  text-align: right;
  background-color: transparent;
  border-radius: 6px;

  i {
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-50%, 25%);
    font-size: 1.8rem;
    cursor: pointer;
    color: #fff;
  }
`;

export const DropdownMenu = styled.li`
  display: block;
  width: 100%;
  margin: 4px 0;
  height: 84px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 8px 22px 0 rgb(120 119 119 / 15%);
`;

export const MypageBtnBox = styled.div`
  width: 100%;
`;

export const MypageBtnLink = styled(LinkR)`
  background: #fff;
  display: inline-block;
  white-space: nowrap;
  padding: 11px 20px;
  line-height: 40px;
  color: #010606;
  font-size: 15px;
  transition: all 0.2s ease-in-out;
  outline: none;
  border: none;
  cursor: pointer;
  text-decoration: none;
  line-height: 19px;
  border-radius: 6px;

  i {
    margin-right: 11px;
    font-size: 17px;
    color: #0c0c0c;
  }
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #0fd870;
    i {
      color: #0fd870;
      transition: all 0.2s ease-in-out;
    }
  }
`;
