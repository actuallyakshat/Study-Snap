import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import TimerProvider from "./Components/Timer/TimerProvider.jsx";
// const domain = `${import.meta.env.VITE_DOMAIN}`;
// const clientId = `${import.meta.env.VITE_CLIENT_ID}`;
// console.log("clientId: ", clientId);
// console.log("domain: ", domain);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <TimerProvider>
        <Auth0Provider
          domain="dev-va3ob1dac8fm3vni.us.auth0.com"
          clientId="vbqR2Ewo8TUWkAjUIovnZuZvF5Bl7g7h"
          authorizationParams={{
            audience: "https://studysnapbackend.com/auth0-api",
            scope: "openid profile email",
            redirect_uri: "http://localhost:5173/dashboard/",
          }}
        >
          <App />
        </Auth0Provider>
      </TimerProvider>
    </BrowserRouter>
  </React.StrictMode>
);
