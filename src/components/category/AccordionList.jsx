import React from "react";

function AccordionList({ accordionHeadingName, items, onChange, checked }) {
  const groupName = `${accordionHeadingName}-radio`;

  return (
    <div className="accordion-item mb-3 mx-1">
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
    </div>
  );
}

export default AccordionList;
