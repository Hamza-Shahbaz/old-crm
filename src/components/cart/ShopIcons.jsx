import React from "react";
import simpleCart from "../../assets/images/cartsimple.png";
import cartFilled from "../../assets/images/cartFiiled.png";
import unfavorite from "../../assets/images/nonfavorite.png";
import favoriteOutline from "../../assets/images/favoriteOutlined.png";

const ShopIcons = ({ forFav = false, forCart = false, isCart, isFavorite }) => {
  return (
    <div>
      {forCart && isCart ? (
        <img
          style={{ height: 30, width: 30 }}
          src={cartFilled}
          alt="Cart Filled"
        />
      ) : (
        <img
          style={{ height: 30, width: 30 }}
          src={simpleCart}
          alt="Simple Cart"
        />
      )}

      {forFav && isFavorite ? (
        <img
          style={{ height: 30, width: 30 }}
          src={favoriteOutline}
          alt="Favorite Outline"
        />
      ) : (
        <img
          style={{ height: 30, width: 30 }}
          src={unfavorite}
          alt="Unfavorite"
        />
      )}
    </div>
  );
};

export default ShopIcons;
