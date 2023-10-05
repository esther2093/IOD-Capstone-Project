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
import FormatDate from "./FormatDate";
import { Icon } from "@iconify/react";
import EditTripDialog from "./EditTripDialog";
import DeleteTripDialog from "./DeleteTripDialog";
import SeeMoreTripDialog from "./SeeMoreTripDialog";

export default function TripsTab1() {
  const { currentUser } = useUserContext();
  const { allTrips } = useTripData();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [seeMoreDialogOpen, setSeeMoreDialogOpen] = useState(false);

  const [selectedTrip, setSelectedTrip] = useState(null);
  const [userTripsList, setUserTripsList] = useState([]);

  //functions to control open and close of edit dialog
  const handleEditDialogOpen = (trip) => {
    setSelectedTrip(trip);
    setEditDialogOpen(true);
  };
  const handleEditDialogClose = () => {
    setSelectedTrip(null);
    setEditDialogOpen(false);
  };

  //functions to control open and close of trip dialog
  const handleDeleteDialogOpen = (trip) => {
    setSelectedTrip(trip);
    setDeleteDialogOpen(true);
  };
  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setSelectedTrip(null);
  };

  //handle to control open and close of seemore dialog
  const handleSeeMoreDialogOpen = (trip) => {
    setSelectedTrip(trip);
    setSeeMoreDialogOpen(true);
  };
  const handleSeeMoreDialogClose = () => {
    setSelectedTrip(null);
    setSeeMoreDialogOpen(false);
  };

  //handle to re-render userTripsList when a trip is edited
  const handleEditTrip = (editedTrip) => {
    setUserTripsList(userTripsList.map((trip) => (trip.id === editedTrip.id ? editedTrip : trip)));
  };
  //handle to re-render userTripsList when a trip is deleted
  const handleDeleteTrip = (deletedTrip) => {
    setUserTripsList((prevTripsList) => prevTripsList.filter((trip) => trip.id !== deletedTrip.id));
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
    { id: "price", label: "Price", minWidth: 50 },
    { id: "comments", label: "Comments", minWidth: 40 },
    { id: "seeMore", label: "", minWidth: 80 },
    { id: "editTrip", label: "", minWidth: 30 },
    { id: "deleteTrip", label: "", minWidth: 20 },
  ];

  //filter and update userTripsList
  useEffect(() => {
    //filter trips for currentUser and set it into list
    const userTrips = allTrips.filter((trip) => trip.userId === currentUser.id);
    setUserTripsList(userTrips);
  }, [allTrips, currentUser]);

  //defining row content for table
  const rows = userTripsList.map((trip) => ({
    trip: ` ${trip.cityFrom} - ${trip.cityTo}`,
    dates: `${FormatDate(trip.departureDate)} - ${FormatDate(trip.arrivalDate)}`,
    price: `$ ${trip.startingPrice}`,
    seeMore: <button onClick={() => handleSeeMoreDialogOpen(trip)}>See More</button>,
    editTrip: <Icon icon="material-symbols:edit-outline" onClick={() => handleEditDialogOpen(trip)} />,
    deleteTrip: <Icon color="#c1121f" icon="ph:x-fill" onClick={() => handleDeleteDialogOpen(trip)} />,
    comments: (
      <Typography
        sx={{
          fontSize: "0.875rem",
          maxWidth: 250,
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          ml: "2em"
        }}
      >
        {trip.comments ? "Y" : "N"}
      </Typography>
    ),
  }));

  return (
    <Box>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h6" className="section-subhead" sx={{ fontSize: "0.9em" }}>
          YOUR TRIPS
        </Typography>
        <Typography variant="h4" className="section-title" sx={{ fontSize: "1.5em", fontWeight: 800 }}>
          Posted trips:
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
            You haven't posted any trips - if you would like to post a trip for others to see please navigate to the DRIVE form at the top and post it up!
          </Typography>
        )}
      </Box>
      <SeeMoreTripDialog open={seeMoreDialogOpen} close={handleSeeMoreDialogClose} trip={selectedTrip} />
      <EditTripDialog open={editDialogOpen} close={handleEditDialogClose} trip={selectedTrip} setUpdateList={handleEditTrip} />
      <DeleteTripDialog open={deleteDialogOpen} close={handleDeleteDialogClose} trip={selectedTrip} setUpdateList={handleDeleteTrip} />
    </Box>
  );
}
