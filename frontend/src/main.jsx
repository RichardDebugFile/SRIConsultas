import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import "./styles.css";
import EmailRucForm from "./pages/EmailRucForm.jsx";
import VehicleForm from "./pages/VehicleForm.jsx";
import LicenseForm from "./pages/LicenseForm.jsx";
import Summary from "./pages/Summary.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<EmailRucForm />} />
          <Route path="vehiculo" element={<VehicleForm />} />
          <Route path="licencia" element={<LicenseForm />} />
          <Route path="resumen" element={<Summary />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);