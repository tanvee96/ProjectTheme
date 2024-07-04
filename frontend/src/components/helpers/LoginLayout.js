import React from "react";
import { styled } from "@mui/system";
import { Paper } from "@mui/material";

import loginBackground from "../../assets/login-bg-1.svg";
import logo from "../../assets/Logo.svg";

const PageContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "100vh",
  position: "relative",
});

const ImageContainer = styled("div")({
  flex: "1",
  height: "75vh",
  width: "100%",
  backgroundImage: `url(${loginBackground})`,
  backgroundSize: "cover",
});

const LogoWrapper = styled("div")({
  position: "absolute",
  top: "50px",
  textAlign: "center",
  zIndex: "1", // Ensure it's above ImageContainer
});

const LogoImage = styled("img")({
  width: "80px",
  height: "auto",
});

const LogoText = styled("div")({
  paddingTop: "12px",
  fontSize: "14px",
  color: "#fff",
});

const BlankSpace = styled("div")({
  height: "25vh",
});

const LoginCardWrapper = styled("div")({
  position: "absolute",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  transform: "translateY(50%)",
  zIndex: "2", // Ensure it's above both ImageContainer and LogoWrapper
});

const LoginCard = styled(Paper)({
  width: "300px",
  height: "300px",
  marginTop: '10px',
  padding: "20px",
  boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
});

const LoginLayout = ({ children }) => {
  return (
    <PageContainer>
      <ImageContainer />
      <LogoWrapper>
        <LogoImage src={logo} alt="Logo" />
        <LogoText>Online Project Management</LogoText>
      </LogoWrapper>
      <LoginCardWrapper>
        <LoginCard>
          {children}
        </LoginCard>
      </LoginCardWrapper>
      <BlankSpace />
    </PageContainer>
  );
};

export default LoginLayout;
