import React from "react";
import numeral from "numeral";
import "../Style/Table.css";

function Table({ countries, selectedCase }) {
  
  return (
    <div className="table">
      {countries.map((country) => (
        <tr>
          <td>{country.country}</td>
          <td>
            <strong>{numeral(country[selectedCase]).format("0,0")}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
