import React from "react";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <IconButton edge="start" color="inherit" onClick={handleBackClick}>
      <ArrowBackIcon style={{fontSize: 18, paddingBottom: 2, marginRight: 4}} />
    </IconButton>
  );
};

export default BackButton;
