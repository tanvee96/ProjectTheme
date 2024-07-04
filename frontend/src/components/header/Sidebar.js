import React, { useEffect } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  Divider,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import { useLocation, useNavigate } from "react-router-dom";

import DashboardIcon from "../../assets/Dashboard.svg";
import DashboardIconActive from "../../assets/Dashboard-active.svg";
import CreateIcon from "../../assets/create-project.svg";
import CreateIconActive from "../../assets/create-project-active.svg";
import ListIcon from "../../assets/Project-list.svg";
import ListIconActive from "../../assets/Project-list-active.svg";
import LogoutIcon from "../../assets/Logout.svg";
import { logout } from "../../store/actions";
import { useDispatch } from "react-redux";

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: 45,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: 50,
    boxSizing: "border-box",
    height: "100vh", // Full viewport height to remove scroll
    overflow: "hidden", // Remove scrollbar
  },
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  paddingLeft: 14,
  margin: "18px 0px 18px 0px",
  ":hover": { backgroundColor: "transparent"},

  "&.Mui-selected": {
    // color: theme.palette.primary.main,
    paddingLeft: 14,
    backgroundColor: "transparent",

    "& .MuiListItemIcon-root": {
      //   color: theme.palette.primary.main,
      "&:before": {
        content: '""',
        position: "absolute",
        top: 6,
        left: 0,
        height: "70%",
        width: 4,
        borderRadius: "0 8px 8px 0",
        backgroundColor: "#045096",
      },
    },
  },
  "&.Mui-selected:hover": {
    backgroundColor: "transparent",
  },
}));

const CustomIcons = styled("img")(() => ({
  width: "20px",
  height: "20px",
}));

const Sidebar = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  };

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      setSelectedIndex(0);
    } else if (location.pathname === "/project-list") {
      setSelectedIndex(1);
    } else if (location.pathname === "/create-project") {
      setSelectedIndex(2);
    }
  }, [location.pathname]);

  const handleListItemClick = (event, index, path) => {
    setSelectedIndex(index);
    navigate(path);
  };

  return (
    <StyledDrawer variant="permanent">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        height="100vh"
      >
        <Box flex={1} />
        <List>
          <StyledListItemButton
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0, "/dashboard")}
          >
            <ListItemIcon>
              <CustomIcons
                src={selectedIndex === 0 ? DashboardIconActive : DashboardIcon}
              />
            </ListItemIcon>
          </StyledListItemButton>
          <StyledListItemButton
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1, "/project-list")}
          >
            <ListItemIcon>
              <CustomIcons
                src={selectedIndex === 1 ? ListIconActive : ListIcon}
              />
            </ListItemIcon>
          </StyledListItemButton>

          <Divider />

          <StyledListItemButton
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2, "/create-project")}
          >
            <ListItemIcon>
              <CustomIcons
                src={selectedIndex === 2 ? CreateIconActive : CreateIcon}
              />
            </ListItemIcon>
          </StyledListItemButton>
        </List>
        <Box flexGrow={1} />
        <List>
          <StyledListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <CustomIcons src={LogoutIcon} />
            </ListItemIcon>
          </StyledListItemButton>
        </List>
      </Box>
    </StyledDrawer>
  );
};

export default Sidebar;
