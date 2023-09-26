import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Icon } from "@iconify/react";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import axios from "axios";
import driveformpic from "../assets/driveformpic.jpeg";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { FormControl, FormHelperText, InputAdornment, Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

let toolTipText = `
    Space: 
    Small = ≤ 30cm x 30cm)
    Medium = ≤ 60cm x 60cm)
    Large = ≤ 100cm x 100cm)
    Extra Large = > 100cm x 100cm)`;

let spaceSizes = ["Small", "Medium", "Large", "Extra Large"];

export default function DriveForm() {
  const [error, setError] = useState("");
  const [submitResult, setSubmitResult] = useState("");
  const [availableSpace, setAvailableSpace] = useState([]);

  const { currentUser, handleUpdateUser } = useUserContext();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setAvailableSpace(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitResult("");

    const data = new FormData(event.currentTarget);
    const userId = currentUser.id;
    data.append("userId", userId);

    axios
      .post("http://localhost:8000/api/trips/register", Object.fromEntries(data.entries()))
      .then((response) => {
        const result = response.data.result;
        const trip = response.data.data;

        setSubmitResult(result);
        if (trip) {
          handleUpdateUser(currentUser);
          setError("");
        } else {
          setError("Trip submission failed.");
        }
      })
      .catch((error) => {
        setError("Please fill in all the required inputs");
        console.log(error);
      });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box className="banner-content" id="second-banner-top">
        <Box className="banner-section-box">
          <Box className="banner-section-heading">
            <Typography variant="h4" className="breakline">
              —
            </Typography>
            <Typography gutterBottom variant="h1" id="banner-main-header" sx={{ letterSpacing: -5 }}>
              GOING SOMEWHERE?
            </Typography>
            <Typography variant="subtitle1" id="banner-main-subtitle">
              Why not earn some extra cash on the way!
            </Typography>
            <Typography variant="h4" className="breakline">
              —
            </Typography>
          </Box>
        </Box>
      </Box>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid
          container
          component="main"
          sx={{
            display: { xs: "block", sm: "block", md: "flex" },
            padding: "1em",
            backgroundColor: "white",
          }}
        >
          <Grid
            item
            xs={null}
            sm={5}
            md={5}
            sx={{
              backgroundImage: `url(${driveformpic})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              backgroundColor: "white",
              backgroundPosition: "center",
            }}
          ></Grid>

          <Grid item xs={12} sm={12} md={7}>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box className="logo-container">
                <Icon icon="solar:box-bold-duotone" height="41" className="icon-parcel" />
                <img src={Logo} alt="Logo" className="login-logo" />
              </Box>
              <Typography variant="body2" sx={{ fontWeight: 300, textAlign: "center" }}>
                Fill out the details of your trip!
              </Typography>

              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Typography variant="body2" color="error" sx={{ textAlign: "center" }}>
                  {error}
                </Typography>
                <Typography variant="body2" color="success">
                  {submitResult}
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={4} sx={{ paddingRight: "1em" }}>
                    <TextField fullWidth id="suburbFrom" label="Suburb" name="suburbFrom" autoComplete="suburb" helperText="Where from?" />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} sx={{ paddingRight: "1em" }}>
                    <TextField required fullWidth id="cityFrom" label="City" name="cityFrom" autoComplete="city" />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} sx={{ paddingRight: "1em" }}>
                    <TextField required fullWidth id="stateFrom" label="State" name="stateFrom" autoComplete="state" />
                  </Grid>

                  <Grid item xs={12} sm={12} md={4} sx={{ paddingRight: "1em" }}>
                    <TextField fullWidth id="suburbTo" label="Suburb" name="suburbTo" autoComplete="suburb" helperText="Where to?" />
                  </Grid>

                  <Grid item xs={12} sm={12} md={4} sx={{ paddingRight: "1em" }}>
                    <TextField required fullWidth id="cityTo" label="City" name="cityTo" autoComplete="city" />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} sx={{ paddingRight: "1em" }}>
                    <TextField required fullWidth id="stateTo" label="State" name="stateTo" autoComplete="state" />
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} sx={{ paddingRight: "1em" }}>
                    <TextField required fullWidth name="departureDate" label="DD-MM-YYYY" id="departureDate" format="DD-MM-YYYY" helperText="Departure Date" />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} sx={{ paddingRight: "1em" }}>
                    <TextField required fullWidth name="arrivalDate" label="DD-MM-YYYY" id="arrivalDate" format="DD-MM-YYYY" helperText="Arrival Date" />
                  </Grid>

                  <Grid item xs={12} sx={{ paddingRight: "1em" }}>
                    <FormControl fullWidth required>
                     
                      <Select
                        id="availableSpace"
                        multiple
          
                        value={availableSpace}
                        onChange={handleChange}
                        
                        startAdornment={
                          <InputAdornment position="start">
                            <Tooltip title={toolTipText} arrow placement="bottom">
                              <InfoIcon />
                            </Tooltip>
                          </InputAdornment>
                        }
                      >
                        {spaceSizes.map((spaceSize) => (
                          <MenuItem key={spaceSize} value={spaceSize}>
                            {spaceSize}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>Available Space</FormHelperText>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sx={{ paddingRight: "1em" }}>
                    <TextField fullWidth name="comments" label="Write any additional comments" id="comments" autoComplete="comments" helperText="Comments" />
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      margin: "3em 1em",
                      backgroundColor: "#D2B356",
                      "&:hover": {
                        backgroundColor: "#fff",
                        color: "#D2B356",
                        border: "none",
                      },
                    }}
                  >
                    POST TRIP
                  </Button>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </LocalizationProvider>
    </Box>
  );
}
