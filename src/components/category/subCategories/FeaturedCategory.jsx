import React from "react";
import { BaseUrl } from "../../../utils/Api";
import dummmyImage from "../../../assets/images/no-image03.png";

function FeaturedCategory({ productIdHandler, divClassName, filtered, name }) {

  const handleImageError = (e) => {
    e.target.onerror = null; // prevent infinite loop
    e.target.src = dummmyImage;
  };

  return (
    <div className="container">
      {filtered?.length ? (
        <div className="section-title mt-lg-5 mt-3">
          <h2 className="mb-2 headingStyle2">{name}</h2>

          <div className="tab-pane fade show animationStyle">
            <div className="row m-0">
              {filtered?.map((item, index) => (
                <div className="col" key={item?.category_id}>
                  <div
                    className="text-decoration-none"
                    onClick={productIdHandler.bind(this, [
                      item?.category_id,
                      item?.category_title,
                    ])}
                  >
                    <div className={divClassName}>
                      <img
                      onError={handleImageError}
                        src={
                          item.category_image_path ||
                          `${BaseUrl.replace(BaseUrl.slice(-5), "")}${
                            item?.category_photo
                          }`
                        }
                        // alt={item.category_title}
                      />

                      <p className="featuredItemsPara">
                        {item?.category_title}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        ></div>
      )}
    </div>
  );
}

export default FeaturedCategory;
