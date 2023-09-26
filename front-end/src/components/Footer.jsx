import React from "react";
import { Box, Typography, Link, Grid, Paper } from "@mui/material";

export default function Footer() {
  return (
    <Paper elevation={0} square className="footer-section" sx={{backgroundColor: "#D2B356"}}>
      <Grid container spacing={0} sx={{backgroundColor: "white", my: 1, p: 1}}>
        <Grid item xs={12} sm={4}>
          <Box className="col-33">
            <Typography variant="body2">BLAH BLAH</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} >
          <Box className="col-33">
            <Typography variant="body2">
            © 2023 Esther Lee inc.
            </Typography> 
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box className="col-33">
            <Typography variant="body2" component="ul">
                <Link href="#">Contact us | Report a Problem</Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
