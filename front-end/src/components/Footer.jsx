import React from "react";
import { Box, Typography, Link, Grid, Paper } from "@mui/material";

export default function Footer() {
  return (
    <Paper elevation={0} square className="footer-section">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Box className="col-33">
            <Typography variant="body1">WHAT TO PUT HERE</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box className="col-33">
            <Typography variant="body1">
              Copyright by Esther 2023
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box className="col-33">
            <Typography variant="body1" component="ul">
              <li>
                <Link href="#">Contact us</Link>
              </li>
              <li>
                <Link href="#">Report a problem</Link>
              </li>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
