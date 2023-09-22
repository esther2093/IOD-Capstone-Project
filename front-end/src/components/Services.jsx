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
            <h2 className="section-title">How to get started?</h2>
            <p className="breakline">—</p>
            <p className="section-subtitle">Follow the steps below</p>
          </div>
          <div className="services-instructions">
            <p>1. Login or Sign-up.</p>
            <p>2. Look through available trips.</p>
            <p>3. Contact the driver to organise logistics.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
