import React from "react";
import { Box, Typography, Link, Grid, Paper } from "@mui/material";

export default function Footer() {
  return (
    <Paper elevation={0} square className="footer-section" sx={{backgroundColor: "#D2B356", padding: 0}}>
      <Grid container spacing={2} sx={{backgroundColor: "white", marginTop: 1, marginBottom: 1}}>
        <Grid item xs={12} sm={4} sx={{paddingRight: "1em", paddingBottom: "1em"}}>
          <Box className="col-33">
            <Typography variant="body2">BLAH BLAH</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} sx={{paddingRight: "1em", paddingBottom: "1em"}}>
          <Box className="col-33">
            <Typography variant="body2">
            © 2023 Esther Lee inc.
            </Typography> 
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} sx={{paddingRight: "1em", paddingBottom: "1em"}}>
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
