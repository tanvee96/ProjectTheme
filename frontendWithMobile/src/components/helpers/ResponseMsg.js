import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

// Response Message Set
export const useMessageHandler = (
  urlPath,
  fetchDataCallback,
  navigate,
  setSuccessMessage,
  responseMessage
) => {
  const [shouldShowMsg, setShouldShowMsg] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (responseMessage) {
      setShouldShowMsg(true);
    }
  }, [responseMessage, dispatch]);

  useEffect(() => {
    if (shouldShowMsg) {
      if (responseMessage !== null) {
        if (navigate === null) {
          if (responseMessage !== "Record added successfully!") {
            setSuccessMessage(responseMessage);
          }
          setShouldShowMsg(true);
          dispatch({ type: "RESET_MESSAGE" });

          fetchDataCallback();
        } else {
          //   setShouldShowMsg(true);
          setSuccessMessage(responseMessage);
          setTimeout(() => {
            setSuccessMessage(null);
            navigate(urlPath);
          }, 2000);
        }
      }
    }
  }, [shouldShowMsg, responseMessage, fetchDataCallback]);

  return {
    shouldShowMsg,
    responseMessage,
  };
};

export const HandleCloseSnackbar = (event, reason, setSuccessMessage) => {
  if (reason === "clickaway") {
    return;
  }
  setSuccessMessage(false);
};

// Snackbar Action Close
export const ActionMsg = (setSuccessMessage) => {
  return (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={(event, reason) =>
          HandleCloseSnackbar(event, reason, setSuccessMessage)
        }
      >
        <CloseIcon fontSize="small" style={{ color: "#fff" }} />
      </IconButton>
    </React.Fragment>
  );
};
