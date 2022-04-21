import React from 'react';
import ReactDOM from 'react-dom';
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './output.css';
import App from './App';
import About from "./Routes/about"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>    
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="about" element={<About />} />
      </Routes>      
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);