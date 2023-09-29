import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useUserContext } from "../context/UserContext";
import useTripData from "../hooks/useTripData";
import useEnquiryData from "../hooks/useEnquiryData";
import formatDate from "./FormatDate";
import { Icon } from "@iconify/react";
import { Button } from "@mui/material";
import EnquiryDetailsDialog from "./EnquiryDetailDialog";

export default function TripsTab3() {
  const { currentUser } = useUserContext();
  const { allTrips } = useTripData();
  const { enquiries } = useEnquiryData();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [enquiryDialogOpen, setEnquiryDialogOpen] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  const handleEnquiryDialogOpen = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setEnquiryDialogOpen(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const userTrips = allTrips.filter((trip) => trip.userId === currentUser.id);
  const userEnquiries = enquiries.filter((enquiry) => userTrips.some((trip) => trip.id === enquiry.tripId));

  const columns = [
    { id: "trip", label: "Trip", minWidth: 70 },
    { id: "dates", label: "Dates", minWidth: 70 },
    { id: "enquiry", label: "Enquiry", minWidth: 70 },
    { id: "enquiryDate", label: "Date Enquired", minWidth: 60 },
    { id: "seeMore", label: "", minWidth: 80 },
    { id: "enquiryStatus", label: "Status", minWidth: 30 },
  ];

  const rows = userEnquiries.map((enquiry) => {
    let statusIcon;
    if (enquiry.accepted === null) {
      statusIcon = <Icon icon="fluent:question-24-filled" width="20" />;
    } else if (enquiry.accepted === true) {
      statusIcon = <Icon icon="subway:tick" color="green" width="20" />;
    } else if (enquiry.accepted === false) {
      statusIcon = <Icon icon="foundation:x" color="red" width="20" />;
    } else {
      statusIcon = null;
    }

    const trip = userTrips.find((trip) => trip.id === enquiry.tripId);
    return {
      trip: `${trip.cityFrom} - ${trip.cityTo}`,
      dates: `${formatDate(trip.departureDate)} - ${formatDate(trip.arrivalDate)}`,
      enquiry: (
        <Typography
          sx={{
            fontSize: "0.875rem",
            maxWidth: 300,
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {" "}
          {enquiry.comments}{" "}
        </Typography>
      ),
      seeMore: <button onClick={() => handleEnquiryDialogOpen(enquiry)}>See More</button>,
      enquiryDate: formatDate(enquiry.createdAt),
      enquiryStatus: statusIcon,
    };
  });

  return (
    <Box>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h6" className="section-subhead" sx={{ fontSize: "1em" }}>
          ENQUIRES
        </Typography>
        <Typography variant="h4" className="section-title" sx={{ fontSize: "1.7em", fontWeight: 800 }}>
          Enquiries Received:
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
              {userEnquiries.length === 0 && (
                <TableCell variant="body1" sx={{ padding: "0.5em 1em 2em 0.5em" }}>
                  You haven't received any enquiries yet :(
                </TableCell>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={userEnquiries.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>

      <EnquiryDetailsDialog open={enquiryDialogOpen} onClose={() => setEnquiryDialogOpen(false)} selectedEnquiry={selectedEnquiry} />
    </Box>
  );
}
