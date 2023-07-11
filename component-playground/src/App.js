// @flow
import React, { useState } from "react";
import { ComponentSelector } from "./ComponentSelector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { ErrorBoundary } from "./ErrorBoundary";
import "bootstrap/dist/css/bootstrap.min.css";
import { Header as PageHeader } from "./Header";
import { Provider } from "react-redux";
import { createStore } from "redux";

import { LimioProvider } from "@limio/sdk";
import "./App.css";

// import MediafinBusinessPackHeading from "../../components/mediafin-business-pack-heading";
// import MediafinBusinessPackSection from "../../components/mediafin-business-pack-section";
import WhichSection from "../../components/which-section";

import { footerSectionProps } from "./props";

const props = { image: "https://which-dev.prod.limio.com/public/48c9df2b-b06f-4730-aa37-29c0ebd8f6ff/hero_banner_png.png", header: "Spend wisely – join Which?", text: "Our tests find you the best products to buy and show you the ones to avoid, so you don’t waste your money." };

function createLocalStore(initialState) {
  const store = createStore((x) => x, {});
  return store;
}

const appStore = createLocalStore({ appConfig: { mode: "production" } });

function App() {
  let params = new URL(document.location).searchParams;

  const [user, setUser] = useState({});
  const [endpoint, setEndpoint] = useState(
    params.get("endpoint") || "https://localhost:9002"
  );
  const [key, setKey] = useState(0);
  const [selectedComponents, setSelectedComponents] = useState([WhichSection]);

  return (
    <div>
      <PageHeader
        onSetUser={setUser}
        endpoint={endpoint}
        setEndpoint={setEndpoint}
      >
        <ComponentSelector
          onSelect={setSelectedComponents}
          components={[]}
          selectedComponents={selectedComponents}
        />
        <button
          className="btn"
          onClick={() => {
            setKey(key + 1);
          }}
        >
          <FontAwesomeIcon icon={faSyncAlt} />
        </button>
      </PageHeader>

      <div>
        <ErrorBoundary>
          <LimioProvider key={key}>
            {selectedComponents.map((Component, i) => (
              <Provider store={appStore}>
                <Component key={i} {...props} />
              </Provider>
            ))}
          </LimioProvider>
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;
