import React from "react";
import { Box, Pagination, PaginationItem } from "@mui/material";
import { KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const CustomPaginationItem = styled(PaginationItem)(() => ({
  "&.Mui-selected": {
    backgroundColor: "#0cc9e8",
    color: "#fff",
  },
}));

const PaginationComponent = ({ page, totalPages, handleChange }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        mt: 2,
      }}
    >
      <Pagination
        count={totalPages}
        page={page}
        onChange={handleChange}
        siblingCount={0}
        boundaryCount={1}
        shape="rounded"
        color="primary"
        showFirstButton
        showLastButton
        renderItem={(item) => (
          <CustomPaginationItem
            components={{
              first: KeyboardDoubleArrowLeft,
              last: KeyboardDoubleArrowRight,
            }}
            {...item}
          />
        )}
        sx={{
          "& .MuiPaginationItem-root": {
            borderRadius: "50%",
          },
        }}
      />
    </Box>
  );
};

export default PaginationComponent;
