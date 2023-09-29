import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TripsTab1 from "./MyAccountTripsTab1";
import TripsTab2 from "./MyAccountTripsTab2";
import TripsTab3 from "./MyAccountTripsTab3";
import TripsTab4 from "./MyAccountTripsTab4";

function CustomTabPanel(props) {
  const { children, value, index } = props;
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TripsPanel() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper square elevation={3} sx={{ m: "0.5em" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Posted Trips " {...a11yProps(0)} />
            <Tab label="Enquired Trips" {...a11yProps(1)} />
            <Tab label="Enquries Recieved" {...a11yProps(2)} />
            <Tab label="Chats" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Box>
          <TripsTab1 />
          </Box>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <TripsTab2 />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <TripsTab3 />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <TripsTab4 />
        </CustomTabPanel>
      </Paper>
    </Box>
  );
}
