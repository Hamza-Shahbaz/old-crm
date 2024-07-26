import React, { useState, useEffect } from "react";
import { Select, Space } from "antd";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BaseUrl, EndPoints } from "../../utils/Api";
import { BounceLoader } from "react-spinners";
import dummyImage from "../../assets/images/no-image1.png";

const SearchInput = ({ className }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let debounceTimer;

    if (searchQuery.trim()) {
      debounceTimer = setTimeout(() => {
        fetchSearchResults(searchQuery);
      }, 800);
    } else {
      setSearchResults([]);
    }

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  function getIdHandler(id) {
    navigate("/product/" + "productid=" + id, { state: { id: id } });
  }

  const fetchSearchResults = async (inputValue) => {
    try {
      setLoading(true);
      if (inputValue.trim() !== "") {
        const response = await fetch(
          `${BaseUrl}${EndPoints.search_product}${inputValue}`
        );
        const data = await response.json();

        if (data.status && data.data && data.data.products_data) {
          const transformedData = Object.values(data.data.products_data).map(
            ({ product_id, product_name, image_path }) => ({
              value: product_id,
              label: product_name,
              img: image_path,
            })
          );

          setTimeout(() => {
            setSearchResults(transformedData);
          }, 1);
        } else {
          setSearchResults([{ value: "nf", label: data?.message }]);
          // console.error("Failed to fetch search results");
        }
      } else {
      }
    } catch (error) {
      console.error("Frontend Error: Error fetching search results:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 5);
    }
  };

  const handleImageError = (e) => {
    e.target.onerror = null; // prevent infinite loop
    e.target.src = dummyImage;
  };

  return (
    <div className="input-group has-search">
      <span className="form-control-feedback px-3">
        <FaSearch className="iconStyle1" />
      </span>
      <Select
        style={{
          width: "100%",
          height: 50,
        }}
        suffixIcon={false}
        defaultOpen={false}
        className={className}
        placeholder="Search.."
        onChange={getIdHandler}
        optionLabelProp="label"
        filterOption={false}
        showSearch={true}
        optionFilterProp="children"
        options={searchResults}
        onSearch={(value) => setSearchQuery(value)}
        notFoundContent={
          loading ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "10px",
                marginTop: "10px",
              }}
            >
              <div>
                <BounceLoader size={25} color="#2e3192" />
              </div>
            </div>
          ) : null
        }
        optionRender={(option) => {
          if (loading) {
          } else {
            return (
              <Space>
                {option.data?.img && (
                  <img
                    onError={handleImageError}
                    src={option.data.img ? option.data.img : dummyImage}
                    alt={option.data.label}
                    style={{
                      width: "30px",
                      height: "30px",
                      marginRight: "8px",
                    }}
                  />
                )}
                <p className="searchTextStyle pt-3">{option.data?.label}</p>
              </Space>
            );
          }
        }}
      />
    </div>
  );
};

export default SearchInput;
