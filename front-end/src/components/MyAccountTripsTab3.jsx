import React, { useState, useEffect } from "react";
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
import EnquiryDetailsReceived from "./EnquiryDetailsReceived";

export default function TripsTab3() {
  const { currentUser } = useUserContext();
  const { allTrips } = useTripData();
  const { enquiries } = useEnquiryData();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [enquiryDialogOpen, setEnquiryDialogOpen] = useState(false);

  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [receivedEnquiriesList, setReceivedEnquiriesList] = useState([]);

  const handleEnquiryDialogOpen = (trip, enquiry) => {
    setSelectedEnquiry(enquiry);
    setSelectedTrip(trip);
    setEnquiryDialogOpen(true);
  };

  const handleEnquiryDialogClose = () => {
    setSelectedEnquiry(null);
    setEnquiryDialogOpen(false);
  };

  const handleEnquiryStatus = (editedEnquiry) => {
    console.log("ee:", editedEnquiry);
    setReceivedEnquiriesList(receivedEnquiriesList.map((enquiry) => (enquiry.id === editedEnquiry.id ? editedEnquiry : enquiry)));
  };

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };

  const columns = [
    { id: "trip", label: "Trip", minWidth: 140 },
    { id: "dates", label: "Dates", minWidth: 150 },
    { id: "enquiry", label: "Enquiry", minWidth: 250 },
    { id: "enquiryDate", label: "Date Enquired", minWidth: 60 },
    { id: "seeMore", label: "", minWidth: 80 },
    { id: "enquiryStatus", label: "Status", minWidth: 30 },
  ];

  useEffect(() => {
    const userTrips = allTrips.filter((trip) => trip.userId === currentUser.id);
    const receivedEnquiries = enquiries.filter((enquiry) => userTrips.some((trip) => trip.id === enquiry.tripId));
    setReceivedEnquiriesList(receivedEnquiries);
  }, [enquiries, allTrips, currentUser]);

  const rows = receivedEnquiriesList.map((enquiry) => {
    const trip = allTrips.find((trip) => trip.id === enquiry.tripId);
    // console.log("trip", trip);

    let statusIcon;
    if (enquiry.accepted === null) {
      statusIcon = (
        <Box sx={{ textAlign: "center" }}>
          <Icon icon="eos-icons:three-dots-loading" width="16.4" />
        </Box>
      );
    } else if (enquiry.accepted === true) {
      statusIcon = (
        <Box sx={{ textAlign: "center" }}>
          <Icon icon="subway:tick" color="green" width="15" />
        </Box>
      );
    } else if (enquiry.accepted === false) {
      statusIcon = (
        <Box sx={{ textAlign: "center" }}>
          <Icon icon="foundation:x" color="red" width="15" />
        </Box>
      );
    } else {
      statusIcon = null;
    }

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
      seeMore: <button onClick={() => handleEnquiryDialogOpen(trip, enquiry)}>See More</button>,
      enquiryDate: formatDate(enquiry.createdAt),
      enquiryStatus: statusIcon,
    };
  });

  return (
    <Box>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h6" className="section-subhead" sx={{ fontSize: "0.9em" }}>
          ENQUIRIES
        </Typography>
        <Typography variant="h4" className="section-title" sx={{ fontSize: "1.5em", fontWeight: 800 }}>
          Enquiries Received:
        </Typography>
      </Box>

      <Box sx={{ flexGrow: 1, p: "0.5em" }}>
        {receivedEnquiriesList.length > 0 ? (
          <div>
            <TableContainer sx={{ minHeight: 200 }}>
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
              count={receivedEnquiriesList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        ) : (
          <Typography variant="body1" sx={{ padding: "0.5em 1em 2em 0.5em" }}>
            You haven't received any enquiries on your trips.
          </Typography>
        )}
      </Box>

      <EnquiryDetailsReceived open={enquiryDialogOpen} close={handleEnquiryDialogClose} enquiry={selectedEnquiry} trip={selectedTrip} setUpdateList={handleEnquiryStatus} currentUser={currentUser} />
    </Box>
  );
}
