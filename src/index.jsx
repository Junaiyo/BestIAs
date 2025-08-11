import React from "react";
import {createRoot} from "react-dom/client";
import "./styles/style.css";
import {HashRouter, Routes, Route, Navigate} from "react-router-dom";
import {App} from "./app";
import {Admin} from "./admin/admin";

const Index = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />}/>
        <Route path="/home" element={<App />}/>
        <Route path="/admin" element={<Admin />}/>
      </Routes>
    </HashRouter>
  )
}

const root = createRoot(document.getElementById("root"))
root.render(<Index />);
