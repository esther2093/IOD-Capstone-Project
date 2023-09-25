import axios from "axios";
import React, { useState } from "react";
import { Container, CssBaseline, Box, Button } from "@mui/material";
import { useUserContext } from "../context/UserContext";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";


export default function ProfilePictureDialog() {
  const [image, setImage] = useState({ preview: "", data: "" });
  const [status, setStatus] = useState("");
  const { currentUser, handleUpdateUser } = useUserContext();
  const [loggedIn, setLoggedIn] = React.useState(currentUser.firstName);

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log(currentUser);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("file", image.data);

    try {
      const response = await axios.post(
        `http://localhost:8000/api/users/${currentUser.id}/image`,
        formData
      ); // see backend for this route
      console.log(response.data);
      setStatus(response.data.result);
      handleUpdateUser({ ...currentUser, ...response.data.data });
    } catch (err) {
      setStatus(err.message);
    }
  };

  const handleFileChange = (e) => {
    console.log(e.target.files[0]);

    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };

  return (
    <Box>
      <Button variant="outlined" onClick={handleClickOpen}>
        Change your profile picture
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
         <DialogContent>
        <Container component="main" sx={{ pl: 0 }}>
          <Avatar
            variant="square"
            sx={{
              m: 1,
              width: "100%",
              height: "100%",
              margin: 0,
              backgroundColor: "white",
            }}
          >
            <img
              className="uploaded-profile-pic"
              src={"http://localhost:8000/" + currentUser.profilePicture}
              width="285"
            />
          </Avatar>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {image.preview && (
              <img src={image.preview} width="100" height="100" />
            )}
            <input name="photo" type="file" onChange={handleFileChange} />

            <Button type="submit" variant="filled" sx={{ mt: 3, mb: 2 }}>
              Submit
            </Button>
          </Box>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 300,
              margin: "1em",
              textAlign: "center",
            }}
          >
            {status}
          </Typography>
        </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            DONE
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
