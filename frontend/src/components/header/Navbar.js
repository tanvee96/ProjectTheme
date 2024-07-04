// Navbar.js
import React from "react";
import { AppBar, IconButton, Toolbar, Typography, styled } from "@mui/material";

import headerImage from "../../assets/Header-bg.svg";
import logo from "../../assets/Logo.svg";
import BackButton from "../helpers/BackButton";

const ImageContainer = styled("div")({
  flex: "1",
  height: "24vh",
  marginLeft: "50px", // Adjusted margin from left
  width: "100%",
  backgroundImage: `url(${headerImage})`,
  backgroundSize: "cover",
});

const LogoImage = styled("img")({
  width: "60px",
  height: "auto",
  position: "absolute",
  top: "35%",
  left: "50%",
  transform: "translate(-50%, -50%)", // Center horizontally and vertically
  zIndex: "3", // Ensure it's above the ImageContainer
});

const Heading = styled(Typography)({
  fontSize: "18px",
  fontWeight: "bold",
  color: "#fff",
  position: "absolute",
  top: "40%",
  left: "80px",
  transform: "translateY(-50%)",
  zIndex: "3", // Ensure it's above the ImageContainer
});

const CardWrapper = styled("div")({
  position: "absolute",
  width: "calc(100% - 50px)", // Adjust width to 100% minus 50px
  left: "50px", // Start positioning 50px from the left
  transform: "translateY(40%)",
  zIndex: "3", // Ensure it's above both ImageContainer and LogoWrapper
});

const Navbar = ({ children, title }) => {
  return (
    <AppBar
      position="fixed"
      style={{
        width: "100%",
        boxShadow: "none",
        backgroundColor: "transparent",
      }}
    >
      <Toolbar disableGutters>
        <ImageContainer />
        <Heading>
          {title !== "Dashboard" && <BackButton />}
          {title}
        </Heading>
        <LogoImage src={logo} alt="Logo" />
        <CardWrapper>{children}</CardWrapper>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
