import React from "react";
import "./index.css";

export default function WhichButton({ copy, alertMessage, componentId }) {
  const handleClick = () => {
    alert(alertMessage);
  };

  return (
    <div className="Section" id={componentId}>
      <button onClick={handleClick}>{copy}</button>
    </div>
  );
}
