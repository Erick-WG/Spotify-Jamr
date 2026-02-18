import React from "react";
import Connect from "@features/access/Connect";
import App from "@/App";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./features/access/Login";


const Index = () => {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<App />}/>
            <Route path="login" element={<Login />}/>
            <Route path="connect" element={<Connect />}/>
        </Routes>
    </Router>
  )
}

export default Index
