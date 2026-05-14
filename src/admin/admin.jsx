import React, {useState, useEffect} from "react";
import "/src/styles/items.css";
import {Pannel} from "./pannel";

export const Admin = () => {
  const [password, setPassword] = useState(null);
  const [verified, setVerified] = useState(false);
  const [submitted, setSubmitted] = useState(null);
  const [keyX, setKeyX] = useState(null);

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const verify = () => {
    fetch(`/api/verify?key=${password}`).then((res) => res.text()).then((data) => {
      setVerified(data === "true" ? true : false);
    })
    setSubmitted(true);
  }

  useEffect(() => {
    if (verified) {
      setKeyX(password);
    }
  }, [verified])
  
  return (
    <div className="adm">
      <input type="password" placeholder="Senha" onChange={handlePassword}/>
      <button onClick={verify}>submit</button>
      {submitted ? verified ? <p id="att">Acesso liberado</p> : <p id="att">Acesso negado</p> : null}
      {verified && <Pannel keyX={keyX}/>}
    </div>
  )
}