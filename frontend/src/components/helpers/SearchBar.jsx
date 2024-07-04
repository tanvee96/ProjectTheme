import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";

const SearchBar = ({ onSearchChange }) => {
  return (
    <TextField
      size="small"
      variant="standard"
      placeholder="Search"
      onChange={onSearchChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
