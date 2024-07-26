import React from "react";
import CategoryButton from "../button/CategoryButton";

function OrderStatusList({
  cartProductImage,
  cartItemName,
  dicountedPrice,
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
      case "unshipped":
        return (
          <>
            <div className="row align-items-center  ">
              <div className="col-sm-6 col-md-6 d-flex flex-column justify-content-center  align-items-center bg-inf">
                <div className="dateStyle pt-1">{formattedDate}</div>
                <div className="">
                </div>
              </div>
              <div className="col-sm-6 col-md-6 ">
                <CategoryButton
                  buttonName={"Details"}
                  className={"card-style remove"}
                  style={{
                    border: "none",
                    backgroundColor: "white",
                  }}
                  type={"button"}
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
              {/* <span>{`Delivered ${deliveryDate ? deliveryDate : "-"}`}</span> */}
              <CategoryButton
                buttonName={"Details"}
                className={"card-style remove p-4"}
                style={{
                  border: "none",
                  backgroundColor: "white",
                }}
                type={"button"}
              />
            </div>
          </div>
        );
      case "pending":
        return (
          <div className="d-flex justify-content-center ">
            <CategoryButton
              buttonName={"Details"}
              className={"card-style remove p-4"}
              style={{
                border: "none",
                backgroundColor: "white",
              }}
              type={"button"}
            />
          </div>
        );
      case "canceled":
        return (
          <div className="d-flex justify-content-center ">
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
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="row g-0 align-items-center justify-content-center bg-warnin order-list-edited"
      style={{
        border: "1px solid #e8dfdf",
        // margin:"10px 10px 10px 10px"
        // backgroundColor:"grey",
        margin: "0px 20px 20px 20px",
      }}
      onClick={()=>orderType !== 'canceled' ?  onOrderDetailClick() : ()=> {}}
    >
      <div className="col-sm-9 col-md-9 bg-inf "  >
        <div className="my-card-body ">
          <div className="my-card-body bg-inf mt-3">
            <h2 className=" text-center text-sm-start fs-6 ">{`Order ID : ${orderId}`}</h2>
            <h2 className=" text-center text-sm-start">{`${cartItemName}`}</h2>
            <div className=" my-cart-price d-flex justify-content-center justify-content-sm-start bg-">
              <p>{dicountedPrice ? dicountedPrice : null}</p>
              <span className="line">{actualPrice ? actualPrice : null}</span>
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
  );
}

export default OrderStatusList;
