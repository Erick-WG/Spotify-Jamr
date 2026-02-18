import React from "react";
import App from "@/App";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


const Index = () => {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<App />}/>
        </Routes>
    </Router>
  )
}

export default Index
