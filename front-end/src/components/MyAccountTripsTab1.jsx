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
import formatDate from "./FormatDate";
import { Icon } from "@iconify/react";
import EditTripDialog from "./EditTripDialog";
import DeleteTripDialog from "./DeleteTripDialog";

export default function TripsTab1() {
  const { currentUser } = useUserContext();
  const { allTrips } = useTripData();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [selectedTrip, setSelectedTrip] = useState(null);
  const [userTripsList, setUserTripsList] = useState([]);
  

  const handleEditDialogOpen = (trip) => {
    setSelectedTrip(trip);
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setSelectedTrip(null);
    setEditDialogOpen(false);
  };

  const handleDeleteDialogOpen = (trip) => {
    setSelectedTrip(trip);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setSelectedTrip(null);
  };

  const handleEditTrip = (editedTrip) => {
    // console.log(editedTrip);
    setUserTripsList(userTripsList.map((trip) =>
      trip.id === editedTrip.id ? editedTrip : trip))
  }

const handleDeleteTrip = (deletedTrip) => {
  setUserTripsList((prevTripsList) =>
  prevTripsList.filter((trip) => trip.id !== deletedTrip.id)
);
};

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };

  const columns = [
    { id: "trip", label: "Trip", minWidth: 150 },
    { id: "dates", label: "Dates", minWidth: 150 },
    { id: "comments", label: "Comments", minWidth: 250 },
    { id: "editTrip", label: "", minWidth: 30 },
    { id: "deleteTrip", label: "", minWidth: 20 },
  ];

   useEffect(() => {
    const userTrips = allTrips.filter((trip) => trip.userId === currentUser.id);
    setUserTripsList(userTrips);
  }, [allTrips, currentUser]); 
  // console.log("User Trip List data: ", userTripsList)

  const rows = userTripsList.map((trip) => ({
    trip: ` ${trip.cityFrom} - ${trip.cityTo}`,
    dates: `${formatDate(trip.departureDate)} - ${formatDate(trip.arrivalDate)}`,
    availableSpace: trip.availableSpace,
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
        }}
      >
        {trip.comments}
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
        <TableContainer sx={{ height: 200 }}>
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
      <EditTripDialog open={editDialogOpen} close={handleEditDialogClose} trip={selectedTrip} setUpdateList={handleEditTrip}/>
      <DeleteTripDialog open={deleteDialogOpen} close={handleDeleteDialogClose} trip={selectedTrip} setUpdateList={handleDeleteTrip}/>
    </Box>
  );
}
