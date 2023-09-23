import * as React from "react";
import Button from "@mui/material/Button";

export default function Banner() {
  return (
    <div className="banner-content" id="banner-top">
      <div className="col-45">
        <div className="banner-section-heading">
          <p className="breakline">—</p>
          <h1 id="homepage-main-header">SEND A PARCEL</h1>
          <h2 id="homepage-main-subtitle">
            Send a parcel with someone who's already going the same way! Faster
            and more secure!
          </h2>
          <p className="breakline">—</p>
        </div>
        <div className="button-group">
          <Button
            variant="outlined"
            sx={{
              width: "40%",
              fontWeight: "bold",
              border: 2,
              padding: 2,
              fontSize: 16,
            }}
            className="homepage-button"
            href="/rides"
          >
            SEND A PARCEL
          </Button>
          <Button
            variant="outlined"
            sx={{
              width: "40%",
              fontWeight: "bold",
              border: 2,
              padding: 2,
              fontSize: 16,
            }}
            className="homepage-button"
            href="/drive"
          >
            OFFER A DRIVE
          </Button>
        </div>
      </div>
    </div>
  );
}
