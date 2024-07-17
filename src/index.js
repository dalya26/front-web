/*!

=========================================================
* Black Dashboard React v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

//import RTLLayout from "layouts/RTL/RTL.js";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";

import PGPNavbar from "components/Navbars/PGPNavbar.js";
import AdminLayout from "layouts/Admin/Admin.js";
import UserProfile from "views/UserProfile";


//<Route path="/admin/*" element={<TableList />} />
const root = ReactDOM.createRoot(document.getElementById("root"));
// Obtener el token de autenticación del almacenamiento local
const token = localStorage.getItem('token');

// Configurar el token de autenticación para todas las solicitudes salientes
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

root.render(
  <ThemeContextWrapper>
    <BackgroundColorWrapper>
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/weblog/programming/*" element={<PGPNavbar />} />

          {/* Ruta para redirigir a /weblog/ si el usuario está autenticado */}
          <Route
            path="/weblog/*"
            element={!token ? <Navigate to="/weblog/programming" /> : <AdminLayout  />}
          />

          {/* Redirección por defecto */}
          <Route
            path="*"
            element={<Navigate to="/weblog/programming" replace />}
          />
        </Routes>
      </BrowserRouter>
    </BackgroundColorWrapper>
  </ThemeContextWrapper>
);
