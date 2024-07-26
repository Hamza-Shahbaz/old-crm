import React from "react";
// import "../css/globalStyle.css";
import { Link } from "react-router-dom";

const SaleSection = ({ data }) => {
  return (
    <section className="sale">
      {data && Object.values(data).length > 0 ? (
        <div className="container">
          <div className="row">
            {Object.values(data).map((item) => {
              return (
                <div
                  key={item?.poster_id}
                  className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 my-1"
                >
                  <div className="sale-sec mb-2">
                    <Link to={item?.poster_url} target="_blank">
                      <img src={item?.poster_image_path} className="w-100" style={{height: '350px', borderRadius: '20px'}}/>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default SaleSection;
