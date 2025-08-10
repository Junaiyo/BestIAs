import React from "react";
import "./styles/items.css";

export const Details = (props) => {
  return (
    props.description.map((desc, index) => {
        return (
        <p className="parag" key={index}>{desc}</p>
        )
    })
  )
}