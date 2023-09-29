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
  // console.log("All Trips Data:", allTrips)

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);

  const [userTripsList, setUserTripsList] = useState([]);
  const [updateList, setUpdateList] = useState(false);

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (updateList) {
      setUpdateList(true);
    }
  }, [updateList]);

  useEffect(() => {
    const userTrips = allTrips.filter((trip) => trip.userId === currentUser.id);
    setUserTripsList(userTrips);
  }, [allTrips, currentUser, updateList]); 
  // console.log("User Trip List data: ", userTripsList)

  const columns = [
    { id: "from", label: "From", minWidth: 100 },
    { id: "to", label: "To", minWidth: 100 },
    { id: "dates", label: "From - To", minWidth: 100 },
    { id: "comments", label: "Comments", minWidth: 300 },
    { id: "editTrip", label: "", minWidth: 30 },
    { id: "deleteTrip", label: "", minWidth: 20 },
  ];

  const rows = userTripsList.map((trip) => ({
    from: `${trip.suburbFrom} ${trip.cityFrom}, ${trip.stateFrom}`,
    to: `${trip.suburbTo} ${trip.cityTo}, ${trip.stateTo}`,
    dates: `${formatDate(trip.departureDate)} - ${formatDate(trip.arrivalDate)}`,
    availableSpace: trip.availableSpace,
    editTrip: <Icon icon="material-symbols:edit-outline" onClick={() => handleEditDialogOpen(trip)} />,
    deleteTrip: <Icon color="#c1121f" icon="ph:x-fill" onClick={() => handleDeleteDialogOpen(trip)} />,
    comments: (
      <Typography
        sx={{
          fontSize: "0.875rem",
          maxWidth: 300,
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
      <EditTripDialog open={editDialogOpen} close={handleEditDialogClose} trip={selectedTrip} setUpdateList={setUpdateList}/>
      <DeleteTripDialog open={deleteDialogOpen} close={handleDeleteDialogClose} trip={selectedTrip} setUpdateList={setUpdateList}/>
    </Box>
  );
}
