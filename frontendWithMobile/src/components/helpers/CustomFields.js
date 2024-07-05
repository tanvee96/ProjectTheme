import { Button, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";


export const CustomTextField = styled(({ isMobile, ...other }) => <TextField {...other} />)(({ theme, isMobile }) => ({
  "& .MuiInputBase-root": {
    height: isMobile ? 46 : 38, 
    fontSize: isMobile ? 14 : 12,
  },
  "& .MuiFormHelperText-root": {
    marginLeft: 0,
    marginRight: 0,
  },
  margin: theme.spacing(1, 0),
  width: "100%",
}));


export const CustomTypography = styled(({ isMobile, ...other }) => <Typography {...other} />)(({ isMobile }) => ({
  fontSize: isMobile ? 14 : 12,
  lineHeight: isMobile ? 1 : 0.5,
  color: "#959595",
}));

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

export const CustomButton = styled(({ isMobile, ...other }) => <Button {...other} />)(({ isMobile }) => ({
  borderRadius: "20px",
  width: isMobile ? "100%" : "150px",
  fontSize: isMobile ? "14px" : "12px",
  display: "block",
  margin: "0 auto",
  background: "#045096",
  padding: isMobile ? "10px" : "6px",
  textTransform: "none", // Prevent text converted to uppercase
}));

export const CustomActionButton = styled(({ isMobile, ...other }) => <Button {...other} />)(({ isMobile }) => ({
  borderRadius: "40px",
  width: isMobile ? "100%" : "40px",
  padding: isMobile ? "6px" : "2px",
  fontSize: isMobile ? "14px" : "12px",
  textTransform: "none",
  color: '#1767b2',
  border: '1px solid #1767b2',
}));
