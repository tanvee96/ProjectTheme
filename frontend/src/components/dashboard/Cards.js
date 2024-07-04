import { Paper, Typography, styled } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardTotalCounts } from "../../store/actions";

const CardGrid = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  width: "100%",
  gap: "20px",
  marginTop: "25px",
  padding: "20px",
});

const StyledCard = styled(Paper)({
  position: "relative",
  height: "75px",
  padding: "8px 4px 8px 16px",
  boxShadow: "0px 1px 13px rgba(222, 233, 241, 0.08)",
  "&::before": {
    content: '""',
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "5px",
    backgroundColor: "#0cc9e8",
    borderRadius: "9px 0 0 9px",
  },
});

const Cards = () => {
  const dispatch = useDispatch();
  
  const {
    totalProjects,
    closedProjects,
    runningProjects,
    cancelledProjects,
    closureDelay,
  } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getDashboardTotalCounts());
  }, [dispatch]);

  const cardData = [
    { title: "Total Projects", count: totalProjects },
    { title: "Closed", count: closedProjects },
    { title: "Running", count: runningProjects },
    { title: "Closure Delay", count: closureDelay },
    { title: "Cancelled", count: cancelledProjects },
  ];

  return (
    <CardGrid>
      {cardData.map((data, index) => (
        <StyledCard key={index}>
          <Typography className="dashboard-card-title">{data.title}</Typography>
          <Typography className="dashboard-card-count">{data.count}</Typography>
        </StyledCard>
      ))}
    </CardGrid>
  );
};

export default Cards;
