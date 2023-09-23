import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ProfilePictureForm from "./ProfilePictureForm";

export default function MyAccount() {
  return (
    <div className="my-account-page">
      <div className="banner-content" id="banner-top">
        <div className="col-45">
          <div className="banner-section-heading">
            <p className="breakline">—</p>
            <h2 id="drivePage-main-header">Your Account Details</h2>
            <h3 id="ridesPage-main-subtitle">
              Everything you need 
            </h3>
            <p className="breakline">—</p>
          </div>
        </div>
      </div>

      <div className="my-account-container">
      <div className="account-col-33">
        <div className="profile-pic-box">
        <ProfilePictureForm />
        </div>
        <div className="profile-details-box">
            Name: 
            Phone: etc
        </div>
      </div>
    <div className="account-col-66">
        <div className="posted-trips">dfdf</div>
        <div className="active-trips">dfdfd</div>
    </div>
      </div>
    </div>
  );
}
