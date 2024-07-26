import React, { useEffect } from "react";
import * as images from "../../config/images";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Contact() {
  const siteSettingsData = useSelector(
    (state) => state?.siteSettingReducerData?.siteSettings?.settings
  );

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  const openEmailClient = () => {
    const email = siteSettingsData?.site_email;
    if (email) {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <div
      className="tab-pane "
      id="contact"
      role="tabpanel"
      aria-labelledby="v-pills-contact-tab"
    >
      <div className="account-sec-body">
        <div className="profile-sec-middle border">
          <div className="log-head-text border-bottom my-3 mx-3">
            <h4> Contact us</h4>
          </div>
          <span className="mx-3">
            Shopping is dedicated to providing you with the best and most
            courteous service. Please call or email us if you have any
            questions. We'd love to hear from you!
          </span>
          <div className="row justify-content-center ">
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <div className="contact-sec">
                <img src={images.requestContactImage} />
                <p>Submit a request</p>
              </div>
            </div>
            {siteSettingsData && siteSettingsData?.site_email ? (
              <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div className="contact-sec">
                  <img src={images.mailContactImage} />

                  <p
                    style={{ cursor: "pointer", wordBreak: "break-word" }}
                    onClick={openEmailClient}
                  >
                    {siteSettingsData?.site_email}
                  </p>
                </div>
              </div>
            ) : null}

            {siteSettingsData && siteSettingsData?.site_contact_no ? (
              <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div className="contact-sec">
                  <img src={images.phoneContactImage} />
                    <p  style={{ cursor: "pointer", wordBreak: "break-word" }}>
                      <Link to={`tel:${siteSettingsData?.site_contact_no}`} style={{textDecoration: 'none', color: '#454545'}}>

                      {siteSettingsData?.site_contact_no}
                      </Link>
                    </p>
                </div>
              </div>
            ) : null}

            {siteSettingsData && siteSettingsData?.physical_address ? (
              <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div className="contact-sec">
                  <img src={images.locContactImage} />
                  <p style={{ wordBreak: "break-word" }} className="mx-1">
                    {siteSettingsData?.physical_address}
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
