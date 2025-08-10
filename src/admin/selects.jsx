import React from "react";
import {Add} from "./actions/add"
import "/src/styles/items.css";

export const Selects = (props) => {
  const Actions = {
    "add": <Add keyX={props.keyX} />
  }
  return <>
    {Actions[props.selected]}
  </>
}