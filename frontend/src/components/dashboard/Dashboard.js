import { Grid, Typography } from "@mui/material";
import React from "react";
import Navbar from "../header/Navbar";
import Cards from "./Cards";
import Chart from "./Chart";

const Dashboard = () => {
  return (
    <Navbar title="Dashboard">
      <Cards />
      <Chart />
    </Navbar>
  );
};

export default Dashboard;
