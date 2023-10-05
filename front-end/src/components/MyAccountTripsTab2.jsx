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
import EditEnquiryDialog from "./EditEnquiryDialog";
import DeleteEnquiryDialog from "./DeleteEnquiryDialog";
import EnquiryDetailsSent from "./EnquiryDetailsSent";

export default function TripsTab2() {
  const { currentUser } = useUserContext();
  const { allTrips } = useTripData();
  const { enquiries } = useEnquiryData();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [selectedTrip, setSelectedTrip] = useState(null);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [userEnquiriesList, setUserEnquiriesList] = useState([]);

  const [seeMoreDialogOpen, setSeeMoreDialogOpen] = useState(false);

  //functions to control open and close of edit dialog
  const handleEditDialogOpen = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setEditDialogOpen(true);
  };
  const handleEditDialogClose = () => {
    setSelectedEnquiry(null);
    setEditDialogOpen(false);
  };

  //functions to control open and close of trip dialog
  const handleDeleteDialogOpen = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setDeleteDialogOpen(true);
  };
  const handleDeleteDialogClose = () => {
    setSelectedEnquiry(null);
    setDeleteDialogOpen(false);
  };

  //handle to control open and close of seemore dialog
  const handleSeeMoreDialogOpen = (trip, enquiry) => {
    setSelectedEnquiry(enquiry);
    setSelectedTrip(trip);
    setSeeMoreDialogOpen(true);
  };
  const handleSeeMoreDialogClose = () => {
    setSelectedEnquiry(null);
    setSelectedTrip(null);
    setSeeMoreDialogOpen(false);
  };

  //handle to re-render userEnquiriesList when a enquiry is edited
  const handleEditEnquiry = (editedEnquiry) => {
    setUserEnquiriesList(userEnquiriesList.map((enquiry) => (enquiry.id === editedEnquiry.id ? editedEnquiry : enquiry)));
  };
  //handle to re-render userEnquiriesList when a enquiry is deleted
  const handleDeleteEnquiry = (deletedEnquiry) => {
    setUserEnquiriesList((prevEnquiriesList) => prevEnquiriesList.filter((enquiry) => enquiry.id !== deletedEnquiry.id));
  };

  //handles for pagination
  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };

  //defining colums for table
  const columns = [
    { id: "trip", label: "Trip", minWidth: 150 },
    { id: "dates", label: "Dates", minWidth: 150 },
    { id: "enquiry", label: "Enquiry", minWidth: 100 },
    { id: "enquiryDate", label: "Date Enquired", minWidth: 70 },
    { id: "seeMore", label: "", minWidth: 80 },
    { id: "editEnquiry", label: "", minWidth: 20 },
    { id: "deleteEnquiry", label: "", minWidth: 20 },
    { id: "status", label: "Status", minWidth: 20 },
  ];

  //filter and update userEnquiriesList
  useEffect(() => {
    //filter enquiries for currentUser and set it into list
    const userEnquiries = enquiries.filter((enquiry) => enquiry.userId === currentUser.id);
    setUserEnquiriesList(userEnquiries);
  }, [enquiries, currentUser]);

  //defining row content for table
  const rows = userEnquiriesList.map((enquiry) => {
    //finding the corresponding trip for selected enquiry
    const trip = allTrips.find((trip) => trip.id === enquiry.tripId);

    //setting statusIcon depending on status state
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
            maxWidth: 100,
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {enquiry.comments}
        </Typography>
      ),
      enquiryDate: formatDate(enquiry.updatedAt),
      seeMore: <button onClick={() => handleSeeMoreDialogOpen(trip, enquiry)}>See More</button>,
      status: statusIcon,
      editEnquiry: <Icon icon="material-symbols:edit-outline" onClick={() => handleEditDialogOpen(enquiry)} />,
      deleteEnquiry: <Icon color="#c1121f" icon="ph:x-fill" onClick={() => handleDeleteDialogOpen(enquiry)} />,
    };
  });

  return (
    <Box>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h6" className="section-subhead" sx={{ fontSize: "0.9em" }}>
          ENQUIRIES
        </Typography>
        <Typography variant="h4" className="section-title" sx={{ fontSize: "1.5em", fontWeight: 800 }}>
          Enquiries Sent:
        </Typography>
      </Box>

      <Box sx={{ flexGrow: 1, p: "0.5em" }}>
        {rows.length > 0 ? (
          <Box>
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
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        ) : (
          <Typography variant="body1" sx={{ padding: "0.5em 1em 2em 0.5em" }}>
            You haven't enquired on any trips
          </Typography>
        )}
      </Box>

      <EditEnquiryDialog open={editDialogOpen} close={handleEditDialogClose} enquiry={selectedEnquiry} trip={selectedTrip} setUpdateList={handleEditEnquiry} />
      <DeleteEnquiryDialog open={deleteDialogOpen} close={handleDeleteDialogClose} enquiry={selectedEnquiry} trip={selectedTrip} setUpdateList={handleDeleteEnquiry} />
      <EnquiryDetailsSent open={seeMoreDialogOpen} close={handleSeeMoreDialogClose} enquiry={selectedEnquiry} trip={selectedTrip} />
    </Box>
  );
}
