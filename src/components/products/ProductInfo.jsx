import React from "react";

function ProductInfo({ attributes }) {
  return (
    <table className="table table-striped">
      <tbody>
        {Object.keys(attributes).map((key) => (
          <tr key={key}>
            <th>{attributes[key].attribute_title}</th>
            <td>{attributes[key].value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductInfo;
