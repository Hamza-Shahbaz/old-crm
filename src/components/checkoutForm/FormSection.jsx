import React, { useState, useEffect } from "react";
import MainInput from "../input/MainInput";
import CategoryButton from "../button/CategoryButton";
import { Link, useNavigate } from "react-router-dom";
import { Select } from "antd";
import { City, Country, State } from "country-state-city";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddress,
  handleAddressId,
  saveAddress,
} from "../../redux/actions/OrderAction";
import { MyToast, toast } from "../toast/MyToast";
import PhonenoInput from "../input/PhonenoInput";
import { PulseLoader } from "react-spinners";
import CustomLoader from "../toast/CustomLoader";
import { current } from "@reduxjs/toolkit";

function FormSection({
  classMain,
  class1,
  Ischeckbox,
  btnName,
  className,
  isBottomButtonCentered,
  headType,
  onActiveSectionChange,
  activeSection,
  setSelectedCountryForCheckout,

  ShipAddressFeildsLifted,
  onSetShipAddressFeildsLifted,

  ShipAddressCheckLifted,
  onShipAddressCheckLifted,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const address = useSelector((state) => state.OrderReducerData.addressData);
  let countryData = Country.getAllCountries();
  const [stateData, setStateData] = useState();
  const [stateDataShipping, setStateDataShipping] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState();
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [addressError, setAddressEror] = useState("");
  const [addressErrorShip, setAddressErorShip] = useState("");

  const [countryError, setCountryError] = useState("");
  const [countryErrorShip, setCountryErrorShip] = useState("");

  const [stateError, setStateError] = useState("");
  const [stateErrorShip, setStateErrorShip] = useState("");

  const [cityError, setCityError] = useState("");
  const [cityErrorShip, setCityErrorShip] = useState("");

  const [zipCodeError, setZipCodeError] = useState("");
  const [zipCodeErrorShip, setZipCodeErrorShip] = useState("");

  const [termsError, setTermsError] = useState("");

  const [cityData, setCityData] = useState();
  const [cityDataShipping, setCityDataShipping] = useState();
  const [selectedCountry, setSelectedCountry] = useState({
    name: null,
  });
  const [selectedCountryShipping, setSelectedCountryShipping] = useState({
    name: null,
  });

  const [selectedState, setSelectedState] = useState({
    name: null,
  });
  const [selectedStateShipping, setSelectedStateShipping] = useState({
    name: null,
  });

  const [selectedCity, setSelectedCity] = useState({
    name: null,
  });
  const [selectedCityShipping, setSelectedCityShipping] = useState({
    name: null,
  });
  const [defaultAddress, setDefaultAddress] = useState("Select Address");
  const [shippingAddressCheck, setShippingAddressCheck] = useState(
    ShipAddressCheckLifted || false
  );
  const [defaultAddressCheck, setDefaultAddressCheck] = useState(
    ShipAddressCheckLifted !== undefined ? !ShipAddressCheckLifted : true
  );

  const [termAndConditonCheck, setTermAndConditonCheck] = useState(false);
  const cartData = useSelector((state) => state?.handleCartItem?.addToCart);
  const loginData = useSelector((state) => state.AuthReducerData.loginUser);
  const orderData = useSelector((state) => state.OrderReducerData.orderData);
  const addressId = useSelector((state) => state.OrderReducerData.addressId);
  const [orderAdressesIds, setOrderAddressesIds] = useState([]);
  const [AllAddressFeilds, setAllAddressFields] = useState({
    address_id: null,
    default_address_id: null,
    name: "",
    email: loginData && loginData?.email ? loginData?.email : null,
    address: "",
    phoneNumber:
      loginData && loginData?.phone_number ? loginData?.phone_number : null,
    zipCode: "",
    countryCode: "",
    stateCode: "",
    city: "",
    default_address: 0,
  });

  // console.log("AllAddressFeilds", AllAddressFeilds);

  ////////////

  const [ShipAddressFeilds, setShipAddressFields] = useState({
    address_id: null,
    default_address_id: null,
    address: null,
    zipCode: null,
    countryCode: null,
    stateCode: null,
    city: null,
    default_address: 0,
  });

  useEffect(() => {
    if (orderData?.addresses) {
      const addressesIds = orderData.addresses.map(
        (address) => address.address_id
      );
      setOrderAddressesIds(addressesIds);
    } else {
      setOrderAddressesIds([]);
    }
  }, [orderData]);

  const extractedCart = cartData.map((item) => {
    if (item.has_variants_selected) {
      return {
        product_id: item.id,
        quantity: item.quantity,
        variant_combo_id: item[item.variant_combo_string].variant_combo_id,
      };
    } else if (!item.has_variants_selected) {
      return {
        product_id: item.id,
        quantity: item.quantity,
        variant_combo_id: null,
      };
    }
  });

  const AddressFeildHandler = (addressType) => {
    if (addressType === "SelectAddress") {
      setAllAddressFields({
        address_id: null,
        default_address_id: null,
        name: "",
        email: "",
        address: "",
        phoneNumber: "",
        zipCode: "",
        country: "",
        countryCode: "",
        stateCode: "",
        city: "",
        default_address: 0,
      });

      setSelectedCountry("");
      setSelectedState("");
      setSelectedCity("");
      setTermAndConditonCheck(false);
      setDefaultAddress("Select Address");
      return;
    }
    dispatch(handleAddressId(addressType));

    const selectedAddress = orderData?.addresses.find(
      (address) => address.address_id === addressType
    );

    setSelectedAddress(selectedAddress);

    if (selectedAddress) {
      const {
        address_id,
        name,
        email,
        street_address,
        phone_number,
        zip_code,
        country,
        state,
        country_code,
        state_code,
        city,
        default_address_id,
      } = selectedAddress;

      setAllAddressFields((currentState) => ({
        ...currentState,
        address_id,
        name,
        email,
        address: street_address,
        phoneNumber: phone_number,
        zipCode: zip_code,
        countryCode: country_code,
        country: country,
        stateCode: state_code,
        state: state,
        city: city,
        default_address_id: default_address_id,
      }));
      setDefaultAddress(addressType);

      setSelectedCountry(() => {
        const foundCountry = countryData.find(
          (country) => country.isoCode === country_code
        );
        return {
          ...foundCountry,
          reset_id: 1,
        };
      });
      setSelectedCountryForCheckout(() => {
        const foundCountry = countryData.find(
          (country) => country.isoCode === country_code
        );
        return {
          ...foundCountry,
          reset_id: 1,
        };
      });
    } else {
    }
  };

  // useEffect(() => {
  //   setDefaultAddressCheck(() => {
  //     if (AllAddressFeilds.address_id && AllAddressFeilds.default_address_id) {
  //       return AllAddressFeilds.address_id ===
  //         AllAddressFeilds.default_address_id
  //         ? true
  //         : false;
  //     }
  //   });
  // }, [AllAddressFeilds.address_id, AllAddressFeilds.default_address_id]);  //for auto check checkbox when api data come of address form feilds

  // useEffect(() => {
  //   setShippingAddressCheck((prev) => !prev);
  //   ("here");
  // }, [defaultAddressCheck]);

  useEffect(() => {
    setAllAddressFields((prev) => ({
      ...prev,
      default_address: defaultAddressCheck ? "1" : "0",
    }));
  }, [defaultAddressCheck, setDefaultAddressCheck]); // fro click on checkbox for default address

  useEffect(() => {
    setAllAddressFields((prev) => ({
      ...prev,
      termCheck: termAndConditonCheck,
    }));
  }, [termAndConditonCheck, setTermAndConditonCheck]);

  //////////////////////

  const handleCountryChange = (type, value) => {
    if (type === 1) {
      setCountryError("");
      const country = countryData.find((country) => country.isoCode === value);
      setSelectedCountry(country);
      setSelectedCountryForCheckout(country);
      setAllAddressFields((prev) => ({
        ...prev,
        countryCode: country.isoCode,
        country: country,
      }));
      setSelectedCity(null);
      setSelectedState(null);
      setAllAddressFields((prev) => ({
        ...prev,
        stateCode: null,
        city:null
      }));
    } else if (type === 2) {
      setCountryErrorShip("");
      const country = countryData.find((country) => country.isoCode === value);
      setSelectedCountryShipping(country);
      setShipAddressFields((prev) => ({
        ...prev,
        countryCode: country.isoCode,
        country: country,
      }));
      setShipAddressFields((prev) => ({
        ...prev,
        stateCode: null,
        city:null
      }));
      setSelectedStateShipping(null);
      setSelectedCityShipping(null);
    }
  };

  useEffect(() => {
    if (selectedCountry?.reset_id === 1) {
      const statesOfCountry = State.getStatesOfCountry(
        selectedCountry?.isoCode
      );
      setStateData(statesOfCountry);
      // Use the updater function form of setSelectedState to ensure the stateData is updated
      setSelectedState((prevState) => {
        const stateData = statesOfCountry.find(
          (state) => state.isoCode === AllAddressFeilds?.stateCode
        );
        return {
          ...stateData,
          reset_id: 1,
        };
      });
    } else {
      setStateData(State.getStatesOfCountry(selectedCountry?.isoCode));
    }
  }, [selectedCountry, AllAddressFeilds?.stateCode]);

  useEffect(() => {
    setStateDataShipping(
      State.getStatesOfCountry(selectedCountryShipping?.isoCode)
    );
    // console.log("shippin efect 1");
  }, [
    selectedCountryShipping,
    ShipAddressFeilds?.stateCode,
    // ShipAddressFeildsLifted?.stateCode,
  ]);

  const handleStateChange = (type, value) => {
    if (type === 1) {
      setStateError("");
      // const state = stateData.find((state) => state.isoCode === value);
      // console.log("lipt", value);
      const state = stateData?.find((state) => {
        return state.isoCode === value;
        // console.log(value);
        // console.log(state.isoCode === "05");
        // console.log(state);
      });
      // console.log(state);
      setSelectedState(state);
      setAllAddressFields((prev) => ({
        ...prev,
        stateCode: state.isoCode,
        state: state?.name,
      }));

      setSelectedCity(null);

      setAllAddressFields((prev) => ({
        ...prev,
        city:null
      }));
    } else if (type === 2) {
      setStateErrorShip("");
      // console.log(value);
      // console.log(state);
      const state = stateDataShipping.find((state) => state.isoCode === value);
      setSelectedStateShipping(state);
      setShipAddressFields((prev) => ({ ...prev, stateCode: state.isoCode }));
      setShipAddressFields((prev) => ({
        ...prev,
        city:null
      }));
      setSelectedCityShipping(null);
    }
  };

  useEffect(() => {
    if (selectedState?.reset_id === 1) {
      // console.log("omg");
      const citiesOfState = City.getCitiesOfState(
        selectedCountry?.isoCode,
        selectedState?.isoCode
      );

      setSelectedCity((prevCity) =>
        citiesOfState.find(
          (city) =>
            city.name.toLowerCase() === AllAddressFeilds?.city?.toLowerCase()
        )
      ); // Make sure AllAddressFeilds.city is already set
    } else {
      setCityData(
        City.getCitiesOfState(selectedCountry?.isoCode, selectedState?.isoCode)
      );
    }
  }, [selectedState, selectedCountry, AllAddressFeilds.city]);

  useEffect(() => {
    setCityDataShipping(
      City.getCitiesOfState(
        selectedCountryShipping?.isoCode,
        selectedStateShipping?.isoCode
      )
    );
    // console.log("shippin efect 2");
  }, [
    selectedStateShipping,
    selectedCountryShipping,
    ShipAddressFeilds.city,
    // ShipAddressFeildsLifted?.city,
  ]);

  const handleCityChange = (type, value) => {
    if (type === 1) {
      setCityError("");
      const city = cityData.find((city) => city.name === value);
      setSelectedCity(city);
      setAllAddressFields((prev) => ({ ...prev, city: city.name }));
    } else if (type === 2) {
      setCityErrorShip("");
      // console.log(value);
      const city = cityDataShipping.find((city) => city.name === value);
      setSelectedCityShipping(city);
      setShipAddressFields((prev) => ({ ...prev, city: city.name }));
    }
  };

  const HandleDefaultAddressCheck = () => {
    setDefaultAddressCheck((prev) => !prev);
    setShippingAddressCheck((prev) => !prev);
  };

  const HandleTermAndConditonCheck = () => {
    setTermsError("");
    setTermAndConditonCheck(!termAndConditonCheck);
  };

  const handlePostData = async () => {
    const {
      name,
      email,
      address,
      countryCode,
      stateCode,
      city,
      zipCode,
      termCheck,
      phoneNumber,
    } = AllAddressFeilds;

    // Define regular expressions for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const phoneNumberRegex = /^[+]{0}(?:[0-9\-\\(\\)\\/.]\s?){6,15}[0-9]{1}$/;

    if (!name) {
      setNameError("Name is required");
      return;
    }

    if (!/^[a-zA-Z\s]*$/.test(name)) {
      setNameError("Please enter a valid name");
    }

    if (!email) {
      setEmailError("Email is required");
      return;
    }

    if (!emailRegex.test(email)) {
      setEmailError("Invalid email");
      return;
    }

    if (!address || /^\s*$/.test(address)) {
      setAddressEror("Street address is required");
      return;
    }

    if (!countryCode || /^\s*$/.test(countryCode)) {
      setCountryError("Country is required");
      return;
    }

    if (!stateCode || /^\s*$/.test(stateCode)) {
      setStateError("State is required");
      return;
    }

    if (!city || /^\s*$/.test(city)) {
      setCityError("City is required");
      return;
    }

    if (!phoneNumber) {
      setPhoneError("Phone number must be provided");
      return;
    }

    if (!phoneNumberRegex.test(phoneNumber)) {
      setPhoneError("Invalid Phone Number");
      return;
    }

    if (!zipCode || /^\s*$/.test(zipCode)) {
      setZipCodeError("Zip code is required");
      return;
    }

    setZipCodeError("");

    if (shippingAddressCheck) {
      const { address, countryCode, stateCode, city, zipCode } =
        ShipAddressFeilds;
      // setTermsError("");

      if (!address || /^\s*$/.test(address)) {
        setAddressErorShip("Street address is required");
        return;
      }

      if (!countryCode || /^\s*$/.test(countryCode)) {
        setCountryErrorShip("Country is required");
        return;
      }

      if (!stateCode || /^\s*$/.test(stateCode)) {
        setStateErrorShip("State is required");
        return;
      }

      if (!city || /^\s*$/.test(city)) {
        setCityErrorShip("City is required");
        return;
      }

      if (!zipCode || /^\s*$/.test(zipCode)) {
        setZipCodeErrorShip("Zip code is required");
        return;
      }
    }

    if (!termCheck) {
      setTermsError("Please agree to the terms of use and privacy policy");
      return;
    }
    // setIsLoading(true);
    dispatch(
      //for billing
      addAddress(
        AllAddressFeilds,
        shippingAddressCheck,
        setIsLoading,
        loginData?.token,
        navigate,
        dispatch,
        onActiveSectionChange,
        extractedCart,
        ShipAddressFeilds
      )
    );

    dispatch(saveAddress(AllAddressFeilds));
    onSetShipAddressFeildsLifted(!defaultAddressCheck && ShipAddressFeilds);
  };

  // console.log(ShipAddressFeilds);



  // console.log(AllAddressFeilds);
  useEffect(() => {
    if (
      activeSection === "address" &&
      loginData &&
      loginData.length !== 0
      // Object.keys(AllAddressFeilds).length !== 0
    ) {
      const selectedAddress = orderData?.addresses?.find((address) => {
        return (
          address.address_id === addressId ||
          (orderAdressesIds.length > 0 &&
            address.address_id ===
              orderAdressesIds[orderAdressesIds.length - 1])
        );
      });

      setSelectedAddress(selectedAddress);

      if (selectedAddress) {
        const {
          address_id,
          name,
          email,
          street_address,
          phone_number,
          zip_code,
          country,
          state,
          country_code,
          state_code,
          city,
          default_address_id,
        } = selectedAddress;
        setAllAddressFields((currentState) => ({
          ...currentState,
          address_id,
          name,
          email,
          address: street_address,
          phoneNumber: phone_number,
          zipCode: zip_code,
          countryCode: country_code,
          country: country,
          stateCode: state_code,
          state: state,
          city: city,
          default_address_id: default_address_id,
        }));
        setDefaultAddress(name);

        setSelectedCountry(() => {
          const foundCountry = countryData.find(
            (country) => country.isoCode === country_code
          );
          return {
            ...foundCountry,
            reset_id: 1,
          };
        });
        setSelectedCountryForCheckout(() => {
          const foundCountry = countryData.find(
            (country) => country.isoCode === country_code
          );
          return {
            ...foundCountry,
            reset_id: 1,
          };
        });
      } else {
      }
    }
  }, [activeSection, orderAdressesIds]);

  // useEffect(() => {
  //   if (ShipAddressFeildsLifted !== undefined) {
  //     setShipAddressFields((prev) => ({ ...prev, ...ShipAddressFeildsLifted }));
  //     console.log("checking lifting states useEffect");
  //   }
  // }, [ShipAddressFeildsLifted]);

  // console.log("shiplifted", ShipAddressFeildsLifted);
  // console.log("ship", ShipAddressFeilds);
  // console.log("selectedCountryShipping", selectedCountryShipping);

  useEffect(() => {
    if (activeSection !== "address") {
      return;
    }
    if (ShipAddressFeildsLifted !== undefined) {
      setShipAddressFields((prev) => ({ ...ShipAddressFeildsLifted }));
      const foundCountry = countryData.find(
        (country) => country.isoCode === ShipAddressFeildsLifted.countryCode
      );
      // console.log("in", foundCountry);
      setSelectedCountryShipping(() => {
        return {
          ...foundCountry,
        };
      });
      // console.log("checking lifting states useEffect");
    }
  }, [activeSection]); //yhan tk countries get hoker, selected coubtry reflect hogasamne reflect hoga

  useEffect(() => {
    if (ShipAddressFeildsLifted !== undefined) {
      const statesOfCountry = State.getStatesOfCountry(
        selectedCountryShipping?.isoCode
      );
      setStateDataShipping(statesOfCountry);
      setSelectedStateShipping((prevState) => {
        const stateData = statesOfCountry.find(
          (state) => state.isoCode === ShipAddressFeilds?.stateCode
        );
        return {
          ...stateData,
        };
      });

      // console.log("crucial 1 state");
      // console.log(ShipAddressFeilds?.countryCode);
      // const state = stateDataShipping?.find((state) => {
      //   return state.isoCode === ShipAddressFeilds?.stateCode;
      //   console.log(state.isoCode === ShipAddressFeilds?.stateCode);
      //   console.log(state);
      // });
      // console.log(state);
      // setSelectedStateShipping(state);
    }
  }, [selectedCountryShipping]); //yhan tk states gte hoker

  // useEffect(() => {
  //   if (ShipAddressFeildsLifted !== undefined) {
  //     console.log("crucial 2 state");
  //     console.log(ShipAddressFeilds?.city);
  //     const city = cityDataShipping?.find(
  //       (city) => city.name === ShipAddressFeilds?.city
  //     );
  //     console.log(city);
  //     setSelectedCityShipping(city);
  //   }
  // }, [selectedStateShipping]);

  useEffect(() => {
    if (ShipAddressFeildsLifted !== undefined) {
      // console.log("omg1");
      const citiesOfState = City.getCitiesOfState(
        selectedCountryShipping?.isoCode,
        selectedStateShipping?.isoCode
      );
      setSelectedCityShipping(() =>
        citiesOfState.find(
          (city) =>
            city.name.toLowerCase() === ShipAddressFeilds.city?.toLowerCase()
        )
      );
    }
  }, [selectedStateShipping]);

  useEffect(() => {
    if (ShipAddressFeildsLifted === undefined) {
      return;
    }

    if (!defaultAddressCheck) {
      return;
    }
    // console.log("wejwei");
    onShipAddressCheckLifted(false);
    onSetShipAddressFeildsLifted({});
  }, [defaultAddressCheck]);

  useEffect(() => {
    onShipAddressCheckLifted(
      ShipAddressFeilds?.address !== null ? true : false
    );
  }, [ShipAddressFeilds?.address]);

  // console.log("1 ", selectedCountryShipping);
  // console.log("2 ", selectedStateShipping);
  // console.log("3 ", selectedCityShipping);

  return (
    <div className={classMain}>
      {!orderData && !orderAdressesIds ? (
        <div
          style={{
            width: "100%",
            height: 100,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <PulseLoader color={"grey"} />
        </div>
      ) : (
        <div className={class1}>
          <div className="checkout-left">
            <div className="tab-content" id="pills-tabContent">
              <div className="tab-pane log-info fade show active">
                <div className="address-sec">
                  {headType === 1 ? (
                    <>
                      <div className="d-flex py-2 justify-content-between align-items-center w-100 ">
                        <div>
                          <h2>Address</h2>
                          <div className="title-line w-100"></div>
                        </div>

                        <div key={""}>
                          <Select
                            onChange={AddressFeildHandler}
                            value={defaultAddress}
                            // defaultOpen={true}
                          >
                            <Option key="SelectAddress">Select Address</Option>

                            {orderData !== "" &&
                              orderData?.addresses &&
                              orderData?.addresses.map((addressdata) => (
                                <Option
                                  key={addressdata.address_id}
                                  value={addressdata.address_id}
                                >
                                  {addressdata.name}
                                </Option>
                              ))}
                          </Select>
                        </div>
                      </div>

                      <div className="d-flex py-2 justify-content-between align-items-center  w-100 ">
                        <div>
                          <p className="d-inline ">
                            Complete Your Purchase by Entering Your Information
                          </p>
                        </div>
                      </div>
                    </>
                  ) : headType === 2 ? (
                    <div className="log-head-text border-bottom my-3">
                      <h4>Address Information</h4>
                    </div>
                  ) : null}

                  <form
                    className="g-3 needs-validation"
                    noValidate
                    id="address-form"
                  >
                    <div className="row">
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <MainInput
                          className={"mb-4"}
                          inputClassName={"form-control address-input"}
                          disabled={isLoading}
                          inputHeading={"Name: "}
                          required={true}
                          placeholderName={"Name"}
                          type={"text"}
                          htmlFor={"exampleInputEmail1"}
                          showError={nameError.length > 0}
                          errorMessage={nameError}
                          labelclassName={"form-label"}
                          value={AllAddressFeilds?.name}
                          onChange={(name) => {
                            if (name.length <= 100) {
                              setAllAddressFields((currentState) => ({
                                ...currentState,
                                name,
                              }));
                              setNameError("");
                            } else {
                              setNameError("Name cannot exceed 100 characters");
                              return;
                            }
                          }}
                        />
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <MainInput
                          className={"mb-4"}
                          inputClassName={"form-control address-input"}
                          disabled={isLoading}
                          inputHeading={"Email: "}
                          required={true}
                          placeholderName={"Email"}
                          type={"email"}
                          showError={emailError.length > 0}
                          errorMessage={emailError}
                          htmlFor={"exampleInputEmail1"}
                          labelclassName={"form-label"}
                          value={AllAddressFeilds.email}
                          onChange={(email) => {
                            if (email.length <= 320) {
                              setAllAddressFields((currentState) => ({
                                ...currentState,
                                email,
                              }));
                              setEmailError("");
                            } else {
                              setEmailError(
                                "Email cannot exceed 320 characters"
                              );
                              return;
                            }
                          }}
                        />
                      </div>
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <MainInput
                          className={"mb-4"}
                          inputClassName={"form-control address-input"}
                          disabled={isLoading}
                          inputHeading={"Street Address: "}
                          required={true}
                          placeholderName={"Street Address"}
                          type={"text"}
                          htmlFor={"exampleInputEmail1"}
                          labelclassName={"form-label"}
                          showError={addressError.length > 0}
                          errorMessage={addressError}
                          value={AllAddressFeilds.address}
                          onChange={(address) => {
                            if (address.length <= 100) {
                              setAllAddressFields((currentState) => ({
                                ...currentState,
                                address,
                              }));
                              setAddressEror("");
                            } else {
                              setAddressEror(
                                "Street Address cannot exceed 100 characters"
                              );
                              return;
                            }
                          }}
                        />
                      </div>
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <MainInput
                          className={"mb-4 "}
                          inputClassName={"w-100 py-10"}
                          disabled={isLoading}
                          inputHeading="Country: "
                          required={true}
                          type="select"
                          placeholderName="Select"
                          value={selectedCountry?.name}
                          showError={countryError.length > 0}
                          errorMessage={countryError}
                          onChange={handleCountryChange.bind(this, 1)}
                          options={countryData}
                        />
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <MainInput
                          className={"mb-4"}
                          inputClassName={"w-100 py-10"}
                          disabled={isLoading}
                          inputHeading="State: "
                          type="select"
                          placeholderName="Select"
                          value={selectedState?.name}
                          showError={stateError.length > 0}
                          errorMessage={stateError}
                          onChange={handleStateChange.bind(this, 1)}
                          options={stateData}
                          required={true}
                          // labelclassName="input-label"
                        />
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <MainInput
                          className={"mb-4"}
                          inputClassName={"w-100 py-10"}
                          disabled={isLoading}
                          inputHeading="City: "
                          type="select"
                          placeholderName="Select"
                          value={selectedCity?.name}
                          onChange={handleCityChange.bind(this, 1)}
                          showError={cityError.length > 0}
                          errorMessage={cityError}
                          options={cityData}
                          required={true}
                        />
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <PhonenoInput
                          disabled={isLoading}
                          inputHeading={"Phone Number: "}
                          placeholderName={"Select Country Code"}
                          htmlFor={"exampleInputEmail1"}
                          labelclassName={"form-label"}
                          required={true}
                          value={AllAddressFeilds.phoneNumber}
                          key={"nexus"}
                          showError={phoneError.length > 0}
                          errorMessage={phoneError}
                          onChange={(phoneNumber) => {
                            setAllAddressFields((currentState) => ({
                              ...currentState,
                              phoneNumber,
                            }));
                            setPhoneError("");
                          }}
                        />
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <MainInput
                          className={"mb-4"}
                          inputClassName={"form-control address-input"}
                          disabled={isLoading}
                          inputHeading={"Zip Code: "}
                          placeholderName={"Zip Code"}
                          type={"number"}
                          required={true}
                          showError={zipCodeError.length > 0}
                          errorMessage={zipCodeError}
                          htmlFor={"exampleInputEmail1"}
                          labelclassName={"form-label"}
                          value={AllAddressFeilds.zipCode}
                          onChange={(zipCode) => {
                            if (zipCode.length <= 5) {
                              setAllAddressFields((currentState) => ({
                                ...currentState,
                                zipCode,
                              }));
                              setZipCodeError("");
                            } else {
                              setZipCodeError(
                                "Zipcode cannot exceed 05 digits"
                              );
                              return;
                            }
                          }}
                        />
                      </div>

                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 mt-3">
                        <MainInput
                          className={"mb-3 form-check"}
                          inputClassName={"form-check-input"}
                          disabled={isLoading}
                          inputHeading={"Ship into different address"}
                          type={"checkbox"}
                          htmlFor={"default"}
                          labelclassName={"form-check-label"}
                          isChecked={shippingAddressCheck}
                          onChange={() => {
                            setShippingAddressCheck((prev) => !prev);
                            setDefaultAddressCheck((prev) => !prev);
                            setTermsError("");
                            setShipAddressFields((prev) => ({
                              ...prev,
                              email: AllAddressFeilds.email,
                              name: AllAddressFeilds.name,
                              phoneNumber: AllAddressFeilds.phoneNumber,
                            }));
                            // console.log("checking shiping addres setting");
                          }}
                        />
                      </div>

                      {/*  */}
                      {shippingAddressCheck && (
                        <>
                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <MainInput
                              className={"mb-4"}
                              inputClassName={"form-control address-input"}
                              disabled={isLoading}
                              inputHeading={"Street Address: "}
                              required={true}
                              placeholderName={"Street Address"}
                              type={"text"}
                              htmlFor={"exampleInputEmail1"}
                              labelclassName={"form-label"}
                              showError={addressErrorShip.length > 0}
                              errorMessage={addressErrorShip}
                              value={
                                // ShipAddressFeildsLifted?.address ||
                                ShipAddressFeilds.address
                              }
                              onChange={(address) => {
                                // console.log("wewew");
                                if (address.length <= 100) {
                                  setShipAddressFields((currentState) => ({
                                    ...currentState,
                                    address,
                                  }));
                                  setAddressErorShip("");
                                } else {
                                  setAddressErorShip(
                                    "Street Address cannot exceed 100 characters"
                                  );
                                  return;
                                }
                              }}
                            />
                          </div>
                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <MainInput
                              className={"mb-4 "}
                              inputClassName={"w-100 py-10"}
                              disabled={isLoading}
                              inputHeading="Country: "
                              required={true}
                              type="select"
                              placeholderName="Select"
                              value={selectedCountryShipping?.name}
                              showError={countryErrorShip.length > 0}
                              errorMessage={countryErrorShip}
                              onChange={handleCountryChange.bind(this, 2)}
                              options={countryData}
                            />
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <MainInput
                              className={"mb-4"}
                              inputClassName={"w-100 py-10"}
                              disabled={isLoading}
                              inputHeading="State: "
                              type="select"
                              placeholderName="Select"
                              value={selectedStateShipping?.name}
                              showError={stateErrorShip.length > 0}
                              errorMessage={stateErrorShip}
                              onChange={handleStateChange.bind(this, 2)}
                              options={stateDataShipping}
                              required={true}
                              // labelclassName="input-label"
                            />
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <MainInput
                              className={"mb-4"}
                              inputClassName={"w-100 py-10"}
                              disabled={isLoading}
                              inputHeading="City: "
                              type="select"
                              placeholderName="Select"
                              value={selectedCityShipping?.name}
                              onChange={handleCityChange.bind(this, 2)}
                              showError={cityErrorShip.length > 0}
                              errorMessage={cityErrorShip}
                              options={cityDataShipping}
                              required={true}
                            />
                          </div>

                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <MainInput
                              className={"mb-4"}
                              inputClassName={"form-control address-input"}
                              disabled={isLoading}
                              inputHeading={"Zip Code: "}
                              placeholderName={"Zip Code"}
                              type={"number"}
                              required={true}
                              showError={zipCodeErrorShip.length > 0}
                              errorMessage={zipCodeErrorShip}
                              htmlFor={"exampleInputEmail1"}
                              labelclassName={"form-label"}
                              value={
                                // ShipAddressFeildsLifted?.zipCode ||
                                ShipAddressFeilds.zipCode
                              }
                              onChange={(zipCode) => {
                                if (zipCode.length <= 5) {
                                  // console.log("err");
                                  setShipAddressFields((currentState) => ({
                                    ...currentState,
                                    zipCode,
                                  }));
                                  setZipCodeErrorShip("");
                                } else {
                                  setZipCodeErrorShip(
                                    "Zipcode cannot exceed 05 digits"
                                  );
                                  return;
                                }
                              }}
                            />
                          </div>
                        </>
                      )}
                      {/*  */}
                      {Ischeckbox ? (
                        <>
                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <MainInput
                              className={"mb-3 form-check"}
                              inputClassName={"form-check-input"}
                              disabled={isLoading}
                              inputHeading={"Save as default ship address"}
                              type={"checkbox"}
                              htmlFor={"default"}
                              labelclassName={"form-check-label"}
                              isChecked={defaultAddressCheck}
                              onChange={HandleDefaultAddressCheck}
                            />
                          </div>
                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <MainInput
                              className={"mb-3 form-check"}
                              inputClassName={"form-check-input"}
                              disabled={isLoading}
                              inputHeading={
                                <>
                                  I agree with Kings Distributor{" "}
                                  <Link
                                    className="text-decoration-none"
                                    to="/return-policy"
                                  >
                                    <b
                                      style={{
                                        cursor: "pointer",
                                        color: "#007aff",
                                      }}
                                    >
                                      Terms
                                    </b>{" "}
                                    {""}
                                  </Link>{" "}
                                  of Use and{" "}
                                  {/* <Link to="/privacy-policy">
                                    Privacy Policy
                                  </Link> */}
                                  <Link
                                    className="text-decoration-none"
                                    to="/privacy-policy"
                                  >
                                    <b
                                      style={{
                                        cursor: "pointer",
                                        color: "#007aff",
                                      }}
                                    >
                                      Privacy Policy
                                    </b>{" "}
                                    {""}
                                  </Link>
                                </>
                              }
                              type={"checkbox"}
                              htmlFor={"default"}
                              labelclassName={"form-check-label"}
                              showError={termsError.length > 0}
                              errorMessage={termsError}
                              isChecked={termAndConditonCheck}
                              onChange={HandleTermAndConditonCheck}
                            />
                          </div>
                        </>
                      ) : null}

                      {isBottomButtonCentered ? (
                        <div className="col-xl-12 col-lg-5 col-md-12 col-sm-12 col-xs-12 d-flex justify-content-center align-items-center">
                          <CategoryButton
                            buttonName={btnName}
                            className={className}
                            type={"submit"}
                          />
                        </div>
                      ) : (
                        <div className="col-xl-4 col-lg-5 col-md-12 col-sm-12 col-xs-12">
                          <CategoryButton
                            className={className}
                            buttonName={
                              isLoading ? (
                                <CustomLoader
                                  size={14}
                                  className={"loaderStyle mb-3"}
                                />
                              ) : (
                                "Save and Continue"
                              )
                            }
                            disabled={isLoading}
                            onClick={handlePostData}
                          />
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FormSection;
