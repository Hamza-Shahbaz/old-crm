import React from "react";

function AccordionListCheckbox({
  accordionHeadingName,
  items,
  onChange,
  checked,
  type,
}) {
  let propertyForHeading = accordionHeadingName.split(" ").join("");

  return (
    <div className="accordion-item mb-3 mx-1">
      <h3 className="accordion-header" id={`${propertyForHeading}filter`}>
        <button
          type="button"
          className="accordion-button collapsed"
          data-bs-toggle="collapse"
          data-bs-target={`#${propertyForHeading}`}
        >
          {accordionHeadingName}
        </button>
      </h3>
      <div id={propertyForHeading} className="accordion-collapse collapse">
        <div className="card-body px-0 py-2">
          {type === "multi_dropdown" ? (
            <>
              {items[0].variant_types?.map((item, index) => (
                <AccordionListCheckbox
                  key={`${item.title}-${index}-1`}
                  accordionHeadingName={item.title}
                  items={item.records.map(
                    (elem) => elem.title + " (" + elem.no_of_products + " )"
                  )}
                  onChange={(e) => onChange.handleVariantChanged(e, item)}
                  checked={Object.values(checked.variants)}
                  type={undefined}
                />
              ))}
              {items[1].attributes?.map((item, index) => (
                <AccordionListCheckbox
                  key={`${item.title}-${index}-3`}
                  accordionHeadingName={item.title}
                  items={item.records.map(
                    (elem) => elem.title + " (" + elem.no_of_products + " )"
                  )}
                  onChange={(e) => onChange.handleAttributeChange(e, item)}
                  checked={Object.values(checked.attributes)}
                  type={undefined}
                />
              ))}
            </>
          ) : (
            <div className="form-check-inline">
              {items.map((item, index) => (
                <label key={index} className="customcheckbox">
                  <span className="checkboxtextsty">{item}</span>
                  <input
                    type="checkbox"
                    name={`${propertyForHeading}-checkbox-${index}`}
                    value={item}
                    onChange={(e) => onChange(e.target.value)}
                    checked={checked?.includes(item)}
                  />
                  <span className="checkmark"></span>
                </label>
              ))}
            </div>



          )}
        </div>
      </div>
    </div>
  );
}

export default AccordionListCheckbox;


{/* <div className="accordion-item mb-3 mx-1">
<h3
  className="accordion-header"
  id={`${accordionHeadingName}filter`}
>
  <button
    type="button"
    className="accordion-button collapsed"
    data-bs-toggle="collapse"
    data-bs-target={`#${accordionHeadingName}`}
  >
    {accordionHeadingName}
  </button>
</h3>
<div
  id={accordionHeadingName}
  className="accordion-collapse collapse"
>
  <div className="card-body px-0 py-2">
    <div className="form-check-inline">
      {items.map((item, index) => (
        <label key={index} className="customradio">
          <span className="radiotextsty">{item}</span>
          <input type="radio" name={groupName} value={item} onChange={onChange} checked= {checked}/>
          <span className="checkmark"></span>
        </label>
      ))}
    </div>
  </div>
</div>
</div> */}