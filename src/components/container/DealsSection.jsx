import React from "react";
import { dealsImageData } from "../../config/data";
import { Link } from "react-router-dom";

function DealsSection() {
  return (
    <section className="deals">
      <div className="container">
        <div className="container row align-items-center">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="section-title">
              <h2 className="text-white textStyle">Deals only on iShopping</h2>
            </div>
          </div>
        </div>
        <div className="row align-items-center mt-3 ">
          {dealsImageData.map((item, key) => {
            return (
              <div 
                className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-xs-12 mt-2"
                key={key}
              >
                <div className="deals-img">
                  <Link 
                      to={`/subCategory/${item.id}`}
                  
                  >
                    <img src={item?.image} className="w-100" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default DealsSection;
