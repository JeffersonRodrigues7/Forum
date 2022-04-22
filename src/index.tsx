import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComp from "./views/components/Navbar/NavbarComp";

ReactDOM.render(
    <React.StrictMode>
        <NavbarComp />
    </React.StrictMode>,
    document.getElementById("root")
);
