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
import formatDate from "./FormatDate";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Axios from "axios";
import formatDateBackend from "./FormatDateBackend";
import useDataRefresh from "../hooks/useDataRefresh";

export default function TripsTab1() {
  const { currentUser } = useUserContext();
  const { allTrips } = useTripData();
  const { refreshData } = useDataRefresh();

  const [submitResult, setSubmitResult] = useState("");
  const [error, setError] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [trackDeleteDialog, setTrackDeleteDialog] = useState(false);

  const openDeleteDialog = (tripId) => {
    setSelectedTripId(tripId);
    setTrackDeleteDialog(true);
  };

  const closeDeleteDialog = () => {
    setTrackDeleteDialog(false);
  };

  const [selectedTripId, setSelectedTripId] = useState(null);
  const [editedTrip, setEditedTrip] = useState({
    suburbFrom: "",
    cityFrom: "",
    stateFrom: "",
    suburbTo: "",
    cityTo: "",
    stateTo: "",
    availableSpace: "",
    departureDate: "",
    arrivalDate: "",
  });

  const [openEditDialog, setOpenEditDialog] = useState(false);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleOpenEditDialog = (trip) => {
    setSelectedTripId(trip.id);
    setEditedTrip({
      suburbFrom: capitalizeFirstLetter(trip.suburbFrom),
      cityFrom: capitalizeFirstLetter(trip.cityFrom),
      stateFrom: capitalizeFirstLetter(trip.stateFrom),
      suburbTo: capitalizeFirstLetter(trip.suburbTo),
      cityTo: capitalizeFirstLetter(trip.cityTo),
      stateTo: capitalizeFirstLetter(trip.stateTo),
      availableSpace: capitalizeFirstLetter(trip.availableSpace),
      departureDate: formatDateBackend(trip.departureDate),
      arrivalDate: formatDateBackend(trip.arrivalDate),
      comments: capitalizeFirstLetter(trip.comments),
    });
    setOpenEditDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenEditDialog(false);
    closeDeleteDialog();
  };

  const handleEditFormChange = (event) => {
    const { name, value } = event.target;
    setEditedTrip((prevTrip) => {
      console.log("Prev Trip:", prevTrip);
      console.log("Changing", name, "to", value);
      return {
        ...prevTrip,
        [name]: value,
      };
    });
  };

  const columns = [
    { id: "suburbFrom", label: "From", minWidth: 10 },
    { id: "cityFrom", label: "", minWidth: 10 },
    { id: "stateFrom", label: "", minWidth: 10 },
    { id: "suburbTo", label: "To", minWidth: 10 },
    { id: "cityTo", label: "", minWidth: 10 },
    { id: "stateTo", label: "", minWidth: 10 },
    { id: "departureDate", label: "Leaving", minWidth: 10 },
    { id: "arrivalDate", label: "Arriving", minWidth: 10 },
    { id: "availableSpace", label: "Space", minWidth: 10 },
    { id: "comments", label: "Comments", minWidth: 10 },
    { id: "editTrip", label: "Edit", minWidth: 10 },
    { id: "deleteTrip", label: "Delete", minWidth: 10 },
  ];

  const rows = allTrips
    .filter((trip) => trip.userId === currentUser.id)
    .map((trip) => ({
      suburbFrom: trip.suburbFrom,
      cityFrom: trip.cityFrom,
      stateFrom: trip.stateFrom,
      suburbTo: trip.suburbTo,
      cityTo: trip.cityTo,
      stateTo: trip.stateTo,
      departureDate: formatDate(trip.departureDate),
      arrivalDate: formatDate(trip.arrivalDate),
      availableSpace: trip.availableSpace,
      editTrip: <Button onClick={() => handleOpenEditDialog(trip)}>Edit</Button>,
      deleteTrip: <Button onClick={() => openDeleteDialog(trip.id)}>Delete</Button>,
      comments: trip.comments,
    }));

  console.log("TripsTab1 component rendering");

  const handleConfirmDelete = () => {
    console.log("handleConfirmDelete called");
    closeDeleteDialog();
    setError("");
    setSubmitResult("");

    Axios.delete(`http://localhost:8000/api/trips/${selectedTripId}`)
      .then((response) => {
        let result = response.data.result;

        setSubmitResult(result);
        if (response.status === 200) {
          setError("");
          console.log(`Trip with ID ${selectedTripId} deleted successfully.`);
          console.log("All Trips after refresh:", allTrips);
        } else {
          console.error(`Failed to delete trip with ID ${selectedTripId}.`);
        }
      })
      .catch((error) => {
        console.error("An error occurred while deleting the trip:", error);
      });
  };

  const handleEditFormSubmit = (event) => {
    console.log("handleEditFormSubmit called");
    // event.preventDefault();
    setError("");
    // setSubmitResult("");

    Axios.put(`http://localhost:8000/api/trips/${selectedTripId}`, editedTrip)
      .then((response) => {
        let result = response.data.result;
        let updatedTrip = response.data.data;

        setSubmitResult(result);
        if (updatedTrip) {
          handleCloseDialog();
          setError("");
          console.log(updatedTrip);
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error("An error occurred while updating the trip:", error);
        setError(error.message + ": " + error.response.data.result);
      });
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

      <Box sx={{ flexGrow: 1, p: "0.5em" }}>
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

      <Dialog open={openEditDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Trip</DialogTitle>
        <Typography variant="body2" color="error" sx={{ textAlign: "center" }}>
          {error}
        </Typography>
        <Typography variant="body2" color="success" sx={{ textAlgin: "center" }}>
          {submitResult}
        </Typography>
        <DialogContent>
          <Box onSubmit={handleEditFormSubmit}>
            <TextField sx={{ m: "0.5em", textSize: "0.5em" }} fullWidth name="suburbFrom" label="From Suburb" value={editedTrip.suburbFrom} onChange={handleEditFormChange} />
            <TextField sx={{ m: "0.5em" }} required fullWidth name="cityFrom" label="From City" value={editedTrip.cityFrom} onChange={handleEditFormChange} />
            <TextField sx={{ m: "0.5em" }} required fullWidth name="stateFrom" label="From State" value={editedTrip.stateFrom} onChange={handleEditFormChange} />
            <TextField sx={{ m: "0.5em" }} fullWidth name="suburbTo" label="To Suburb" value={editedTrip.suburbTo} onChange={handleEditFormChange} />
            <TextField sx={{ m: "0.5em" }} required fullWidth name="cityTo" label="To City" value={editedTrip.cityTo} onChange={handleEditFormChange} />
            <TextField sx={{ m: "0.5em" }} required fullWidth name="stateTo" label="To State" value={editedTrip.stateTo} onChange={handleEditFormChange} />
            <TextField sx={{ m: "0.5em" }} required fullWidth name="departureDate" label="Departure Date" value={editedTrip.departureDate} onChange={handleEditFormChange} />
            <TextField sx={{ m: "0.5em" }} required fullWidth name="arrivalDate" label="Arrival Date" value={editedTrip.arrivalDate} onChange={handleEditFormChange} />
            <TextField sx={{ m: "0.5em" }} required fullWidth name="availableSpace" label="Available Space" value={editedTrip.availableSpace} onChange={handleEditFormChange} />
            <TextField sx={{ m: "0.5em" }} multiline maxRows={4} fullWidth name="comments" label="Comments" value={editedTrip.comments} onChange={handleEditFormChange} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleEditFormSubmit} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={trackDeleteDialog} onClose={closeDeleteDialog}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <Typography variant="body2">Are you sure you want to delete this trip?</Typography>
        </DialogContent>
        <Typography variant="body2" color="error" sx={{ textAlign: "center" }}>
          {error}
        </Typography>
        <Typography variant="body2" color="success" sx={{ textAlgin: "center" }}>
          {submitResult}
        </Typography>
        <DialogActions>
          <Button onClick={handleConfirmDelete} color="primary">
            Yes
          </Button>
          <Button onClick={closeDeleteDialog}>No</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
