import { Button, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";

export const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    height: 38,
    fontSize: 12,
  },
  "& .MuiFormHelperText-root": {
    marginLeft: 0,
    marginRight: 0,
  },
  margin: theme.spacing(1, 0),
  width: "100%",
}));


export const CustomTypography = styled(Typography)({
  fontSize: 12,
  lineHeight: 0.5,
  color: "#959595",
});

export const CustomMultilineTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    height: 60,
    fontSize: 12,
    // border: '1px solid #9ca4aa'
  },
  "& .MuiFormHelperText-root": {
    marginLeft: 0,
    marginRight: 0,
  },
  margin: theme.spacing(1, 0),
  width: "100%",
}));

export const CustomButton = styled(Button)({
  borderRadius: "20px",
  width: "150px",
  fontSize: 12,
  display: "block",
  margin: "0 auto",
  background: "#045096",
  textTransform: "none", // Prevent text from being converted to uppercase
});

export const CustomActionButton = styled(Button)({
  borderRadius: "40px",
  width: "40px",
  padding: 2,
  fontSize: "12px",
  textTransform: "none",
  color: '#1767b2',
  border: '1px solid #1767b2',
});
