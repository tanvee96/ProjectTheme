import React, { useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LabelList,
  ResponsiveContainer,
  Text,
} from "recharts";
import { Paper, Grid, Box, Typography } from "@mui/material";
import { getDeptWiseSuccessPercentage } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";

const dataKeyStyling = {
  fontSize: "14px",
  fill: "#000",
};
const percStyle = {
  fontSize: "13px",
  fill: "#000",
  fontWeight: 'bolder'
};
const LabelListStyling = {
  fontSize: "12px",
  fill: "#000",
};

const CustomLegend = () => {
  return (
    <Box display="flex" justifyContent="center" pr={3}>
      <Box display="flex" alignItems="center" mr={2}>
        <svg width="14" height="14">
          <circle cx="6" cy="6" r="5" fill="#025aab" />
        </svg>
        <Typography variant="body2" pl={1}>
          Total
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" pl={3}>
        <svg width="14" height="14">
          <circle cx="6" cy="6" r="5" fill="#5aa647" />
        </svg>
        <Typography variant="body2" pl={1}>
          Closed
        </Typography>
      </Box>
    </Box>
  );
};


const Chart = () => {
  const dispatch = useDispatch();
  const dept_success_percentage = useSelector(
    (state) => state.dashboard.dept_success_percentage
  );
  useEffect(() => {
    dispatch(getDeptWiseSuccessPercentage());
  }, []);

  const renderCustomAxisTick = ({ x, y, payload, index }) => {
    const currentData = dept_success_percentage[index];
    return (
      <g transform={`translate(${x},${y})`}>
        <Text x={0} y={10} dy={0} textAnchor="middle" style={percStyle}>
          {currentData ? `${currentData.percentage}%` : ''}
        </Text>
        <Text x={0} y={15} dy={16} textAnchor="middle" style={dataKeyStyling}>
          {payload.value}
        </Text>
      </g>
    );
  };
  return (
    <>
      <Box>
        <Typography variant="h6" style={{ color: "#000", paddingLeft: "20px" }}>
          Department wise - Total Vs Closed
        </Typography>
      </Box>
      <Paper
        style={{
          width: "50%",
          position: "absolute",
          padding: "5px",
          margin: "20px",
          height: "320px",
          paddingBottom: "30px",
          borderRadius: "12px",
          boxShadow: "rgba(222, 233, 241, 1) 0px 7px 29px 0px",
        }}
      >
        <ResponsiveContainer width="100%">
          <BarChart
            data={dept_success_percentage}
            margin={{
              top: 30,
              right: 20,
              left: 0,
              bottom: 30,
            }}
            barGap={14}
          >
            <XAxis dataKey="department" tickLine={false} tick={renderCustomAxisTick} />
            <YAxis tickLine={false} style={dataKeyStyling} />
            {/* <YAxis
              tickLine={false}
              domain={[0, (dataMax) => Math.ceil(dataMax / 10) * 10]}
              style={{ marginBottom: "10px" }} 
            /> */}
            <Bar
              dataKey="total"
              fill="#025aab"
              radius={[4, 4, 4, 4]}
              barSize={10}
            >
              <LabelList
                dataKey="total"
                position="top"
                style={LabelListStyling}
              />
            </Bar>
            <Bar
              dataKey="closed"
              fill="#5aa647"
              radius={[4, 4, 4, 4]}
              barSize={10}
            >
              <LabelList
                dataKey="closed"
                position="top"
                style={LabelListStyling}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <CustomLegend />
      </Paper>
    </>
  );
};

export default Chart;
