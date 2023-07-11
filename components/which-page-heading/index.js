import React from "react";
import "./index.css";

export default function WhichPageHeading({ heading, componentId }) {

  return (
    <div className="Headings" id={componentId}>
      <div className="HeadingsWrapper">
        <h1>{heading}</h1>
      </div>
    </div>
  );
}
