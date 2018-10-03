import React from "react";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const SaveBtn = props => (
  <span className="save-btn">
    <button type="button" className="btn btn-info btn-sm" {...props}>Save</button>
  </span>
);

export default SaveBtn;