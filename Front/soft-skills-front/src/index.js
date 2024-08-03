import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));

const onRedirectCallback = (appState) => {
  window.location.href = "/";
};

root.render(
  <Auth0Provider
    domain={ process.env.AUTH0_DOMAIN }
    clientId={ process.env.AUTH0_CLIENT_ID }
    authorizationParams={{ redirect_uri: window.location.origin }}
    onRedirectCallback={onRedirectCallback}
  >
    <App />
  </Auth0Provider>
);
