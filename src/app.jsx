import React, {useState, useEffect} from "react";
import "./styles/style.css";
import {List} from "./list";

export const App = () => {
  const [isMenu, setIsMenu] = useState(false);
  const [data, setData] = useState(null);

  const fetchData = () => {
    fetch("/api/getall").then((res) => res.json()).then((data) => {
      const data2 = data.map((item) => {
        const modifyDescription = JSON.parse(item.descriptions).map((item2) => {
          return [
            item2[0],
            item2[1],
            item2[3],
            <a href={item2[2]} target="_blank">Link</a>
          ]
            })
        return {
          id: item.id,
          name: item.listName,
          items: JSON.parse(item.items),
          description: modifyDescription
        };
      });
      setData(data2);
    }).catch((error) => console.log(error))
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="top">
        <button className="hamburguer" onClick={() => {setIsMenu(true)}}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      </div>
      <h1>Melhores IAs por categoria </h1>
      {data ? data.map((item, index) => (
        <List key={index}
          name={item.name}
          items={item.items}
          extras={item.description}
          />
      )) : <p>Loading...</p>}
    </div>
  )
}