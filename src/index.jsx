import React from "react";
import {createRoot} from "react-dom/client";
import "./styles/style.css";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {App} from "./app";
import {Admin} from "./admin/admin";

const Index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />}/>
        <Route path="/home" element={<App />}/>
        <Route path="/admin" element={<Admin />}/>
      </Routes>
    </BrowserRouter>
  )
}

const root = createRoot(document.getElementById("root"))
root.render(<Index />);
