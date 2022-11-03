// import './App.css';
import Products from './components/products/products';
import Login from './components/Login/Login';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register/Register';
import DetailCard from './components/detail/detail';
import Stripe from './components/Stripe/Stripe';
import Formaddcomp from './components/Formaddcomp/Formaddcomp'
import { LandingPage } from './components/Landing/landing';

function App() {
  return (
    <div className="App container">
      <BrowserRouter>
        <Routes>
        <Route path="/payment" element={<Stripe/>}/>
          <Route path="/detail/:id" element={<DetailCard/>}/>
          <Route path='/' element={<LandingPage />} />
          <Route path="/product/:id" element={<DetailCard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products/add" element={<Formaddcomp/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
