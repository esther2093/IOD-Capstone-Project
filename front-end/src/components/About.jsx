import * as React from "react";
import { Icon } from "@iconify/react";


export default function About() {
  return (
    <div className="about-section" id="about-top">
      <div className="about-container">
        <div className="col-33 about-col-33">
          <div className="section-heading">
            <h3 className="section-subhead">About Us</h3>
            <h2 className="section-title">Why Use ParcelMe?</h2>
            <p className="breakline">—</p>
            <p className="section-subtitle">
              We offer a easy way to get in contact with people who are on their
              way somewhere and you can ask them to deliver a package for you!
            </p>
          </div>
        </div>

        <div className="col-66 icon-block-66">
          <div className="icon-container1">
            <div className="col-2 ">
              <div className="icon-block">
                <Icon
                  className="icon-block-icon"
                  icon="fluent:text-abc-underline-double-32-filled"
                ></Icon>

                <div className="icon-block-description">
                  <h4>SIMPLE</h4>
                  <p>
                    Simple setup of posting your travels to be a driver or for
                    the sender to see avalilable routes
                  </p>
                </div>
              </div>
            </div>

            <div className="col-2">
              <div className="icon-block">
                <Icon
                  className="icon-block-icon"
                  icon="clarity:lightning-line"
                ></Icon>

                <div className="icon-block-description">
                  <h4>CONVIENENT</h4>
                  <p>
                    Choose the time and date that best suits you and contact the
                    driver directly once you are matched
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="icon-container2">
            <div className="col-2">
              <div className="icon-block">
                <Icon className="icon-block-icon" icon="nimbus:money"></Icon>

                <div className="icon-block-description">
                  <h4>AFFORDABLE</h4>
                  <p>
                    Costs vary based on kms and size of items being delivered
                    and will be more cost efficent due to the driver going that
                    way anyways{" "}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-2 ">
              <div className="icon-block">
                <Icon
                  className="icon-block-icon"
                  icon="mingcute:phone-fill"
                ></Icon>

                <div className="icon-block-description">
                  <h4>CONTACT US</h4>
                  <p>Contact us if there any issues</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
