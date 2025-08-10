import React from "react";
import "./styles/items.css";
import {Details} from "./details"

export const Items = (props) => {
  const {extras, name} = props;
  
  return (
    <div className="back">
      <details className="deta">
        <summary className="summar">{name}</summary>
      <Details description={extras}/>
      </details>
    </div>
  )
}