import React from "react";
import { Box, FormControl, Select, MenuItem, Typography, Input } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";

const sortFieldStyles = {
  fontSize: "14px",
  width: "150px",
};

const sortLabelStyles = {
  fontSize: "14px",
  color: "#959595",
  paddingRight: "10px",
};

const CustomInput = (props) => <Input {...props} disableUnderline />;

const SortDropdown = ({ sortValue, handleSortChange }) => {
  return (
    <Box display="flex">
      <Typography style={sortLabelStyles}>Sort By :</Typography>
      <FormControl variant="standard" style={sortFieldStyles}>
        <Select
          size="small"
          value={sortValue}
          onChange={handleSortChange}
          input={<CustomInput />}
          IconComponent={KeyboardArrowDown}
          sx={{
            "& .MuiSelect-icon": {
              color: "#000",
              fontSize: "26px",
            },
          }}
        >
          <MenuItem value="priority">Priority</MenuItem>
          <MenuItem value="project_theme_name">Project Name</MenuItem>
          <MenuItem value="reason">Reason</MenuItem>
          <MenuItem value="project_type">Type</MenuItem>
          <MenuItem value="division">Division</MenuItem>
          <MenuItem value="category">Category</MenuItem>
          <MenuItem value="department">Department</MenuItem>
          <MenuItem value="location">Location</MenuItem>
          <MenuItem value="status">Status</MenuItem>
          <MenuItem value="startDate">Start Date</MenuItem>
          <MenuItem value="endDate">End Date</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortDropdown;
