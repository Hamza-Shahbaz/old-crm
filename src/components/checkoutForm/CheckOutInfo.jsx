import CategoryButton from "../button/CategoryButton";
import { couponIcon } from "../../config/images";
import CustomLoader from "../toast/CustomLoader";
import { amoutRateConversion, symbolAmount, valueRateConversion } from "../../utils/Helper";
import { useSelector } from "react-redux";

function CheckOutInfo({
  price,
  discount,
  shipping,
  coupunApplied,
  total,
  buttonName,
  onProceedCheckout,
  isCouponCodeEnabled,
  isButtonEnabled,
  noOfProducts,
  isNoProductsShown,
  onChange,
  onClick,
  value,
  totalAfterCouponApplied,
  couponTotalFlag,
  isCouponInputEnabled,
  isLoading,
}) {
  const currencyRate = useSelector((state) => state.siteSettingReducerData?.currentCurrency?.conversion_rate) || 1
  const currencyCode = useSelector((state) => state.siteSettingReducerData?.currentCurrency?.currency_iso_code) || "USD"

  const renderValue = (value) => {
    if(!value) {
      return symbolAmount(parseInt(0).toFixed(2), currencyCode)
    }
    let converted = Number(valueRateConversion(value, currencyRate))
    return symbolAmount(converted.toFixed(2),currencyCode)
  };

  return (
    <div className="cart-right">
      <h3>Order Summary</h3>
      <div className="card-right-body">
        {isNoProductsShown && (
          <>
            <p>No of Products</p>
            <span>{noOfProducts}</span>
          </>
        )}
      </div>
      <div className="card-right-body">
        <p>Price</p>
        <span>{renderValue(price)}</span>
      </div>

      <div className="card-right-body">
        <p>Discount</p>
        <span>{renderValue(discount)}</span>
      </div>
      <div className="card-right-body">
        <p>Shipping</p>
        <span className="text-shipping">{renderValue(shipping)}</span>
      </div>
      <div className="card-right-body">
        <p>Coupon Applied</p>
        <span>{renderValue(coupunApplied)}</span>
      </div>
      {isCouponCodeEnabled && (
        <>
          {isCouponInputEnabled && (
            <div className="input-group has-search mt-3 mb-3 align-items-center ">
              <span className="form-control-feedback align-items-center ">
                <img src={couponIcon} />
              </span>
              <input
                type="text"
                className="form-control coupon-code"
                placeholder={"Coupon Code"}
                aria-label="Coupon Code"
                onChange={(e) => onChange(e.target.value)}
                value={value}
              />
            </div>
          )}

          {isButtonEnabled === "middle" && (
            <CategoryButton
              disabled={isLoading}
              buttonName={
                isLoading ? (
                  <CustomLoader size={14} className={"loaderStyle mb-3"} />
                ) : (
                  buttonName
                )
              }
              className={"btn btn-checkout w-100"}
              type={"submit"}
              onClick={onClick}
            />
          )}
        </>
      )}

      <hr />
      <div className="card-right-body">
        <p>TOTAL</p>
        <span>{renderValue(total)}</span>
      </div>
      {couponTotalFlag && (
        <div className="card-right-body">
          <p>AFTER COUPON TOTAL</p>
          <span>
            {renderValue(
              totalAfterCouponApplied < 0 ? 0 : totalAfterCouponApplied
            )}
          </span>
        </div>
      )}

      {isButtonEnabled === "bottom" && (
        <CategoryButton
          buttonName={buttonName}
          className={"btn btn-checkout w-100"}
          type={"submit"}
          onClick={onProceedCheckout || onClick}
        />
      )}
      <div className="card-right-body"></div>
    </div>
  );
}

export default CheckOutInfo;
