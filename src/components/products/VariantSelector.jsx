import React, { useState, useEffect } from "react";

const VariantSelector = ({
  variant_types,
  variant_combo_reference,
  setFilteredVariantsforParent,
  onGetVariantComboReferenceId,
}) => {
  const initialState = {
    variant_types: variant_types,
  };

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

  useEffect(() => {
    setFilteredVariantsforParent(filteredVariants);
    onGetVariantComboReferenceId(
      selectedVariants.map((item) => item.variant_id).join(",")
    );
  }, [filteredVariants]);

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
      </div>
    </form>
  );
};

export default VariantSelector;
