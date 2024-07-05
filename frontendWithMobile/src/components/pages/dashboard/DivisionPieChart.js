import React, { useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts";
import { Paper, Box, Typography, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getDivisionWiseChart } from "../../../store/actions";

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: "95%",
  // position: "absolute",
  padding: "5px 0 30px 0",
  margin: "20px",
  height: "320px",
  borderRadius: "12px",
  boxShadow: "rgba(222, 233, 241, 1) 0px 7px 29px 0px",
  display: 'flex', 
  // flexDirection: 'row',
  justifyContent: 'space-between',
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    margin: "0 0 70px 0",
    display: 'flex',
    flexDirection: 'row', 
  },
}));

const DivisionPieChart = ({ isMobile }) => {
  const dispatch = useDispatch();
  const divisionData = useSelector((state) => state.dashboard.divisionWiseChart);

  useEffect(() => {
    dispatch(getDivisionWiseChart());
  }, [dispatch]);

  const COLORS = ['#003366', '#008080', '#e68a00', '#ff4d4d', '#b30000'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <>
      <Box>
        <Typography variant="h6" style={{ color: "#000", paddingLeft: isMobile ? "0px" : "20px", paddingBottom: isMobile ? "10px" : "0px" }}>
          Division Wise Projects
        </Typography>
      </Box>
      <StyledPaper>
        <ResponsiveContainer  width="60%" style={{paddingBottom: '12px'}}>
          <PieChart>
            <Pie
              data={divisionData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="count"
            >
              {divisionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <Box padding="30px">
          {divisionData.map((entry, index) => (
            <Box key={index} display="flex" alignItems="center" marginBottom="8px" color="black">
              <Box
                marginRight="8px"
                style={{ backgroundColor: COLORS[index % COLORS.length], height: '18px', width: '20px' }}
              />
              <Typography variant="body2">{entry._id} ({entry.count})</Typography>
            </Box>
          ))}
        </Box>
      </StyledPaper>
    </>
  );
};

export default DivisionPieChart;
