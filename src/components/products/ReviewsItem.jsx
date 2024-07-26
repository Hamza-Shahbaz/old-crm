import React from "react";
import ReactStars from "react-rating-stars-component";
import User from "../../assets/images/User.png";

function ReviewsItem({ date, rating, reviews, verified, name }) {
  return (
    <div className="reviewStyle">
      <div className="review-sec">
        <div className="review-left">
          <div className="avatar">
            <div >
              <img src={User} className="iconStyle2 "/>
            </div>
          </div>
          <div>
            <p>{name}</p>
            <ReactStars
              className=""
              count={5}
              edit={false}
              size={14}
              activeColor="#FD5F12"
              value={rating}
              isHalf={true}
              char={<i className="fa-solid fa-star"></i>}
            />
          </div>
        </div>
        <div className="review-right mt-2">
          <div className="date-verified-container">
            <p>{date}</p>
            <span>{verified ? "Verified" : "Unknown"}</span>
          </div>
        </div>
      </div>

      <div className="review-description " style={{ width: "83%" }}>
        <p className="mx-1 mb-2">{reviews}</p>
      </div>
    </div>
  );
}

export default ReviewsItem;
