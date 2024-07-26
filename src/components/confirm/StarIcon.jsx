import React from "react";
import ReactStars from "react-rating-stars-component";

function StarIcon({prodReviews, starRating}) {
  return (
    <div className="d-flex align-items-center justify-content-center p-2">
      <span className="m-1">
        <ReactStars
          className="me-2 rating"
          count={5}
          size={13}
          value={starRating}
          edit={false}
          isHalf={true}
          char={"★"}

          activeColor="#FD5F12"
        />
      </span>

      <span className="rating pt-1 px-1">{prodReviews}</span>
    </div>
  );
}

export default StarIcon;
