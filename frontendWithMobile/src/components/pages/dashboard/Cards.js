import { Paper, Typography, styled } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardTotalCounts } from "../../../store/actions";

const CardGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  width: "100%",
  gap: "20px",
  marginTop: "6%",
  padding: "20px",
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px",
    padding: "20px 10px",
    margin: "10px 0px 0px 0px",
  },
}));

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
  '@media (max-width: 600px)': {
    padding: "6px 4px 6px 10px",
  },
});

const cardTitle = {
  color: '#474d52',
  fontSize: '14px',
  '@media (max-width: 600px)': {
    fontSize: '12px',
  },
}
const cardCount = {
  fontSize: '25px',
  fontWeight: 'bold', 
  color: '#474d52',
}

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
          <Typography style={cardTitle}>{data.title}</Typography>
          <Typography style={cardCount}>{data.count}</Typography>
        </StyledCard>
      ))}
    </CardGrid>
  );
};

export default Cards;
