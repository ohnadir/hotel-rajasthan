import React from "react";
import styled from "styled-components";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <MainHeader>
      <h1 className="text-3xl text-white font-bold font-sans">Rajasthan</h1>
      <Navbar />
    </MainHeader>
  );
};

const MainHeader = styled.header`
  padding: 0 20px;
  height: 70px;
  background-color: #0061ff;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default Header;
