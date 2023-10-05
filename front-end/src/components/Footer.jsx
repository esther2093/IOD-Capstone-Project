import React from "react";
import { Box, Typography, Link, Grid, Paper } from "@mui/material";

export default function Footer() {
  return (
    <Paper elevation={0} square className="footer-section" sx={{ backgroundColor: "#D2B356" }}>
      <Grid container spacing={0} sx={{ backgroundColor: "white", my: 2, p: 2 }}>
        <Grid item xs={12} sm={4}>
          <Typography variant="body2">IOD Capstone Project Oct 2023</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="body2">© 2023 EHSL inc.</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="body2" component="ul">
            <Link href="mailto:`{support@parcelme.com}`?subject=ParcelMe Support">Contact us | Report a Problem</Link>
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
