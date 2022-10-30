import './App.css';
import Navbar from './components/navbar/navbar';
import Products from './components/products/products';
import Login from './components/Login/Login';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register/Register';
import DetailCard from './components/detail/detail';

function App() {
  return (
    <div className="App container">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/detail/:id" element={<DetailCard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products?search=:search" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
