import { Grid, useMediaQuery, useTheme, Box } from "@mui/material";
import React from "react";
import Navbar from "../../header/Navbar";
import Cards from "./Cards";
import Chart from "./Chart";
import DivisionPieChart from "./DivisionPieChart";

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box style={{ display: "flex", flexDirection: "column",  }}>
      {!isMobile && (
        <>
          <Navbar title="Dashboard">
          <Cards />
          <Grid container spacing={2} color="inherit">
            <Grid item xs={12} md={6} sm={6}>
              <Chart />
            </Grid>
            <Grid item xs={12} md={6} sm={6}>
              <DivisionPieChart />
            </Grid>
          </Grid>
          </Navbar>
        </>
      )}
      {isMobile && (
        <>
          <Navbar title="Dashboard" />
          <Cards />
          <Box style={{ marginTop: "20px" }}>
            <Chart isMobile={isMobile} />
          </Box>
          <Box style={{ marginTop: "20px" }}>
            <DivisionPieChart isMobile={isMobile} />
          </Box>
        </>
      )}
    </Box>
  );
};

export default Dashboard;
