import React, {useState} from "react";
import "/src/styles/items.css";
import {Item} from "./add/item";
import {Category} from "./add/category";
import "/src/styles/items.css";

export const Add = (props) => {
  const [type, setType] = useState(null);

  const handleType = (e) => {
    setType(e.target.value);
  }
  
  return (
    <div>
      <h1>Adicionar</h1>
      <select onChange={handleType}>
        <option selected disabled>Escolha</option>
        <option value="category">Categoria</option>
        <option value="item">Item de categoria</option>
      </select>
      {type && type === "item" ? <Item keyX={props.keyX}/> : type === "category" ? <Category keyX={props.keyX}/> : null}
    </div>
  )
}