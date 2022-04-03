import React from "react";
import { formatMoney } from "../util";

function PropertyView({ property }) {
  const s = property;
  return (
    <div>
      <b>{s.address}</b>
      <br />
      {s.city}, {s.state}
      <br />
      {s.beds} beds, {s.baths} baths
      <br />
      {s.sqft} square feet
      <br />
      <br />
      {formatMoney(s.price)}
      {s.url && (
        <span>
          &nbsp;
          <a href={s.url} target="_blank">
            View
          </a>
        </span>
      )}
    </div>
  );
}

export default PropertyView;
