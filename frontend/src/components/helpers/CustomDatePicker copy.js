import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { styled } from "@mui/system";
import { CustomTextField } from "./CustomFields";
import { InputAdornment } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const DatePickerWrapper = styled("div")({
  "& .react-datepicker__input-container": {
    display: "flex",
    alignItems: "center",
  },
  "& .react-datepicker-wrapper": {
    width: "100%",
  },
  "& .react-datepicker__input-container input": {
    width: "100%",
  },
//   custom styling
  "& .react-datepicker__day--selected, & .react-datepicker__day--keyboard-selected": {
    backgroundColor: "#1adcd8 !important", 
    color: "#fff !important", 
    borderRadius: '50% !important', 
    // width: '20px !important',
    // height: '20px !important',
    // lineHeight: '38px'
  },
  "& .react-datepicker__day--selected:hover, & .react-datepicker__day--keyboard-selected:hover": {
    backgroundColor: "#06aca8 !important", 
  },
  '& .react-datepicker__day--today': {
    border: '1px solid #1adcd8 !important',  
    color: '#000 !important',      
    borderRadius: '50% !important',      
    // width: '38px !important',
    // height: '38px !important',
    // padding: '6px !important',
  },
  '& .react-datepicker__day--outside-month': {
    backgroundColor: '#edf2f5 !important',  
    color: '#cbd2d7 !important',       
    borderRadius: '6px !important',
    // width: '38px !important',
    // height: '38px !important',
    // padding: '6px !important',
  },
  '& .react-datepicker__header': {
    backgroundColor: '#fff !important',
  },
  '& .react-datepicker__week': {
    // padding: '4px !important',
  },
  '& .react-datepicker__day, .react-datepicker__month-text, .react-datepicker__quarter-text, .react-datepicker__year-text' : {
    // margin: '10px !important',
  },
  '& .react-datepicker': {
    border: 'none !important',
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.16)',
    marginBottom: '-12px',
    // zIndex: '10 !important',
  },
  '& .react-datepicker-popper[data-placement^=top] .react-datepicker__triangle' : {
    display: 'none !important',
  },
  '& .react-datepicker__day-name, .react-datepicker__day, .react-datepicker__time-name':{
    margin: '4px'
  },
});

const CustomDatePicker = ({ selectedDate, handleDateChange }) => {
  return (
    <DatePickerWrapper>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => handleDateChange(date)}
        customInput={
          <CustomTextField
            variant="outlined"
            sx={{ pr: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <CalendarMonthIcon />
                </InputAdornment>
              ),
            }}
          />
        }
        dateFormat="dd MMMM, yyyy"
      />
    </DatePickerWrapper>
  );
};

export default CustomDatePicker;
