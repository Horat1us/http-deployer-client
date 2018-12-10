import * as React from "react";
import * as ReactDOM from "react-dom";
import Layout from "./Layout";

const container = document.getElementById('content-overlay');
if (!container) {
    throw new Error("Container can not be found!");
}

ReactDOM.render(<Layout />, container);
