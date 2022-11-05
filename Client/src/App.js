// import './App.css';
import Products from './components/products/products';
import Login from './components/Login/Login';
import Login2 from './components/Login/Login2';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register/Register';
import Register2 from './components/Register/Register2';
import DetailCard from './components/detail/detail';
import Stripe from './components/Stripe/Stripe';
import Formaddcomp from './components/Formaddcomp/Formaddcomp'
import { LandingPage } from './components/Landing/landing';
import Cart from './components/cart/cart';
import UserDetail from './components/Register/userDetail';
const loggedIn = window.localStorage.getItem('isLogged')
function App() {
  return (
    <div className="App container">
      <BrowserRouter>
        <Routes>
          <Route path="/payment" element={<Stripe />} />
          <Route path="/detail/:id" element={<DetailCard />} />
          <Route path='/' element={loggedIn ? <UserDetail /> : <LandingPage />} />
          <Route path="/product/:id" element={<DetailCard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login2 />} />
          <Route path="/register" element={<Register2 />} />
          <Route path="/products/add" element={<Formaddcomp />} />
          <Route path='/userDetail' element={<UserDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
