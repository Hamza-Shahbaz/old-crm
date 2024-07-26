import React from "react";
import { useNavigate } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { BaseUrl } from "../../utils/Api";
import dummmyImage from "../../assets/images/no-image03.png";

function Tabs_ImageSection({ headingShow, data, divClassName }) {
  const navigate = useNavigate();

  function categoryIdHandler(id, category_title) {
    navigate("/subCategory/" + id, {
      state: { id: id, title: category_title },
    });
  }

  const handleImageError = (e) => {
    e.target.onerror = null; // prevent infinite loop
    e.target.src = dummmyImage;
  };

  return (
    <div className="container">
      {headingShow ? (
        <>
          <div className="section-title mt-lg-5 mt-3">
            <h2 className="mb-2 headingStyle2 mx-lg-2">Featured Categories</h2>
          </div>
        </>
      ) : null}

      {data != "" ? (
        <>
          <div className="tab-pane fade show animationStyle">
            <div className="row m-0 col-md-12 col-xl-12 col-lg-12 d-flex justify-content-center align-items-center">
              {data?.map((item) => {
                return (
                  <div className="col-md-3 col-xl-2 col-lg-2 d-flex justify-content-center align-items-center circleItemStyle" key={item?.category_id}>
                    <div
                      className="text-decoration-none"
                      onClick={categoryIdHandler.bind(
                        this,
                        item?.category_id,
                        item?.category_title
                      )}
                    >
                      <div className={divClassName}>
                        <img
                          onError={handleImageError}
                          src={`${BaseUrl.replace(BaseUrl.slice(-5), "")}${
                            item?.category_photo
                          }`}
                        />
                        <p>{item?.category_title}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <div>
              <RingLoader size={60} color="#2e3192" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Tabs_ImageSection;
