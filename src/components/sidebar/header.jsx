import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { sidebarContext } from "./Sidebar";

const Container = styled.div`
  height: 48px;
  font-family: sans-serif;
  font-weight: 600;
  font-size: 30px;
  display: grid;
  place-content: center;
  border-bottom: 1px solid #ccd5ae;

  background-color: #ccd5ae;
  color: #206a3f;
  a {
    text-decoration: none;
    color: #206a3f;
  }
`;
const Header = () => {
  const { header } = useContext(sidebarContext);
  return (
    <Container>
      <Link to={"/"}>{header}</Link>
    </Container>
  );
};

export default Header;
