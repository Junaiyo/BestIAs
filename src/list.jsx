import React from "react";
import "./styles/style.css";
import {Items} from "./items";

export const List = (props) => {
    const {items} = props;
    const {extras} = props;
  return (
    <div>
        <details>
            <summary><span className="spn">{props.name}</span></summary>
            {items.map((item, index) => (<Items key={index} name={item} extras={extras[index]}/>))}
        </details>
    </div>
  )
}