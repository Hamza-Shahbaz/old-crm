import React, { useState, useEffect } from "react";
import { initialState, variant_combo_reference } from "../../config/data";
import CategoryButton from "../button/CategoryButton";

const VariantSelector = () => {
  const [variants, setVariants] = useState(initialState);
  const [selectedVariants, setSelectedVariants] = useState([]);
  const [filteredVariants, setFilteredVariants] = useState(null);

  useEffect(() => {
    // Set initial selected variants
    const initialSelectedVariants = [];
    for (const typeId in variants.variant_types) {
      const selectedVariantId = Object.values(
        variants.variant_types[typeId]
      ).find((variant) => variant.selected_variant !== null)?.variant_id;
      if (selectedVariantId !== undefined) {
        initialSelectedVariants.push({
          variant_type_id: parseInt(typeId),
          variant_id: selectedVariantId,
        });
      }
    }
    setSelectedVariants(initialSelectedVariants);
  }, []);

  useEffect(() => {
    // Filter the variant_combo_reference object based on the selected variant combination
    const variantTypeIds = selectedVariants.map((item) => item.variant_id);
    const variantTypeIdsString = variantTypeIds.join(",");
    const filteredVariantsObj = Object.keys(variant_combo_reference)
      .filter((key) => key === variantTypeIdsString)
      .reduce((obj, key) => {
        obj[key] = variant_combo_reference[key];
        return obj;
      }, {});
    setFilteredVariants(filteredVariantsObj);
  }, [selectedVariants]);

  const handleVariantChange = (variantType, variantId) => {
    const updatedSelectedVariants = selectedVariants.map((item) => {
      if (item.variant_type_id === variantType) {
        return { ...item, variant_id: variantId };
      }
      return item;
    });
    setSelectedVariants(updatedSelectedVariants);
  };

  return (
    <form>
      <div className="product-filter-sec">
        {Object.keys(variants.variant_types).map((variantTypeKey, index) => {
          const variantType = variants.variant_types[variantTypeKey];
          return (
            <div
              key={index}
              className="d-flex align-items-center justify-content-between mb-4"
            >
              <label className="name">
                {variantType[Object.keys(variantType)[0]].variant_type_title}
              </label>
              <div className="choose-size">
                <select
                  className="form-select ns"
                  aria-label={`Select ${
                    variantType[Object.keys(variantType)[0]].variant_type_title
                  }`}
                  onChange={(e) =>
                    handleVariantChange(
                      parseInt(variantTypeKey),
                      parseInt(e.target.value)
                    )
                  }
                  value={
                    selectedVariants.find(
                      (variant) =>
                        variant.variant_type_id === parseInt(variantTypeKey)
                    )?.variant_id || ""
                  }
                >
                  <option value="">
                    Select{" "}
                    {
                      variantType[Object.keys(variantType)[0]]
                        .variant_type_title
                    }
                  </option>
                  {Object.values(variantType).map((variant, idx) => (
                    <option key={idx} value={variant.variant_id}>
                      {variant.variant_title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          );
        })}

        <div className="row mt-4">
          <div className="col-md-6">
            <CategoryButton
              onClick={() => {
                // Handle ADD TO BAG button click
              }}
              buttonName={"ADD TO BAG"}
              className={"btn btn-add-to-bag w-100 mb-3"}
              type={"button"}
            />
          </div>
          <div className="col-md-6">
            <CategoryButton
              buttonName={"SAVE IT TO WISHLIST"}
              className={"btn btn-black-outline w-100 mb-3"}
              type={"button"}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default VariantSelector;
