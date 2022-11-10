import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import store from "./Redux/Store";
import axios from 'axios';

axios.defaults.baseURL = "https://compudevs.herokuapp.com" || "http://localhost:3001";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>

);
