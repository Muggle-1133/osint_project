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
  top: 0px;
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
  align-items: center;
`;

export const NavbarLogo = styled(LinkR)`
  text-decoration: none;
  color: #fff;
  font-weight: 700;
  font-size: 32px;
  width: 145px;
  height: 80px;
  @media screen and (max-width: 480px) {
    margin-left: 16px;
    margin-top: 8px;
  }
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
  margin-right: -22px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavItem = styled.li`
  height: 80px;
`;

export const SignOutBtn = styled.button`
  border-radius: 8px;
  background: transparent;
  white-space: nowrap;
  padding: 12px 16px;
  color: #fff;
  font-size: 17px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  display: inline-block;

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
    border-bottom: 3px solid #01bf71;
  }

  &:hover {
    color: #04cb79;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(LinkR)`
  border-radius: 8px;
  //background: #0fd870;
  white-space: nowrap;
  padding: 12px 17px;
  color: #fff;
  font-size: 16px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  display: inline-block;

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

export const NavbarBox = styled.div`
  gap: 16px;
  display: flex;
  justify-content: space-between;
`;
