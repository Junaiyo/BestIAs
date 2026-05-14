import React, {useState, useEffect} from "react";
import "/src/styles/items.css";

export const Category = (props) => {
  const [category, setCategory] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [items, setItems] = useState([]);
  const [itemsName, setItemName] = useState([]);
  const [currentItem, setCurrentItem] = useState("");
  const [publish, setPublish] = useState(false);
  const [nameDesc, setNameDesc] = useState([]);
  const [currentName, setCurrentName] = useState("");
  const [utilities, setUtilities] = useState([]);
  const [currentUti, setCurrentUti] = useState("");
  const [login, setLogin] = useState([]);
  const [currentLogin, setCurrentLogin] = useState("")
  const [link, setLink] = useState([]);
  const [clink, sclink] = useState("")
  
  const handleCategory = (e) => {
    setCategory(e.target.value);
  }

  const handleQuantity = (e) => {
    setQuantity(Number(e.target.value));
  }

  const handleItem = (e) => {
    setCurrentItem(e.target.value);
  }

  const handleNameDesc = (e) => {
    setCurrentName(e.target.value);
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

  const [all, setAll] = useState([]);
  const handleAll = () => {
    setItemName(prev => [...prev, currentItem])
    setNameDesc(prev => [...prev, [currentName]]);
    setUtilities(prev => [...prev, [currentUti]]);
    setLogin(prev => [...prev, [currentLogin]]);
    setLink(prev => [...prev, [clink]]);
};

  const [TryPublish, setTryPublish] = useState(false);
  const [Msg, setMsg] = useState(null);
const Publish = () => {
  itemsName.map((item, index) => {
    setAll(prev => [...prev, [nameDesc[index], utilities[index], link[index], login[index]]])
    });
  if (all.length === quantity) {
    fetch("/api/add/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": props.keyX
      },
      body: JSON.stringify({
        category: category,
        items: JSON.stringify(itemsName),
        descriptions: JSON.stringify(all)
      })
      
      }
    ).then((res) => res.text()).then((data) => {
      setMsg(data);
      setTryPublish(true);
    });
  }
}

  for (let i = 0; i < quantity; i++) {
    items.push([<input type="text" placeholder={`Nome do item ${i}`} onChange={handleItem}/>, <input type="text" placeholder={`Nome do: ${i}`} onChange={handleNameDesc}/>, <input type="text" placeholder={`Utilidades do: ${i}`} onChange={handleUtilities}/>, <input type="text" placeholder={`Precisa de login: ${i}`} onChange={handleLogin}/>, <input type="text" placeholder={`Link do: ${i}`} onChange={handleLink}/>])
  }

  useEffect(() => {
  if (quantity === 0) {
    setQuantity(null);
    setItems([]);
   }
  }, [quantity]);

  useEffect(() => {
    if (items.length === quantity && quantity !== 0) {
      setPublish(true);
    } else {
      setPublish(false);
    }
  }, [items, quantity]);
  
  return (
    <div>
      <h2>Adicionar categoria</h2>
      <input type="text" placeholder="Nome da categoria" onChange={handleCategory}/>
      {category && 
        <input type="number" placeholder="Quantidade de itens" onChange={handleQuantity}/>
      }
      {quantity && items.map((item, index) => {
      if (index < quantity) {
        return item;
      }
      })}
      {currentItem && <button onClick={handleAll}>Salvar</button>}
      {publish && <button onClick={Publish}>Publicar</button>}
      {TryPublish && <p>{Msg}</p>}
    </div>
  )
}