import React, { useEffect, useState } from "react";
import Navbar from "../header/Navbar";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Snackbar, styled, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { editProjectStatus, getProjectList } from "../../store/actions";
import { ActionMsg, HandleCloseSnackbar, useMessageHandler } from "../helpers/ResponseMsg";
import SearchBar from "../helpers/SearchBar";
import SortDropdown from "../helpers/SortDropdown";
import PaginationComponent from "../helpers/PaginationComponent";
import { CustomActionButton, CustomTypography } from "../helpers/CustomFields";
import { dateConversion } from "../helpers/dateConversion";

const Card = styled(Paper)(({ theme }) => ({
  display: "grid",
  width: "100%",
  position: "relative",
  height: "75vh",
  margin: "80px 0px 0px 16px",
  width: "calc(100% - 34px)",
  borderRadius: "12px",
  boxShadow: "0px 1px 13px rgba(222, 233, 241, 0.08)",
}));

const searchContainerStyles = {
  display: "flex",
  justifyContent: "space-between",
  margin: "16px",
};

const tableContainerStyles = {
  maxHeight: "65vh",
  overflow: "auto",
  boxShadow: "none",
};

const CardMobile = styled(Paper)(({  }) => ({ 
  width: "100%",
  height: "50%",
  margin: "0px 0px 20px 0px",
  padding: '15px',
  borderRadius: "12px",
  boxShadow: "0px 1px 13px rgba(222, 233, 241, 0.08)",
}));

const searchContainerStylesMobile = {
  display: "flex",
  justifyContent: "space-between",
  margin: "55px 15px 15px 15px",
};

const projectTitle = {
  fontSize: 14, 
  fontWeight: 'bold' 
}

const circle = {
  height: 7, 
  width: 7, 
  backgroundColor: '#bbb',
  borderRadius: '50%',
  margin: '3px 6px 3px 12px',
}

const ProjectList = () => {
  const dispatch = useDispatch();
  const respMsgState = useSelector((state) => state.project.message);
  const total_records = useSelector((state) => state.project.totalRecords);
  const rows = useSelector((state) => state.project.project_theme);

  const [successMessage, setSuccessMessage] = useState(null);
  const [sortValue, setSortValue] = useState("priority");
  const [page, setPage] = useState(1);
  const [searchKey, setSearchKey] = useState("");

  const recordsPerPage = 10;

  const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));

  const handleSortChange = (event) => {
    setSortValue(event.target.value);
    fetchData(event.target.value, searchKey);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleChangeStatus = (updateStatus, id) => {
    dispatch(editProjectStatus({ status: updateStatus, _id: id }));
  };

  const fetchData = (sortValue, searchKey) => {
    dispatch(getProjectList({ page, sortField: sortValue, searchKey }));
  };

  useEffect(() => {
    fetchData(sortValue, searchKey);
  }, [page, sortValue, searchKey]);

  const { shouldShowMsg, responseMessage } = useMessageHandler(
    "/project-list",
    fetchData,
    null,
    setSuccessMessage,
    respMsgState
  );

  useEffect(() => {}, [shouldShowMsg, responseMessage]);

  const totalPages = Math.ceil(total_records / recordsPerPage);

  return (
    <>
      {!isMobile &&
        <Navbar title="Project Listing">
        <Card>
          <Box>
            <Box style={searchContainerStyles}>
              <SearchBar onSearchChange={(e) => setSearchKey(e.target.value)} />
              <SortDropdown sortValue={sortValue} handleSortChange={handleSortChange} />
            </Box>
            <TableContainer component={Paper} style={tableContainerStyles}>
              <Table size="small">
                <TableHead className="table-head">
                  <TableRow>
                    <TableCell className="table-head-cell">Project Name</TableCell>
                    <TableCell className="table-head-cell">Reason</TableCell>
                    <TableCell className="table-head-cell">Type</TableCell>
                    <TableCell className="table-head-cell">Division</TableCell>
                    <TableCell className="table-head-cell">Category</TableCell>
                    <TableCell className="table-head-cell">Priority</TableCell>
                    <TableCell className="table-head-cell">Dept.</TableCell>
                    <TableCell className="table-head-cell">Location</TableCell>
                    <TableCell className="table-head-cell">Status</TableCell>
                    <TableCell className="table-head-cell"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows && rows.map((row) => (
                    <TableRow key={row.project_theme_name}>
                      <TableCell align="left">
                        <Box>
                          <strong>{row.project_theme_name}</strong>
                          <Typography variant="body2" color="textSecondary">
                            {dateConversion(row.startDate)} to {dateConversion(row.endDate)}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="left">{row.reason}</TableCell>
                      <TableCell align="left">{row.project_type}</TableCell>
                      <TableCell align="left">{row.division}</TableCell>
                      <TableCell align="left">{row.category}</TableCell>
                      <TableCell align="left">{row.priority}</TableCell>
                      <TableCell align="left">{row.department}</TableCell>
                      <TableCell align="left">{row.location}</TableCell>
                      <TableCell align="left"><strong>{row.status}</strong></TableCell>
                      <TableCell align="center">
                        <Box display="flex">
                          <CustomActionButton
                            variant="contained"
                            size="small"
                            style={{ backgroundColor: "#025aab", color: "#fff" }}
                            onClick={() => handleChangeStatus("Running", row._id)}
                          >
                            Start
                          </CustomActionButton>
                          <CustomActionButton
                            variant="outlined"
                            size="small"
                            sx={{ ml: 1 }}
                            onClick={() => handleChangeStatus("Closed", row._id)}
                          >
                            Close
                          </CustomActionButton>
                          <CustomActionButton
                            variant="outlined"
                            size="small"
                            sx={{ ml: 1 }}
                            onClick={() => handleChangeStatus("Cancelled", row._id)}
                          >
                            Cancel
                          </CustomActionButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Card>
        <PaginationComponent page={page} totalPages={totalPages} handleChange={handlePageChange} />
      </Navbar>
      }
      {isMobile &&
      <>
      <Navbar title="Project Listing" />
      <Box display="flex" height="100%" >
        <Box overflow="auto" sx={{mb: 5}}>
          <Box style={searchContainerStylesMobile}>
            <SearchBar onSearchChange={(e) => setSearchKey(e.target.value)} />
            <SortDropdown sortValue={sortValue} handleSortChange={handleSortChange} />
          </Box>
          {rows.map((row) => (
            <CardMobile>
              <Box sx={{display: 'flex', justifyContent: 'space-between', pb: 0.8}}>
                <Typography style={projectTitle} isMobile={isMobile}>{row.project_theme_name}</Typography>
                <Typography style={projectTitle} isMobile={isMobile}>{row.status}</Typography>
              </Box>
              <CustomTypography isMobile={isMobile}>{dateConversion(row.startDate)} to {dateConversion(row.endDate)}</CustomTypography>
              <Box sx={{display: 'flex',  pb: 1.2, pt:3}}>
                <CustomTypography isMobile={isMobile}>Reason: </CustomTypography>
                <CustomTypography isMobile={isMobile} sx={{color: '#2b2a2a',  pl: 0.5}}>{row.reason}</CustomTypography>
              </Box>
              <Box sx={{display: 'flex',  pb: 1.2}}>
                <CustomTypography isMobile={isMobile}>Type: </CustomTypography>
                <CustomTypography isMobile={isMobile} sx={{color: '#2b2a2a',  pl: 0.5}}>{row.project_type}</CustomTypography>
                <Typography style={circle} />
                <CustomTypography isMobile={isMobile}>Category: </CustomTypography>
                <CustomTypography isMobile={isMobile} sx={{color: '#2b2a2a',  pl: 0.5}}>{row.category}</CustomTypography>
              </Box>
              <Box sx={{display: 'flex',  pb: 1.2}}>
                <CustomTypography isMobile={isMobile}>Div: </CustomTypography>
                <CustomTypography isMobile={isMobile} sx={{color: '#2b2a2a',  pl: 0.5}}>{row.division}</CustomTypography>
                <Typography style={circle} />
                <CustomTypography isMobile={isMobile}>Dept: </CustomTypography>
                <CustomTypography isMobile={isMobile} sx={{color: '#2b2a2a',  pl: 0.5}}>{row.department}</CustomTypography>
              </Box>
              <Box sx={{display: 'flex',  pb: 1.2}}>
                <CustomTypography isMobile={isMobile}>Location: </CustomTypography>
                <CustomTypography isMobile={isMobile} sx={{color: '#2b2a2a',  pl: 0.5}}>{row.location}</CustomTypography>
              </Box>
              <Box sx={{display: 'flex',  pb: 2,}}>
                <CustomTypography isMobile={isMobile}>Priority: </CustomTypography>
                <CustomTypography isMobile={isMobile} sx={{color: '#2b2a2a',  pl: 0.5}}>{row.priority}</CustomTypography>
              </Box>
              <Box display="flex">
                <CustomActionButton
                  variant="contained"
                  size="small"
                  style={{ backgroundColor: "#025aab", color: "#fff" }}
                  onClick={() => handleChangeStatus("Running", row._id)}
                  isMobile={isMobile}
                >
                  Start
                </CustomActionButton>
                <CustomActionButton
                  variant="outlined"
                  size="small"
                  sx={{ ml: 1 }}
                  onClick={() => handleChangeStatus("Closed", row._id)}
                  isMobile={isMobile}
                >
                  Close
                </CustomActionButton>
                <CustomActionButton
                  variant="outlined"
                  size="small"
                  sx={{ ml: 1 }}
                  onClick={() => handleChangeStatus("Cancelled", row._id)}
                  isMobile={isMobile}
                >
                  Cancel
                </CustomActionButton>
              </Box>
            </CardMobile>
          ))}
           <PaginationComponent page={page} totalPages={totalPages} 
           handleChange={handlePageChange} 
           />
        </Box>
       </Box>
       </>
      }

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={Boolean(successMessage)}
        autoHideDuration={2000}
        onClose={(event, reason) => HandleCloseSnackbar(event, reason, setSuccessMessage)}
        message={successMessage}
        action={ActionMsg(setSuccessMessage)}
      />
   </>
  );
};

export default ProjectList;
