import React from "react";
import { Link } from "react-router-dom";

function EquipmentSection({ reverse, mainImage, mainHeading, data }) {
  return (
    <section className="construction">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="section-title">
              <h2 className="mb-2 headingStyle">{mainHeading}</h2>
            </div>
          </div>
        </div>
        <div
          className="row mt-4"
          style={{ flexDirection: reverse ? "row-reverse" : null }}
        >
          <div className="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12 d-none d-xl-block">
            <div className="site-img">
              <img src={mainImage} />
            </div>
          </div>

          <div className="col-xl-10 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="row building-slider">
              {data?.map((item, index) => (
                <div
                  key={index}
                  className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12"
                >
                  <Link className="card mb-3 text-decoration-none">
                    <div className="row g-0 align-items-center">
                      <div className="col-xl-4 col-md-12 col-4 imageEquipment">
                        <img
                          src={item?.image}
                          className="img-fluid "
                        />
                      </div>
                      <div className="col-xl-8 col-md-12 col-8 ">
                        <div className="card-body pe-0 ps-0 ">
                          <h3 className="card-title p-1 m-0">{item?.headingName}</h3>
                          <p className="card-text p-1 m-0">{item?.text1}</p>
                          <p className="card-text p-1 m-0">{item?.text2}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EquipmentSection;
