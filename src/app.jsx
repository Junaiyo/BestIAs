import React, {useState, useEffect} from "react";
import "./styles/style.css";
import {List} from "./list";

fetch("/api/seed")

export const App = () => {
  const [isMenu, setIsMenu] = useState(false);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isGames, setIsGames] = useState(false);
  
  const fetchData =  async (api) => {
    try {
      const res = await fetch(api);
      const data = await res.json();
      const data2 = data.map((item) => {
        const modifyDescription = JSON.parse(item.descriptions).map((item2) => {
            return [
              item2[0],
              item2[1],
              item2[3],
              <a href={item2[2]} target="_blank">Link</a>,
              item2[4] ? <details>
            <summary><span className="spn">Variantes</span></summary>
                {item2[4].map((variante, index) => (<><a className="parag v" href={variante}>Variante {index}</a></>))}
              </details> : null
            ]
        })
        return {
          id: item.id,
          name: item.listName,
          items: JSON.parse(item.items),
          description: modifyDescription
        };
      })
    setData(data2);
    setIsLoading(false);
    } catch (error) {
      setError(error);
    }
  }

  useEffect(() => {
    fetchData("/api/getall");
  }, []);

  const alterToOther = () => {
    setIsMenu(false);
    setIsLoading(true);
    if (!isGames) {
    fetchData("/api/get/games");
      setIsGames(true);
      return;
    }
    fetchData("/api/getall");
    setIsGames(false);
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="top">
        <button className="hamburguer" onClick={() => {setIsMenu(!isMenu)}}>
        <span></span>
        <span></span>
        <span></span>
      </button>
        {isMenu && <div className="menuDropdown">
          <button onClick={()=>alterToOther()}>{isGames ? "IAs" : "Games"}</button>
        </div>}
      </div>
      <h1>{!isGames ? "Melhores IAs por categoria" : "Melhores jogos de navegador por categoria"}</h1>
      {data.map((item, index) => (
        <List key={index}
          name={item.name}
          items={item.items}
          extras={item.description}
          />
      ))}
    </div>
  )
}