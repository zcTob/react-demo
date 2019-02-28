import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello } from "./components/Hello";
// import "./typescript.ts"
let myAge = 24;
let like = ['html', 'css'];

function handleChange (id: string, e:any) {
    console.log('change', id, e)
}


ReactDOM.render(
    <Hello compiler="zy" framework="React" age={myAge} like={like} type="213" change={handleChange}/>,
    document.getElementById("example")
);
