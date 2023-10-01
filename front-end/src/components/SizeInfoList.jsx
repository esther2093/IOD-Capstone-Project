import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Popover } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

export default function SizeInfoList() {

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

  return (
    <Box>
      <InfoIcon onClick={handleClick} />
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Box sx={{ flexGrow: 1, p: "0.5em" }}>
          <Typography sx={{ fontSize: "0.9em", fontWeight: 500, textDecoration: "underline" }}>Size information:</Typography>
          <ul className="size-list">
            <li>
              <Typography sx={{ fontSize: "0.8em" }}>Small = ≤ 30cm x 30cm</Typography>
            </li>
            <li>
              <Typography sx={{ fontSize: "0.8em" }}>Medium = ≤ 60cm x 60cm</Typography>
            </li>
            <li>
              <Typography sx={{ fontSize: "0.8em" }}>Large = ≤ 100cm x 100cm </Typography>
            </li>
            <li>
              <Typography sx={{ fontSize: "0.8em" }}>Extra Large = over 100cm x 100cm</Typography>
            </li>
          </ul>
        </Box>
      </Popover>
    </Box>
  );
}
