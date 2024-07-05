import React from "react";
import { styled } from "@mui/system";
import { Paper, useMediaQuery } from "@mui/material";

import loginBackground from "../../assets/login-bg-1.svg";
import logo from "../../assets/Logo.svg";

const PageContainer = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "100vh",
  position: "relative",
  overflow: "hidden",
}));

const ImageContainer = styled("div")(({ theme }) => ({
  flex: "1",
  width: "100%",
  height: "75vh",
  backgroundImage: `url(${loginBackground})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  [theme.breakpoints.down('sm')]: {
    height: "30vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
    // borderRadius: "0px 0px 0px 40%",
  },
}));

const LogoWrapper = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "50px",
  textAlign: "center",
  zIndex: "1",
  [theme.breakpoints.down('sm')]: {
    top: "75px",
  },
}));

const LogoImage = styled("img")({
  width: "80px",
  height: "auto",
});

const LogoText = styled("div")(({ theme }) => ({
  paddingTop: "12px",
  fontSize: "14px",
  color: "#fff",
  [theme.breakpoints.down('sm')]: {
    fontSize: "16px",
  },
}));

const BlankSpace = styled("div")(({ theme }) => ({
  height: "25vh",
  [theme.breakpoints.down('sm')]: {
    height: "55vh",
  },
}));

const LoginCardWrapper = styled("div")(({ theme }) => ({
  position: "absolute",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  transform: "translateY(60%)",
  zIndex: "2",
  [theme.breakpoints.down('sm')]: {
    transform: "translateY(50%)",
    top: "20%",
  },
}));

const LoginCard = styled(Paper)(({ theme }) => ({
  width: "300px",
  height: "300px",
  padding: "30px",
  boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
  [theme.breakpoints.down('sm')]: {
    width: "90%",
    height: "auto",
    padding: "20px 30px 10px 30px",
    boxShadow: 'none',
  },
}));

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
