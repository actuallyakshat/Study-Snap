import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import TimerProvider from "./Components/Timer/TimerProvider.jsx";
import { AuthContextProvider } from "./Components/Auth/AuthProvider.jsx";
//env imports
const clientId = import.meta.env.VITE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <TimerProvider>
          <App />
        </TimerProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
