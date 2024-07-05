import React from "react";
import { AppBar, Toolbar, Typography, styled, IconButton, useMediaQuery, useTheme, SvgIcon } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import headerImage from "../../assets/Header-bg.svg";
import logo from "../../assets/Logo.svg";
import { ReactComponent as LogoutIcon } from "../../assets/Logout.svg";
import BackButton from "../helpers/BackButton";
import { logout } from "../../store/actions";
import { Logout } from "@mui/icons-material";

const ImageContainer = styled("div")({
  flex: "1",
  height: "24vh",
  marginLeft: "50px",
  width: "100%",
  backgroundImage: `url(${headerImage})`,
  backgroundSize: "cover",
  '@media (max-width: 600px)': {
    marginLeft: "0px",
    height: "13vh",
  },
});

const LogoImage = styled("img")({
  width: "60px",
  height: "auto",
  position: "absolute",
  top: "35%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: "3",
  '@media (max-width: 600px)': {
    top: "50%",
  },
});

const Heading = styled(Typography)({
  fontSize: "18px",
  fontWeight: "bold",
  color: "#fff",
  position: "absolute",
  top: "40%",
  left: "80px",
  transform: "translateY(-50%)",
  zIndex: "3",
  '@media (max-width: 600px)': {
    top: "50%",
    left: "20px",
  },
});

const CardWrapper = styled("div")({
  position: "absolute",
  width: "calc(100% - 50px)",
  left: "50px",
  transform: "translateY(40%)",
  zIndex: "3",
  '@media (max-width: 600px)': {
    width: "100%",
    left: "0px",
    transform: "translateY(50%)",
  },
});


const Navbar = ({ children, title }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

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
        {!isMobile && <LogoImage src={logo} alt="Logo" /> }
        <CardWrapper>{children}</CardWrapper>
        {isMobile &&
          <IconButton
            edge="end"
            aria-label="logout"
            onClick={handleLogout}
            style={{ position: "absolute",  right: 20, top: "50%", transform: "translateY(-50%)" }}
          >
            <Logout style={{ width: "24px", height: "24px", color: "white" }} />
          </IconButton>
        }
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
