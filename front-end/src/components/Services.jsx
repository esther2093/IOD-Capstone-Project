import React from "react";
import Parcels from '../assets/parcels.jpg';



export default function Services () {
  return (
    <div className="services-section" id="services-top">
      <div className="services-container">

      <div className="col-2 parcel-pic">
          <img src={Parcels} alt="Parcel" />
        </div>

        <div className="col-2">
          <div className="section-heading">
            <h3 className="section-subhead">SERVICES</h3>
            <h2 className="section-title">How does it work?</h2>
            <p className="breakline">—</p>
            <p className="section-subtitle">Follow these instructions:</p>
          </div>
          <ol className="services-instructions">
            <li>Login or Sign-up.</li>
            <li>Look through available trips in the SEND section.</li>
            <li>Contact the driver to organise logistics.</li>
            <li>If you are going somewhere and would like to take an item, <br />post your trip in the DRIVE section.</li>
          </ol>
        </div>

      </div>
    </div>
  );
}
