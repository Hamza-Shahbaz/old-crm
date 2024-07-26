import React, { useEffect, useState } from "react";
import CategoryButton from "../button/CategoryButton";
import MainInput from "../input/MainInput";
import { useDispatch, useSelector } from "react-redux";
import PhonenoInput from "../input/PhonenoInput";
import { City, Country, State } from "country-state-city";
import { MyToast, toast } from "../../components/toast/MyToast";
import { handleInfoUpdate } from "../../redux/actions/AuthAction";
import CustomLoader from "../toast/CustomLoader";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function LoginInformatiionSection({ sectionHeading, formindex }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setIsLoading] = useState(false);
  const nameInputRegex = /^[a-zA-Z]*$/;
  const [currentPassword, setCurrentPassword] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const [ConfirmPassword, setConfirmPassword] = useState(false);
  const [zipCodeError, setZipCodeError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [stateError, setStateError] = useState("");
  const [cityError, setCityError] = useState("");
  const [addressError, setAddressEror] = useState("");
  const [nameError, setNameError] = useState("");
  const [lastnameError, setLastNameError] = useState("");
  const [cityData, setCityData] = useState();
  const [stateData, setStateData] = useState();

  const [selectedCountry, setSelectedCountry] = useState({
    name: null,
  });

  const [selectedState, setSelectedState] = useState({
    name: null,
  });

  const [selectedCity, setSelectedCity] = useState({
    name: null,
  });

  const loginData = useSelector((state) => state.AuthReducerData.loginUser);

  const updateProfileInfoData = useSelector(
    (state) => state.updateProfileReducerData.updateProfileData
  );

  const token = loginData?.token;

  let countryData = Country.getAllCountries();

  const addAddressReducer = useSelector(
    (state) => state.OrderReducerData.addressDataFeilds
  );

  const [allFeilds, setAllFields] = useState({
    firstname:
      (updateProfileInfoData && updateProfileInfoData?.data?.first_name) ||
      (loginData && loginData?.first_name) ||
      "",

    lastname:
      (updateProfileInfoData && updateProfileInfoData?.data?.last_name) ||
      (loginData && loginData?.last_name) ||
      "",
    address:
      (addAddressReducer && addAddressReducer?.address) ||
      (updateProfileInfoData && updateProfileInfoData?.data?.street_address) ||
      (loginData && loginData?.street_address) ||
      "",

    phoneNumber:
      (addAddressReducer && addAddressReducer?.phoneNumber) ||
      (updateProfileInfoData && updateProfileInfoData?.data?.phone_number) ||
      updateProfileInfoData?.data?.phone ||
      (loginData && loginData?.phone_number) ||
      null,

    zipCode:
      (addAddressReducer && addAddressReducer?.zipCode) ||
      (updateProfileInfoData && updateProfileInfoData?.data?.zipcode) ||
      (loginData && loginData?.zipcode) ||
      "",
    oldpass: "",
    newpass: "",
    confirmpass: "",
  });

  const [resetallFeilds, setresetAllFields] = useState(false);

  useEffect(() => {
    if (resetallFeilds) {
      setAllFields((prevState) => ({
        ...prevState,
        oldpass: "",
        newpass: "",
        confirmpass: "",
      }));
      setresetAllFields(false);
    }
  }, [resetallFeilds]);

  useEffect(() => {
    if (selectedCountry?.reset_id === 1) {
      const statesOfCountry = State.getStatesOfCountry(
        selectedCountry?.isoCode
      );
      setStateData(statesOfCountry);

      // Use the updater function form of setSelectedState to ensure the stateData is updated
      setSelectedState((prevState) => {
        const stateData = statesOfCountry.find(
          (state) => state.isoCode === allFeilds?.stateCode
        );
        return {
          ...stateData,
          reset_id: 1,
        };
      });
    } else {
      setStateData(State.getStatesOfCountry(selectedCountry?.isoCode));
    }
  }, [selectedCountry, allFeilds?.stateCode]); // Include AllAddressFeilds?.stateCode in the dependencies array

  useEffect(() => {
    if (selectedState?.reset_id === 1) {
      const citiesOfState = City.getCitiesOfState(
        selectedCountry?.isoCode,
        selectedState?.isoCode
      );

      setSelectedCity((prevCity) =>
        citiesOfState.find(
          (city) => city.name.toLowerCase() === allFeilds.city.toLowerCase()
        )
      ); // Make sure AllAddressFeilds.city is already set
    } else {
      setCityData(
        City.getCitiesOfState(selectedCountry?.isoCode, selectedState?.isoCode)
      );
    }
  }, [selectedState, selectedCountry, allFeilds.city]); // Include selectedCountry and AllAddressFeilds.city in the dependencies array

  const handleCountryChange = (type, value) => {
    setCountryError("");
    if (type === 1) {
      //  if (type ) {

      const country = countryData.find((country) => country.isoCode === value);
      setSelectedCountry(country);
      setAllFields((prev) => ({
        ...prev,
        countryCode: country.isoCode,
        country: country.name,
      }));
      setSelectedCountry(country);
      setAllFields((prev) => ({
        ...prev,
        stateCode: null,
        city: null,
      }));
      setSelectedState(null);
      setSelectedCity(null);
    }
  };

  const handleStateChange = (value) => {
    setStateError("");
    const state = stateData.find((state) => state.isoCode === value);
    setSelectedState(state);
    setAllFields((prev) => ({ ...prev, stateCode: state.isoCode }));
    setAllFields((prev) => ({
      ...prev,
      city: null,
    }));
    setSelectedCity(null);
  };

  const handleCityChange = (value) => {
    setCityError("");
    const city = cityData.find((city) => city.name === value);
    setSelectedCity(city);
    setAllFields((prev) => ({ ...prev, city: city.name }));
  };

  useEffect(() => {
    if (loginData && loginData.length !== 0) {
      setAllFields((currentState) => ({
        ...currentState,
        countryCode: loginData?.country,
        stateCode: loginData?.state,
        city: loginData?.city,
      }));

      setSelectedCountry(() => {
        const foundCountry = countryData.find(
          (country) => country.isoCode === loginData?.country
        );
        return {
          ...foundCountry,
        };
      });
    }
  }, [loginData]);

  useEffect(() => {
    if (updateProfileInfoData && updateProfileInfoData?.data) {
      setAllFields((currentState) => ({
        ...currentState,
        countryCode: updateProfileInfoData?.data?.country,
        stateCode: updateProfileInfoData?.data?.state,
        city: updateProfileInfoData?.data?.city,
      }));

      setSelectedCountry(() => {
        const foundCountry = countryData.find(
          (country) => country.isoCode === updateProfileInfoData?.data?.country
        );
        return {
          ...foundCountry,
        };
      });
    }
  }, [updateProfileInfoData]);

  useEffect(() => {
    if (addAddressReducer && addAddressReducer.length !== 0) {
      setAllFields((currentState) => ({
        ...currentState,
        countryCode: addAddressReducer?.countryCode,
        stateCode: addAddressReducer?.stateCode,
        city: addAddressReducer?.city,
      }));

      setSelectedCountry(() => {
        const foundCountry = countryData.find(
          (country) => country.isoCode === addAddressReducer?.countryCode
        );
        // console.log("foundCountry---------------------------", foundCountry);
        return {
          ...foundCountry,
        };
      });
    }
  }, [addAddressReducer]);

  useEffect(() => {
    const statesOfCountry = State.getStatesOfCountry(selectedCountry?.isoCode);
    setStateData(statesOfCountry);

    // Use the updater function form of setSelectedState to ensure the stateData is updated
    setSelectedState((prevState) => {
      const stateData = statesOfCountry.find(
        (state) => state.isoCode === addAddressReducer?.stateCode
      );
      return {
        ...stateData,
      };
    });
  }, [selectedCountry]); // Include AllAddressFeilds?.stateCode in the dependencies array

  useEffect(() => {
    const statesOfCountry = State.getStatesOfCountry(selectedCountry?.isoCode);
    setStateData(statesOfCountry);

    // Use the updater function form of setSelectedState to ensure the stateData is updated
    setSelectedState((prevState) => {
      const stateData = statesOfCountry.find(
        (state) => state.isoCode === allFeilds?.stateCode
      );
      return {
        ...stateData,
      };
    });
  }, [selectedCountry]); // Include AllAddressFeilds?.stateCode in the dependencies array

  useEffect(() => {
    const citiesOfState = City.getCitiesOfState(
      selectedCountry?.isoCode,
      selectedState?.isoCode
    );

    setSelectedCity(() =>
      citiesOfState.find(
        (city) =>
          city.name.toLowerCase() === addAddressReducer?.city?.toLowerCase()
      )
    ); // Make sure AllAddressFeilds.city is already set
  }, [selectedState]); // Include selectedCountry and AllAddressFeilds.city in the dependencies array

  useEffect(() => {
    const citiesOfState = City.getCitiesOfState(
      selectedCountry?.isoCode,
      selectedState?.isoCode
    );

    setSelectedCity(() =>
      citiesOfState.find(
        (city) => city.name.toLowerCase() === allFeilds?.city?.toLowerCase()
      )
    ); // Make sure AllAddressFeilds.city is already set
  }, [selectedState]); // Include selectedCountry and AllAddressFeilds.city in the dependencies array

  function iconHandler(field) {
    if (field === "oldpass") {
      setCurrentPassword(!currentPassword);
    } else if (field === "newpass") {
      setNewPassword(!newPassword);
    } else if (field == "confirmpass") {
      setConfirmPassword(!ConfirmPassword);
    }
  }

  const handleUpdateData = async () => {
    const phoneNumberRegex = /^[+]{0}(?:[0-9\-\\(\\)\\/.]\s?){6,15}[0-9]{1}$/;
    const {
      firstname,
      address,
      countryCode,
      stateCode,
      city,
      phoneNumber,
      zipCode,
    } = allFeilds;

    if (!firstname) {
      setNameError("First Name is required");
      return;
    }

    if (!address) {
      setAddressEror("Street address is required");
      return;
    }

    if (!countryCode || /^\s*$/.test(countryCode)) {
      setCountryError("Country is required");
      return;
    }

    if (!stateCode) {
      setStateError("State is required");
      return;
    }

    if (!city) {
      setCityError("City is required");
      return;
    }

    if (!phoneNumber) {
      setPhoneError("Phone number is required");
      return;
    }

    if (!phoneNumberRegex.test(phoneNumber)) {
      setPhoneError("Invalid Phone Number");
      return;
    }
    
    if (!zipCode) {
      setZipCodeError("Zip code is required");
      return;
    }
    setZipCodeError("");

    setIsLoading(true);
    dispatch(
      handleInfoUpdate(
        allFeilds,
        setIsLoading,
        dispatch,
        token,
        // isCheckFlag,
        navigate,
        setresetAllFields
      )
    );
  };

  return (
    <section>
      {formindex === 1 ? (
        <div className="log-info border px-4">
          <div className="log-head-text border-bottom ">
            <h4>{sectionHeading}</h4>
          </div>
          <div className="row">
            {/* <label className="customradio mx-2 mt-2">
              <input
                type="radio"
                onClick={handleRadioClick}
                checked={checked}
                name="radio-expire"
              />
              <span className="checkmark" />
            </label> */}

            <div className="col-4 col-sm-3 col-md-3 col-lg-3">
              <div className="labelStylePassword">
                <label htmlFor="oldpassword">
                  Current Password: <span style={{ color: "red" }}>*</span>
                </label>
              </div>

              <div className="labelStylePassword1">
                <label htmlFor="newpassword">
                  New Password: <span style={{ color: "red" }}>*</span>
                </label>
              </div>

              <div className="labelStylePassword1">
                <label htmlFor="confirmpassword">
                  Confirm Password: <span style={{ color: "red" }}>*</span>
                </label>
              </div>
            </div>
            <div className="col-8 col-sm-9 col-md-9 col-lg-9 mt-0">
              <MainInput
                // disabled1={!checked}
                // className={"mb-3"}
                inputClassName={"form-control address-input"}
                // inputHeading={"Password :"}
                placeholderName={"******"}
                htmlFor={"exampleInputEmail1"}
                labelclassName={"form-label"}
                value={allFeilds?.oldpass}
                myIconStyle={{ top: 35 }}
                onChange={(oldpass) => {
                  if (oldpass.length <= 50) {
                    setAllFields((currentState) => ({
                      ...currentState,
                      oldpass,
                    }));
                  } else {
                    MyToast("Password cannot exceed 50 digits.", "error");
                    toast.clearWaitingQueue();
                    return;
                  }
                }}
                onIconClick={() => iconHandler("oldpass")}
                type={currentPassword ? "text" : "password"}
                icon={
                  currentPassword ? (
                    <IoEye color="#2e3192" size={18} />
                  ) : (
                    <IoEyeOff color="#2e3192" size={18} />
                  )
                }
              />

              <MainInput
                // disabled1={!checked}
                // className={"mb-3"}
                inputClassName={"form-control address-input"}
                // inputHeading={"Password :"}
                placeholderName={"******"}
                htmlFor={"exampleInputEmail1"}
                labelclassName={"form-label"}
                myIconStyle={{ top: 35 }}
                value={allFeilds?.newpass}
                onChange={(newpass) => {
                  if (newpass.length <= 50) {
                    setAllFields((currentState) => ({
                      ...currentState,
                      newpass,
                    }));
                  } else {
                    MyToast("Password cannot exceed 50 digits.", "error");
                    toast.clearWaitingQueue();
                    return;
                  }
                }}
                onIconClick={() => iconHandler("newpass")}
                type={newPassword ? "text" : "password"}
                icon={
                  newPassword ? (
                    <IoEye color="#2e3192" size={18} />
                  ) : (
                    <IoEyeOff color="#2e3192" size={18} />
                  )
                }
              />

              <MainInput
                // disabled1={!checked}
                // className={"mb-3"}
                inputClassName={"form-control address-input"}
                // inputHeading={"Password :"}
                placeholderName={"******"}
                htmlFor={"exampleInputEmail1"}
                labelclassName={"form-label"}
                myIconStyle={{ top: 35 }}
                value={allFeilds?.confirmpass}
                onChange={(confirmpass) => {
                  if (confirmpass.length <= 50) {
                    setAllFields((currentState) => ({
                      ...currentState,
                      confirmpass,
                    }));
                  } else {
                    MyToast("Password cannot exceed 50 digits.", "error");
                    toast.clearWaitingQueue();
                    return;
                  }
                }}
                onIconClick={() => iconHandler("confirmpass")}
                type={ConfirmPassword ? "text" : "password"}
                icon={
                  ConfirmPassword ? (
                    <IoEye color="#2e3192" size={18} />
                  ) : (
                    <IoEyeOff color="#2e3192" size={18} />
                  )
                }
              />
              {/* <input
                disabled={!checked}
                type="password"
                id="password1"
                className="form-input form-control"
                placeholder="Current Password"
                value={allFeilds?.oldpass}
                onChange={(event) => {
                  const oldPassword = event.target.value;
                  setAllFields({
                    ...allFeilds,
                    oldpass: oldPassword,
                  });
                }}
              /> */}

              <div className="col-lg-5 mt-3">
                <CategoryButton
                  buttonName={
                    loading ? (
                      <CustomLoader size={14} className={"loaderStyle mb-3"} />
                    ) : (
                      "Save Changes"
                    )
                  }
                  className="btn btn-continue log-info-btn mb-3 w-75"
                  style={{ padding: "10px 0px" }}
                  onClick={() => {
                    const passwordRegex =
                      /^(?=.*[0-9])(?=.*[!@#$%^&*_\-\/\\{}()+=,.`~?:;<>'"])[a-zA-Z0-9!@#$%^&*_\-\/\\{}()+=,.`~?:;<>'"]{8,}$/;
                    if (allFeilds?.oldpass === "") {
                      MyToast("Current Password is required", "error");
                      toast.clearWaitingQueue();
                      return;
                    }

                    if (allFeilds?.newpass === "") {
                      MyToast("New Password is required", "error");
                      toast.clearWaitingQueue();
                      return;
                    }

                    if (!passwordRegex.test(allFeilds?.newpass)) {
                      MyToast(
                        "Password must be at least 8 characters and include a symbol and a number.",
                        "error"
                      );
                      toast.clearWaitingQueue();
                      return;
                    }

                    if (allFeilds?.newpass !== allFeilds?.confirmpass) {
                      MyToast(
                        "Password & confirmation password doesn't match",
                        "error"
                      );
                      toast.clearWaitingQueue();
                      return;
                    }
                    setIsLoading(true);

                    dispatch(
                      handleInfoUpdate(
                        allFeilds,
                        setIsLoading,
                        dispatch,
                        token,
                        // isCheckFlag,
                        navigate,
                        setresetAllFields
                      )
                    );
                  }}
                  disabled={loading}
                />
              </div>
            </div>
          </div>
        </div>
      ) : formindex === 2 ? (
        <div className="log-info border px-4">
          <div className="profile-head-text border-bottom ">
            <h4>{sectionHeading}</h4>
          </div>

          <div className="log-info row ">
            <div className="col-3 col-sm-2 col-md-2 col-lg-2">
              <div className="pt-3">
                <label htmlFor="email">Email:</label>
              </div>
            </div>
            <div className="col-8 col-sm-9 col-md-9 col-lg-9 py-2">
              <div className="d-flex justify-content-between align-items-center">
                <p style={{ paddingTop: 10 }} className="paraStyle">
                  {loginData?.email}
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6 pt-3 ">
              <MainInput
                labelclassName={"per-info-label py-2"}
                className={"mb-3"}
                inputClassName={"form-control address-input"}
                inputHeading={"First Name: "}
                showError={nameError.length > 0}
                errorMessage={nameError}
                required={true}
                placeholderName={"First Name"}
                type={"text"}
                value={allFeilds?.firstname}
                onChange={(firstname) => {
                  if (firstname?.length <= 50) {
                    if (nameInputRegex.test(firstname)) {
                      setAllFields((currentState) => ({
                        ...currentState,
                        firstname,
                      }));
                      setNameError("");
                    } else {
                      setNameError(
                        "First Name must consist of only Alphabets."
                      );
                    }
                  } else {
                    setNameError("First Name cannot exceed 50 characters.");
                    return;
                  }
                }}
              />
            </div>

            <div className="col-lg-6 pt-lg-3 ">
              <MainInput
                labelclassName={"per-info-label py-2"}
                className={"mb-3"}
                inputClassName={"form-control address-input"}
                inputHeading={"Last Name: "}
                placeholderName={"Last Name"}
                showError={lastnameError.length > 0}
                errorMessage={lastnameError}
                type={"text"}
                value={allFeilds?.lastname}
                onChange={(lastname) => {
                  // const emptyregex = /^.+$/;
                  // console.log("lastname", lastname);
                  // if (!emptyregex.test(lastname)) {
                  //   setLastNameError("Last Name cannot be empty.");
                  //   return;
                  // }
                  if (lastname?.length <= 50) {
                    if (nameInputRegex.test(lastname)) {
                      setAllFields((currentState) => ({
                        ...currentState,
                        lastname,
                      }));
                      setLastNameError("");
                    } else {
                      setLastNameError(
                        "Last Name must consist of only Alphabets."
                      );
                    }
                  } else {
                    setLastNameError("Last Name cannot exceed 50 characters.");
                    return;
                  }
                }}
              />
            </div>

            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <MainInput
                className={"mb-4"}
                inputClassName={"form-control address-input"}
                inputHeading={"Street Address: "}
                // required={true}
                placeholderName={"Street Address"}
                type={"text"}
                required={true}
                htmlFor={"exampleInputEmail1"}
                labelclassName={"form-label"}
                showError={addressError.length > 0}
                errorMessage={addressError}
                value={allFeilds.address}
                onChange={(address) => {
                  if (address.length <= 100) {
                    setAllFields((currentState) => ({
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
                inputHeading="Country: "
                type="select"
                showError={countryError.length > 0}
                errorMessage={countryError}
                required={true}
                placeholderName="Select"
                value={selectedCountry?.name}
                onChange={handleCountryChange.bind(this, 1)}
                options={countryData}
              />
            </div>

            {/* {selectedCountry && ( */}
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <MainInput
                className={"mb-4"}
                inputClassName={"w-100 py-10"}
                inputHeading="State: "
                type="select"
                required={true}
                placeholderName="Select"
                showError={stateError.length > 0}
                errorMessage={stateError}
                value={selectedState?.name}
                onChange={handleStateChange}
                options={stateData}
                // required={true}
                // labelclassName="input-label"
              />
            </div>

            {/* {selectedState && ( */}
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <MainInput
                className={"mb-4"}
                inputClassName={"w-100 py-10"}
                inputHeading="City: "
                type="select"
                required={true}
                placeholderName="Select"
                showError={cityError.length > 0}
                errorMessage={cityError}
                value={selectedCity?.name}
                onChange={handleCityChange}
                options={cityData}
                // required={true}
              />
            </div>

            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-4">
              <PhonenoInput
                inputHeading={"Phone Number: "}
                placeholderName={"Select Country Code"}
                htmlFor={"exampleInputEmail1"}
                labelclassName={"form-label"}
                required={true}
                showError={phoneError.length > 0}
                errorMessage={phoneError}
                value={allFeilds.phoneNumber}
                key={"nexus"}
                onChange={(phoneNumber) => {
                  setAllFields((currentState) => ({
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
                labelclassName={"per-info-label py-1"}
                inputClassName={"form-control address-input"}
                inputHeading={"Zip Code: "}
                required={true}
                placeholderName={"Zip Code"}
                type={"number"}
                showError={zipCodeError.length > 0}
                errorMessage={zipCodeError}
                htmlFor={"exampleInputEmail1"}
                // labelclassName={"form-label"}
                value={allFeilds.zipCode}
                onChange={(zipCode) => {
                  if (zipCode.length <= 5) {
                    setAllFields((currentState) => ({
                      ...currentState,
                      zipCode,
                    }));
                    setZipCodeError("");
                  } else {
                    setZipCodeError("Zipcode cannot exceed 05 digits.");
                    return;
                  }
                }}
              />
            </div>

            <div className="col-lg-5 mb-4 buttonCenter">
              <CategoryButton
                buttonName={
                  loading ? (
                    <CustomLoader size={14} className={"loaderStyle mb-3"} />
                  ) : (
                    "Save Changes"
                  )
                }
                className="btn log-info-btn btn-continue w-75"
                style={{ padding: "8px 28px" }}
                onClick={handleUpdateData}
                disabled={loading}
              />
            </div>
            <div></div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

export default LoginInformatiionSection;
