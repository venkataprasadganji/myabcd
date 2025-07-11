import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // optional
import 'bootstrap/dist/css/bootstrap.min.css';
import './i18n'; // import before anything that uses translation



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
