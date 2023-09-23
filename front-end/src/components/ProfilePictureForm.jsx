import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Container, CssBaseline, Box, TextField, Button } from '@mui/material'
import { useUserContext } from '../context/UserContext'
import Typography from "@mui/material/Typography";
import Avatar from '@mui/material/Avatar';

export default function ProfilePictureForm () {

    const [image, setImage] = useState({ preview: '', data: '' })
    const [imageTitle, setImageTitle] = useState('')
    const [status, setStatus] = useState('')
    const {currentUser, handleUpdateUser} = useUserContext();
    const [loggedIn, setLoggedIn] = React.useState(currentUser.firstName)

    console.log(currentUser);
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        // build up all form data to be sent to back end in a FormData object (comes built-in to browser-based JS)
        let formData = new FormData()
        formData.append('file', image.data)

        try {
            // post everything from form (including image data) to backend, where we will save the image file to disk using multer middleware
            // https://www.positronx.io/react-file-upload-tutorial-with-node-express-and-multer/
            const response = await axios.post(`http://localhost:8000/api/users/${currentUser.id}/image`, formData) // see backend for this route
            console.log(response.data)
            setStatus(response.data.result);
            //update current user with new profile photo details
            handleUpdateUser({...currentUser, ...response.data.data})
        } catch(err) {
            setStatus(err.message)
        }
    }

    const handleFileChange = (e) => {
        console.log(e.target.files[0])
        // create object with data from uploaded image and URL to preview it
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        }
        setImage(img)
    }

    return (
        <Container component="main" maxWidth="md" >
            <CssBaseline />
            {/* {currentUser.id ? */}
            <Avatar variant="square" sx={{ m: 1, width: "75%", height: "100%", margin: 0, marginTop: "1em", marginBottom: "1em", backgroundColor: "white" }}>
                   <img className="uploaded-profile-pic" src={"http://localhost:8000/"+currentUser.profilePicture} width="285" /> 
                </Avatar>
            <Box component="form" onSubmit={handleSubmit} noValidate
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {image.preview && <img src={image.preview} width='100' height='100' />}
                <input name="photo" type="file" onChange={handleFileChange} />

                <Button type="submit"  variant="filled" sx={{ mt: 3, mb: 2 }}>Submit</Button>
            </Box>
            {/* : <p>Please log in first</p> } */}
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
    )

}