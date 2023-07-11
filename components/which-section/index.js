import React from "react";
import "./index.css";
import { StaticImage } from "@limio/sdk";

export default function WhichSection({image, header, text, componentId}): React.Node {
  return (
    <div className="Section" id={componentId}>
      <div className={`SectionWrapper`}>
        <div className="BodyContainer">
          <div className="TextContainer">
            <h2 className="Header" data-limio-prop="header">
              {header}
              Limio PoC 11/7/2023
            </h2>
            <div className="Text" data-limio-prop="text__limio_richtext" dangerouslySetInnerHTML={{ __html: text }} />
          </div>
          <div className="ImageContainer">
            <StaticImage src={image} className={`Image`} />
          </div>
        </div>
      </div>
    </div>
  );
}
