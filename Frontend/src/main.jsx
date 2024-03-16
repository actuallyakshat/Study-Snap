import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import TimerProvider from "./Components/Timer/TimerProvider.jsx";

//env imports
const clientId = import.meta.env.VITE_CLIENT_ID;
const domain = import.meta.env.VITE_DOMAIN;
const audience = import.meta.env.VITE_AUDIENCE;
const scope = import.meta.env.VITE_SCOPE;
const redirect_uri = import.meta.env.VITE_REDIRECT_URI;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <TimerProvider>
        <Auth0Provider
          domain={domain}
          clientId={clientId}
          cacheLocation="localstorage"
          authorizationParams={{
            audience: audience,
            scope: scope,
            redirect_uri: redirect_uri,
          }}
        >
          <App />
        </Auth0Provider>
      </TimerProvider>
    </BrowserRouter>
  </React.StrictMode>
);
