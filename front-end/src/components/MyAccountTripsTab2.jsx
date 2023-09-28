import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useUserContext } from "../context/UserContext";
import useTripData from "../hooks/useTripData";
import formatDate from "./FormatDate";
import useEnquiryData from "../hooks/useEnquirydata";
import { Link } from "react-router-dom";

export default function TripsTab1() {
  const { currentUser } = useUserContext();
  const { allTrips } = useTripData();
  const { enquiries } = useEnquiryData();

  const useTrips = allTrips.filter((trip) => trip.userId === currentUser.id);
  const useEnquiries = enquiries.filter((enquiry) => enquiry.userId === currentUser.id);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const columns = [
    { id: "from", label: "From", minWidth: 10 },
    { id: "to", label: "To", minWidth: 10 },
    { id: "dates", label: "Dates", minWidth: 10 },
    { id: "enquiry", label: "Enquiry", minWidth: 10 },
    { id: "editEnquiry", label: "Edit", minWidth: 10 },
    { id: "deleteEnquiry", label: "Delete", minWidth: 10 },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h6" className="section-subhead" sx={{ fontSize: "1em" }}>
          YOUR TRIPS
        </Typography>
        <Typography variant="h4" className="section-title" sx={{ fontSize: "1.7em", fontWeight: 800 }}>
          Posted trips:
        </Typography>
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <TableContainer sx={{ minHeight: 150 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align="left" style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell key={column.id} align="left">
                      {row[column.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        {rows.length === 0 && (
          <Typography variant="body1" sx={{ padding: "0.5em 1em 2em 0.5em" }}>
            You haven't enquired on any trips yet :(
          </Typography>
        )}
      </Box>
    </Box>
  );
}
