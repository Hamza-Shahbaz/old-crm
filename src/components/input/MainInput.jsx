import React, { useEffect } from "react";
import { Select, ConfigProvider } from "antd";

const MainInput = ({
  className,
  inputHeading,
  type,
  inputClassName,
  placeholderName,
  value,
  onChange,
  labelclassName,
  htmlFor,
  onIconClick,
  icon,
  options,
  isChecked,
  enterKeyHandler,
  required,
  myIconStyle,
  disabled,
  disabled1,
  errorMessage,
  showError,
  isValue,
  onClick,
}) => {
  const alternateOptions = [{ value: "no info" }];

  const filteredOptions = options?.map((option) =>
    option.isoCode
      ? {
          value: option.isoCode,
          label: option.name,
        }
      : {
          value: option.name,
          label: option.name,
        }
  );

  useEffect(() => {
    const biElements = document.querySelectorAll('.bi');
    biElements.forEach(biElement => {
      const children = biElement.children;
      Array.from(children).forEach(child => {
        child.style.backgroundColor = 'white';
      });
    });
  }, [disabled]);


  return (
    <div className={className} style={{ position: "relative" }}>
      <label htmlFor={htmlFor} className={labelclassName}>
        {inputHeading}
        {required && <span style={{ color: "red" }}>*</span>}{" "}
        {/* Red asterisk if required */}
      </label>
      <div
        style={{ position: "absolute", right: 16, top: 42, ...myIconStyle }}
        onClick={onIconClick}
      >
        {icon}
      </div>
      {type === "checkbox" ? (
        <>
          <input
            value={isValue}
            disabled={disabled}
            type={type}
            maxLength={20}
            className={inputClassName}
            checked={isChecked}
            onChange={onChange}
            onClick={onClick}
          />
          {showError && errorMessage && (
            <p
              className="mx-1"
              style={{ color: "red", fontSize: "0.8em", marginTop: "0.5em" }}
            >
              {errorMessage}
            </p>
          )}
        </>
      ) : type === "select" ? (
        <ConfigProvider
          theme={{
            token: {
              Select: {
                optionActiveBg: "#fbb53b",
              },
            },
          }}
        >
          <Select
            showSearch={true}
            disabled={disabled}
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label.toLowerCase() ?? "").includes(input.toLowerCase())
            }
            style={{
              height: "47px",
            }}
            dropdownStyle={
              {
                // Add any dropdown styles here if needed
              }
            }
            className={`${inputClassName} custom-select ${disabled && "bi"} `}
            placeholder={placeholderName}
            value={value}
            onChange={onChange}
            options={
              options && filteredOptions ? filteredOptions : alternateOptions
            }
          />
          {showError && errorMessage && (
            <p
              className="mx-1"
              style={{ color: "red", fontSize: "0.8em", marginTop: "0.5em" }}
            >
              {errorMessage}
            </p>
          )}
        </ConfigProvider>
      ) : (
        <>
          <input
            disabled={disabled}
            type={type}
            className={inputClassName}
            placeholder={placeholderName}
            required={true}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                enterKeyHandler();
              }
            }}
          />
          {showError && errorMessage && (
            <p
              className="mx-1"
              style={{ color: "red", fontSize: "0.8em", marginTop: "0.5em" }}
            >
              {errorMessage}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default MainInput;
