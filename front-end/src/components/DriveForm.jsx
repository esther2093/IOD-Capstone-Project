import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Icon } from "@iconify/react";
import Logo from "../assets/logo.png";
import { useUserContext } from "../context/UserContext";
import axios from "axios";
import driveformpic from "../assets/driveformpic.jpeg";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { FormControl } from "@mui/material";
import bannerBg from "../assets/bannerImage.jpg";
import SizeInfoList from "./sizeInfoList";

let spaceSizes = ["Small", "Medium", "Large", "Extra Large"];

export default function DriveForm() {
  const { currentUser } = useUserContext();

  const [error, setError] = useState("");
  const [submitTrip, setSubmitTrip] = useState("");
  const [availableSpace, setAvailableSpace] = useState([]);

  const handleChange = (e) => {
    setAvailableSpace(e.target.value);
    // console.log(availableSpace);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitTrip("");

    const data = new FormData(e.currentTarget);
    data.append("userId", currentUser.id);

    axios
      .post("http://localhost:8000/api/trips/register", Object.fromEntries(data.entries()))
      .then((response) => {
        const result = response.data.result;
        const trip = response.data.data;

        setSubmitTrip(result);
        if (trip) {
          setError("");
          e.target.reset()
        }
      })
      .catch((error) => {
        console.error(error);
        setError(error.response.data.result);
      });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box className="banner-content" id="second-banner-top" sx={{ width: "100%", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundImage: `url(${bannerBg})` }}>
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

      <Grid
        container
        component="main"
        sx={{
          padding: "1em",
          backgroundColor: "white",
        }}
      >
        <Grid
          item
          xs={null}
          sm={6}
          md={5}
          sx={{
            backgroundImage: `url(${driveformpic})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundColor: "white",
            backgroundPosition: "center",
          }}
        ></Grid>

        <Grid item xs={12} sm={6} md={7} sx={{ p: "1em", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <Box sx={{ mt: 8, mb: 1, mx: 2 }}>
            <Box className="logo-container">
              <Icon icon="solar:box-bold-duotone" height="41" className="icon-parcel" />
              <img src={Logo} alt="Logo" className="login-logo" />
            </Box>
            <Typography variant="body2" sx={{ fontWeight: 300 }}>
              Fill out the details of your trip!
            </Typography>
          </Box>

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: "0.5em", mb: "2em" }}>
            <Box sx={{ pb: "1em" }}>
                <Typography variant="body2" color="red">
                  {error}
                </Typography>
                <Typography variant="body2" color="green">
                  {submitTrip}
                </Typography>
            </Box>

            <Grid container spacing={0}>
              <Grid item xs={12} sx={{ textAlign: "left", ml: "1em" }}>
                <Typography sx={{fontSize: "0.75em", color: "rgba(0, 0, 0, 0.6)"}}>Where from?</Typography>              
                </Grid>
              <Grid item xs={12} sm={12} md={4} sx={{ p: "0.25em" }}>
                <TextField fullWidth id="suburbFrom" label="Suburb" name="suburbFrom" autoComplete="suburb" />
              </Grid>
              <Grid item xs={12} sm={12} md={4} sx={{ p: "0.25em" }}>
                <TextField required fullWidth id="cityFrom" label="City" name="cityFrom" autoComplete="city" />
              </Grid>
              <Grid item xs={12} sm={12} md={4} sx={{ p: "0.25em" }}>
                <TextField required fullWidth id="stateFrom" label="State" name="stateFrom" autoComplete="state" />
              </Grid>
              <Grid item xs={12} sx={{ textAlign: "left", ml: "1em" }}>
                <Typography sx={{fontSize: "0.75em", color: "rgba(0, 0, 0, 0.6)"}}>Where to?</Typography>              
                </Grid>
              <Grid item xs={12} sm={12} md={4} sx={{ p: "0.25em" }}>
                <TextField fullWidth id="suburbTo" label="Suburb" name="suburbTo" autoComplete="suburb" />
              </Grid>

              <Grid item xs={12} sm={12} md={4} sx={{ p: "0.25em" }}>
                <TextField required fullWidth id="cityTo" label="City" name="cityTo" autoComplete="city" />
              </Grid>
              <Grid item xs={12} sm={12} md={4} sx={{ p: "0.25em" }}>
                <TextField required fullWidth id="stateTo" label="State" name="stateTo" autoComplete="state" />
              </Grid>
              <Grid item xs={12} sx={{ textAlign: "left", ml: "1em" }}>
                <Typography sx={{fontSize: "0.75em", color: "rgba(0, 0, 0, 0.6)"}}>Dates </Typography>              
                </Grid>
              <Grid item xs={12} sm={12} md={6} sx={{ p: "0.25em" }}>
                <TextField required fullWidth name="departureDate" label="DD-MM-YYYY" id="departureDate" format="DD-MM-YYYY" helperText="Departure" />
              </Grid>
              <Grid item xs={12} sm={12} md={6} sx={{ p: "0.25em" }}>
                <TextField required fullWidth name="arrivalDate" label="DD-MM-YYYY" id="arrivalDate" format="DD-MM-YYYY" helperText="Arrival" />
              </Grid>

              <Grid item xs={11} sx={{ p: "0.25em" }}>
                <FormControl fullWidth required >
                  <InputLabel htmlFor="availableSpace">Avaliable Space</InputLabel>
                  <Select required id="availableSpace" label="Available Space" name="availableSpace" value={availableSpace} onChange={handleChange}>
                    {spaceSizes.map((spaceSize) => (
                      <MenuItem key={spaceSize} value={spaceSize}>
                        {spaceSize}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={1} sx={{ py: "1.2em", color: "#D2B356" }}>
               <SizeInfoList />
              </Grid>

              <Grid item xs={12} sx={{ p: "0.25em" }}>
                <TextField fullWidth multiline maxRows={4} name="comments" label="Any additional comments" id="comments" autoComplete="comments" />
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  my: "2em",
                  mx: "8em",
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
        </Grid>
      </Grid>
    </Box>
  );
}
