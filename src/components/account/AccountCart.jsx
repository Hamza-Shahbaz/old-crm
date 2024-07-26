import React from "react";
import { TbTruckDelivery } from "react-icons/tb";
import CategoryButton from "../button/CategoryButton";
import dummmyImage from "../../assets/images/no-image1.png";
import { Tooltip } from "antd";

function AccountCart({
  cartProductImage,
  cartItemName,
  dicountedPrice,
  salePrice,
  actualPrice,
  deliveryDate,
  isCartRight,
  orderType,
  headingName,
  head,
  orderId,
  onOrderDetailClick,
  qty,
  created_at,
  tooltipId,
}) {
  const dateObject = new Date(created_at);
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  const day = dateObject.getDate();
  const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${
    day < 10 ? "0" : ""
  }${day}`;
  const renderOrderStatus = () => {
    switch (orderType) {
      case "unshipped": //completed
        return (
          <>
            <div className="row align-items-center  ">
              <div className="col-sm-6 col-md-6 d-flex flex-column justify-content-center  align-items-center bg-inf">
                <div className="py-1">{formattedDate}</div>
                <div className="py-1">
                  <CategoryButton
                    buttonName={"Canceled"}
                    className={"card-style remove"}
                    style={{
                      border: "none",
                      backgroundColor: "white",
                    }}
                    disabled={false}
                    type={"button"}
                    onClick={() => {}}
                  />
                </div>
              </div>
              <div className="col-sm-6 col-md-6 ">
                <CategoryButton
                  buttonName={"Details"}
                  className={"card-style text-decoration-underline"}
                  style={{
                    border: "none",
                    backgroundColor: "white",
                    color: " #2e3192",
                  }}
                  type={"button"}
                  onClick={onOrderDetailClick}
                />
              </div>
            </div>
          </>
        );
      case "shipped":
        return (
          <div className="my-cart-right">
            {/* <TbTruckDelivery size={22} className="m-1" /> */}
            <div className="my-cart-right ">
              <span>{`Delivered ${deliveryDate ? deliveryDate : "-"}`}</span>
            </div>
          </div>
          // <CategoryButton
          //   buttonName={"View"}
          //   // isIcon={true}
          //   className="btn btn-continue "
          //   onClick={() => navigate("/")}
          // />
        );
      case "inProgress":
        return (
          <>
            {/* <div className="my-cart-right">
                <TbTruckDelivery size={22} className="m-1" />
                <div className="my-cart-right ">
                  <span>{`Delivered ${
                    deliveryDate ? deliveryDate : "- - -"
                  }`}</span>
                </div>
              </div> */}
          </>
        );
      default:
        return null;
    }
  };

  // const renderOrderStatus = () => {

  //   switch (orderType) {
  //     case "completed":
  //       return (
  //         <>
  //           <div className="my-cart-right ">
  //             <span>{`Delivered ${
  //               deliveryDate ? deliveryDate : "- - -"
  //             }`}</span>
  //           </div>
  //         </>
  //       );
  //     case "cancelled":
  //       return (
  //         <CategoryButton
  //           buttonName={"Cancelled"}
  //           className={"card-style remove"}
  //           style={{
  //             border: "none",
  //             backgroundColor: "white",
  //             paddingRight: 10,
  //           }}
  //           type={"button"}
  //         />
  //       );
  //     case "inProgress":
  //       return (
  //         <>
  //           <div className="my-cart-right">
  //             <TbTruckDelivery size={22} className="m-1" />
  //             <div className="my-cart-right ">
  //               <span>{`Delivered ${
  //                 deliveryDate ? deliveryDate : "- - -"
  //               }`}</span>
  //             </div>
  //           </div>
  //         </>
  //       );
  //     default:
  //       return null;
  //   }
  // };

  const handleImageError = (e) => {
    e.target.onerror = null; // prevent infinite loop
    e.target.src = dummmyImage;
  };

  return (
    <div className="profile-sec-middle mt-2">
      <div className="card card-edited px-1 mx-2">
        {head == 1 ? (
          <div className="row g-0 align-items-center">
            <div className="profile-sec-middle mx-1">
              <p
                className="text-center text-sm-start"
                style={{
                  borderBottom: "0px",
                }}
              >
                {headingName}
              </p>
            </div>
            <div className="col-sm-2 col-md-2">
              <img
                src={cartProductImage ? cartProductImage : dummmyImage}
                className="img-fluid"
                alt="Product"
                onError={handleImageError}
              />
            </div>
            <div className="col-sm-10 col-md-10">
              <div className="my-card-body mx-2">
                <div className="my-card-body">
                  {cartItemName.length > 65 ? (
                    <Tooltip
                      title={cartItemName}
                      color={"#77878f"}
                      key={tooltipId}
                      placement="bottom"
                    >
                      <h2 className="text-center text-sm-start">
                        {cartItemName.substring(0, 65) + "...."}
                      </h2>
                    </Tooltip>
                  ) : (
                    <h2 className="text-center text-sm-start">
                      {cartItemName}
                    </h2>
                  )}

                  {/* <div className=" my-cart-price d-flex justify-content-center justify-content-sm-start bg-">
                    <p>{dicountedPrice ? dicountedPrice : null}</p>
                    <span className="line">
                      Save {actualPrice ? actualPrice : null}
                    </span>
                  </div> */}

                  {salePrice !== actualPrice ? (
                    <div className="my-cart-price">
                      <span className="cartStyleText">
                        {salePrice ? salePrice : "0$"}
                      </span>
                      <span className="mx-2 line cartStyleText cartStyleText-edited">
                        {actualPrice ? actualPrice : "0$"}
                      </span>
                      <p className="cartStyleText">
                        {dicountedPrice ? dicountedPrice : "0%"}
                      </p>
                    </div>
                  ) : (
                    <div className="my-cart-price">
                      <span className="cartStyleText">
                        {salePrice ? salePrice : "0$"}
                      </span>
                    </div>
                  )}

                  <div className=" my-cart-price">
                    <p>Quantity: {qty}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-4 col-md-4 bg-">
              <div className="my-card-body-right">
                {isCartRight ? renderOrderStatus() : null}
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="profile-sec-middle profile-sec-middle-edited mt-3 mb-3 mx-1 bg-inf ">
              <p className="text-center text-sm-start">{headingName}</p>
            </div>

            <div
              className="row g-0 align-items-center  "
              style={{
                border: "1px solid #e8dfdf",
                // margin:"10px 10px 10px 10px"
                // backgroundColor:"red",
                margin: "0px 20px 20px 20px",
              }}
            >
              <div className="col-sm-9 col-md-9 bg-ino ">
                <div className="my-card-body ">
                  <div className="my-card-body ">
                    <Tooltip
                      title={cartItemName}
                      color={"#77878f"}
                      key={tooltipId}
                      placement="bottom"
                    >
                      <h2 className="text-center text-sm-start">
                        {cartItemName.length > 70
                          ? cartItemName.substring(0, 70) + "...."
                          : cartItemName}
                      </h2>
                    </Tooltip>
                    <div className=" my-cart-price d-flex justify-content-center justify-content-sm-start bg-">
                      <p>{dicountedPrice ? dicountedPrice : null}</p>
                      <span className="line">
                        {actualPrice ? actualPrice : null}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3 col-md-3 ">
                <div className=" bg-warnin ">
                  {isCartRight ? renderOrderStatus() : null}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AccountCart;
