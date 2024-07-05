import React, { useEffect } from "react";
import { Drawer, List, ListItemButton, ListItemIcon, Divider, Box, AppBar, Toolbar, IconButton } from "@mui/material";
import { styled, useTheme } from "@mui/system";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "@mui/material";

import DashboardIcon from "../../assets/Dashboard.svg";
import DashboardIconActive from "../../assets/Dashboard-active.svg";
import CreateIcon from "../../assets/create-project.svg";
import CreateIconActive from "../../assets/create-project-active.svg";
import ListIcon from "../../assets/Project-list.svg";
import ListIconActive from "../../assets/Project-list-active.svg";
import LogoutIcon from "../../assets/Logout.svg";
import { logout } from "../../store/actions";

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: 45,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: 50,
    boxSizing: "border-box",
    height: "100vh",
    overflow: "hidden",
    position: 'fixed',
    [theme.breakpoints.down('sm')]: {
      display: 'none', // Hide the sidebar on mobile
    },
  },
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  paddingLeft: 14,
  margin: "18px 0px 18px 0px",
  ":hover": { backgroundColor: "transparent" },
  "&.Mui-selected": {
    paddingLeft: 14,
    backgroundColor: "transparent",
    "& .MuiListItemIcon-root": {
      "&:before": {
        content: '""',
        position: "absolute",
        top: 6,
        left: 0,
        height: "70%",
        width: 5,
        borderRadius: "0 8px 8px 0",
        backgroundColor: "#045096",
      },
    },
  },
  "&.Mui-selected:hover": {
    backgroundColor: "transparent",
  },
}));

const CustomIcons = styled("img")(({ theme }) => ({
  width: "20px",
  height: "20px",
  [theme.breakpoints.down('sm')]: {
    width: "25px",
    height: "25px",
  },
}));

const Sidebar = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
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
    <>
      {!isMobile && (
        <StyledDrawer variant="permanent">
          <Box display="flex" flexDirection="column" justifyContent="space-between" height="100vh">
            <Box flex={1} />
            <List>
              <StyledListItemButton
                selected={selectedIndex === 0}
                onClick={(event) => handleListItemClick(event, 0, "/dashboard")}
              >
                <ListItemIcon>
                  <CustomIcons src={selectedIndex === 0 ? DashboardIconActive : DashboardIcon} />
                </ListItemIcon>
              </StyledListItemButton>
              <StyledListItemButton
                selected={selectedIndex === 1}
                onClick={(event) => handleListItemClick(event, 1, "/project-list")}
              >
                <ListItemIcon>
                  <CustomIcons src={selectedIndex === 1 ? ListIconActive : ListIcon} />
                </ListItemIcon>
              </StyledListItemButton>
              <Divider />
              <StyledListItemButton
                selected={selectedIndex === 2}
                onClick={(event) => handleListItemClick(event, 2, "/create-project")}
              >
                <ListItemIcon>
                  <CustomIcons src={selectedIndex === 2 ? CreateIconActive : CreateIcon} />
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
      )}
      {isMobile && (
        <AppBar position="fixed" style={{ top: 'auto', bottom: 0, backgroundColor: '#fff' }}>
          <Toolbar style={{ justifyContent: "space-around" }}>
            <IconButton
              color={selectedIndex === 0 ? "secondary" : "inherit"}
              onClick={(event) => handleListItemClick(event, 0, "/dashboard")}
              style={{ position: 'relative' }}
            >
              {selectedIndex === 0 && (
                <Box
                  component="span"
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    height: 6,
                    width: "100%",
                    borderRadius: '8px',
                    backgroundColor: '#045096',
                  }}
                />
              )}
              <CustomIcons src={selectedIndex === 0 ? DashboardIconActive : DashboardIcon} />
            </IconButton>
            <IconButton
              color={selectedIndex === 2 ? "secondary" : "inherit"}
              onClick={(event) => handleListItemClick(event, 2, "/create-project")}
              style={{ position: 'relative' }}
            >
              {selectedIndex === 2 && (
                <Box
                  component="span"
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    height: 6,
                    width: "100%",
                    borderRadius: '8px',
                    backgroundColor: '#045096',
                  }}
                />
              )}
              <CustomIcons src={selectedIndex === 2 ? CreateIconActive : CreateIcon} />
            </IconButton>
            <IconButton
              color={selectedIndex === 1 ? "secondary" : "inherit"}
              onClick={(event) => handleListItemClick(event, 1, "/project-list")}
              style={{ position: 'relative' }}
            >
              {selectedIndex === 1 && (
                <Box
                  component="span"
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    height: 6,
                    width: "100%",
                    borderRadius: '8px',
                    backgroundColor: '#045096',
                  }}
                />
              )}
              <CustomIcons src={selectedIndex === 1 ? ListIconActive : ListIcon} />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}
    </>
  );
};

export default Sidebar;
