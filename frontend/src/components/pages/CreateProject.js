import React, { useEffect, useState } from "react";
import Navbar from "../header/Navbar";
import {
  Box,
  Grid,
  MenuItem,
  Paper,
  Snackbar,
  Typography,
  styled,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import {
  CustomButton,
  CustomMultilineTextField,
  CustomTextField,
  CustomTypography,
} from "../helpers/CustomFields";
import CustomDatePicker from "../helpers/CustomDatePicker";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProject } from "../../store/actions";
import {
  ActionMsg,
  HandleCloseSnackbar,
  useMessageHandler,
} from "../helpers/ResponseMsg";

const Card = styled(Paper)({
  display: "grid",
  width: "calc(100% - 34px)",
  height: "80vh",
  margin: "80px 0 0 16px",
  borderRadius: "12px",
  boxShadow: "0px 1px 13px rgba(222, 233, 241, 0.08)",
  overflow: "auto",
});

const fields = [
  { name: "reason", label: "Reason", options: ["Business", "Dealership", "Transport"] },
  { name: "project_type", label: "Type", options: ["Internal", "External", "Vendor"] },
  { name: "division", label: "Division", options: ["Compressor", "Filters", "Pumps", "Glass", "Water Heater"] },
  { name: "category", label: "Category", options: ["Quality A", "Quality B", "Quality C", "Quality D"] },
  { name: "priority", label: "Priority", options: ["High", "Medium", "Low"] },
  { name: "department", label: "Department", options: ["Strategy", "Finance", "Quality", "Maintenance", "Stores"] },
];

const CreateProject = () => {
  const [formData, setFormData] = useState({
    project_theme_name: "",
    reason: "Business",
    project_type: "Internal",
    division: "Filters",
    category: "Quality A",
    priority: "High",
    department: "Strategy",
    location: "Pune",
    status: "Registered",
  });
  const [errors, setErrors] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const respMsgState = useSelector((state) => state.project.message);

  const { shouldShowMsg, responseMessage } = useMessageHandler(
    "/project-list",
    null,
    navigate,
    setSuccessMessage,
    respMsgState
  );

  useEffect(() => {}, [shouldShowMsg, responseMessage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!formData.project_theme_name) validationErrors.project_theme_name = "Project theme required";
    if (!startDate) validationErrors.startDate = "Start date required";
    if (!endDate) validationErrors.endDate = "End date required";

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
    } else {
      dispatch(addProject({ ...formData, startDate, endDate }));
    }
  };

  return (
    <Navbar title="Create Project">
      <Card>
        <Box m={2}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={7}>
                <CustomMultilineTextField
                  placeholder="Enter Project Theme"
                  multiline
                  rows={2}
                  name="project_theme_name"
                  value={formData.project_theme_name}
                  onChange={handleChange}
                  error={Boolean(errors.project_theme_name)}
                  helperText={errors.project_theme_name}
                  sx={{ pr: 2 }}
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <CustomButton type="submit" variant="contained" sx={{ float: "right" }}>
                  Save Project
                </CustomButton>
              </Grid>
            </Grid>
            <Grid container spacing={2} mt={1}>
              {fields.map((field) => (
                <Grid item xs={12} md={3.5} key={field.name}>
                  <CustomTypography>{field.label}</CustomTypography>
                  <CustomTextField
                    select
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    sx={{ pr: 2 }}
                  >
                    {field.options.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                </Grid>
              ))}
              <Grid item xs={12} md={3.5}>
                <CustomTypography>Start Date as per Project Plan</CustomTypography>
                <CustomDatePicker
                  selectedDate={startDate}
                  handleDateChange={setStartDate}
                  error={Boolean(errors.startDate)}
                  helperText={errors.startDate}
                  placeholder="D Month, Yr"
                />
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    name="startDate"
                    value={startDate}
                    onChange={(date) => setStartDate(date)}
                    inputFormat="DD MMMM, YYYY"
                    showDaysOutsideCurrentMonth
                    renderInput={(params) => (
                      <CustomTextField
                        {...params}
                        size="small"
                        fullWidth
                        error={Boolean(errors.startDate)}
                        helperText={errors.startDate}
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <>
                              {params.InputProps.endAdornment}
                              {errors.startDate && (
                                <div
                                  style={{
                                    borderColor: "red",
                                    borderWidth: "1px",
                                    borderStyle: "solid",
                                  }}
                                />
                              )}
                            </>
                          ),
                        }}
                        FormHelperTextProps={{
                          style: { color: "red" },
                        }}
                        sx={{ pr: 2 }}
                      />
                    )}
                  />
                </LocalizationProvider> */}
              </Grid>
              <Grid item xs={12} md={3.5}>
                <CustomTypography>End Date as per Project Plan</CustomTypography>
                
                <CustomDatePicker
                  selectedDate={endDate}
                  handleDateChange={setEndDate}
                  error={Boolean(errors.endDate)}
                  helperText={errors.endDate}
                  placeholder="D Month, Yr"
                />
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    name="endDate"
                    value={endDate}
                    onChange={(date) => setEndDate(date)}
                    inputFormat="DD MMMM, YYYY"
                    showDaysOutsideCurrentMonth
                    renderInput={(params) => (
                      <CustomTextField
                        {...params}
                        size="small"
                        fullWidth
                        error={Boolean(errors.endDate)}
                        helperText={errors.endDate}
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <>
                              {params.InputProps.endAdornment}
                              {errors.endDate && (
                                <div
                                  style={{
                                    borderColor: "red",
                                    borderWidth: "1px",
                                    borderStyle: "solid",
                                  }}
                                />
                              )}
                            </>
                          ),
                        }}
                        FormHelperTextProps={{
                          style: { color: "red" },
                        }}
                        sx={{ pr: 2 }}
                      />
                    )}
                  />
                </LocalizationProvider> */}
              </Grid>
              <Grid item xs={12} md={3.5}>
                <CustomTypography>Location</CustomTypography>
                <CustomTextField
                  select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  sx={{ pr: 2 }}
                >
                  {["Pune", "Mumbai", "Delhi"].map((city) => (
                    <MenuItem key={city} value={city}>
                      {city}
                    </MenuItem>
                  ))}
                </CustomTextField>
                <Box display="flex" pt={2}>
                  <CustomTypography>Status: </CustomTypography>
                  <Typography sx={{ fontSize: 14, fontWeight: "bold", pl: 1 }}>Registered</Typography>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Card>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={Boolean(successMessage)}
        autoHideDuration={2000}
        onClose={(event, reason) =>
          HandleCloseSnackbar(event, reason, setSuccessMessage)
        }
        message={successMessage}
        action={ActionMsg(setSuccessMessage)}
      />
    </Navbar>
  );
};

export default CreateProject;
