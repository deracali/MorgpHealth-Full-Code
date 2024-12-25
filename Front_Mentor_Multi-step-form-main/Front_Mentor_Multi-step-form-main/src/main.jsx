import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { PersonalInfoProvider } from "./context/PersonalInfoContext";

ReactDOM.createRoot(document.getElementById("root")).render(

<PersonalInfoProvider>
<App />
</PersonalInfoProvider>

);
