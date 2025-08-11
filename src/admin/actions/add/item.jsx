import React, {useState, useEffect} from "react";
import "/src/styles/items.css";

export const Item = (props) => {
  const [names, setNames] = useState();
  const [selected, setSelected] = useState(null);
  const [itemNum, setItemNum] = useState(null);
  const [inputs, setInputs] = useState([]);
  const [itemsName, setItemName] = useState([]);
  const [currentItem, setCurrentItem] = useState("");
  const [nameDesc, setNameDesc] = useState([]);
  const [currentItemDesc, setCurrentItemDesc] = useState("");
  const [utilities, setUtilities] = useState([]);
  const [currentUti, setCurrentUti] = useState("");
  const [login, setLogin] = useState([]);
  const [currentLogin, setCurrentLogin] = useState("")
  const [link, setLink] = useState([]);
  const [clink, sclink] = useState("")
  const [every, setEvery] = useState([]);
  const [publish, setPublish] = useState(false);

  const handleSelect = (e) => {
    setSelected(e.target.value);
  }

  const handleNum = (e) => {
    setItemNum(e.target.value);
  }

  const handleItem = (e) => {
    setCurrentItem(e.target.value);
  }

  const handleNameDesc = (e) => {
    setCurrentItemDesc(e.target.value);
  }

  const handleUtilities = (e) => {
    setCurrentUti(e.target.value);
  }

  const handleLogin = (e) => {
    setCurrentLogin(e.target.value);
  }

  const handleLink = (e) => {
    sclink(e.target.value);
  }

  const handleAll = () => {
    setItemName(prev => [...prev, currentItem])
    setNameDesc(prev => [...prev, [currentItemDesc]]);
    setUtilities(prev => [...prev, [currentUti]]);
    setLogin(prev => [...prev, [currentLogin]]);
    setLink(prev => [...prev, [clink]]);
};

  const [TryPublish, setTryPublish] = useState(false);
  const [Msg, setMsg] = useState(null);
  const Publish = () => {
  itemsName.map((item, index) => {
    setEvery(prev => [...prev, [nameDesc[index], utilities[index], link[index], login[index]]])
    });
  if (every.length == itemNum) {
    fetch("https://bestiasapi.onrender.com/api/add/item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": props.keyX
      },
      body: JSON.stringify({
        listName: selected,
        item: JSON.stringify(itemsName),
        description: JSON.stringify(every)
      })
      
      }
    ).then((res) => res.text()).then((data) => {
      setMsg(data);
      setTryPublish(true);
    });
  }
  }
  
  useEffect(() => {
  if (itemNum == 0) {
    setItemNum(null);
    setInputs([]);
   }
  }, [itemNum]);
  
  useEffect(() => {
    fetch("https://bestiasapi.onrender.com/api/getAll").then((res) => res.json()).then((data) => setNames(data))
  }, [])

  for (let i = 0; i < itemNum; i++) {
    inputs.push([<input type="text" placeholder={`Nome do item ${i}`} onChange={handleItem}/>, <input type="text" placeholder={`Nome do: ${i}`} onChange={handleNameDesc}/>, <input type="text" placeholder={`Utilidades do: ${i}`} onChange={handleUtilities}/>, <input type="text" placeholder={`Precisa de login: ${i}`} onChange={handleLogin}/>, <input type="text" placeholder={`Link do: ${i}`} onChange={handleLink}/>])
  }

  useEffect(() => {
    if (inputs.length == itemNum && itemNum !== 0) {
      setPublish(true);
    } else {
      setPublish(false);
    }
  }, [inputs, itemNum]);
  
  return (
    <div>
      <h2>Para qual categoria?</h2>
      <select onChange={handleSelect}>
        <option selected disabled>Selecione uma categoria</option>
        {names ? names.map((nam, index) => (
          <option key={index}>{nam.listName}</option>
        )) : "loading..."}
      </select>
      {selected && <input type="number" placeholder="Quantidade de itens" onChange={handleNum} />}
      {itemNum && inputs.map((item, index) => {
      if (index < itemNum) {
        return item;
      }
      })}
      {currentItem && <button onClick={handleAll}>Salvar</button>}
      {publish && <button onClick={Publish}>Publicar</button>}
      {TryPublish && <p>{Msg}</p>}
    </div>
  )
}
