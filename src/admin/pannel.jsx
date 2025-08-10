import React, {useState} from "react"
import "/src/styles/items.css";
import {Selects} from "./selects";

export const Pannel = (props) => {
  const [selected, setSelected] = useState(null);

  const handleSelect = (e) => {
    setSelected(e.target.value);
  }
  
  return (
    <div>
      <h1>Painel de controle</h1>
      <select onChange={handleSelect}>
        <option selected>Selecione uma opção</option>
        <option value="add">Adicionar</option>
      </select>
      {selected && <Selects selected={selected} keyX={props.keyX}/>}
    </div>
  )
}