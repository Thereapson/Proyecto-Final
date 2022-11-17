import React from 'react'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import swal from 'sweetalert';


const BACK_URL  = 'https://compudevs.herokuapp.com'


function ForgotPassword() {
    const [email, setEmail] = useState("");
    const history = useNavigate();

    const handleSubmit = e => {
        e.preventDefault()
        // const data = {
        //   email:email
        // }
        console.log(email)
       fetch(`${BACK_URL}/users/forgotPassword`, {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type" :"application/json",
          // mode: 'no-cors',
          Accept: "application/json",
          // "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          email,
        }),
       })
       .then((res) => res.json())
       .then((data) => {
        console.log(data, "userRegister")
        alert(data.status)
       })
    swal({
      title: "Te enviamos las instrucciones a tu correo electronico",
      icon: "success",
      button: "Ok",
    });
       history('/')
      }
  return (
    <div>
<form onSubmit={handleSubmit}>   
       <div className="min-h-screen bg-blue-400 flex justify-center items-center">
      {/* <div className="absolute w-60 h-60 rounded-xl bg-blue-300 -top-5 -left-16 z-0 transform rotate-45 hidden md:block"></div> */}
      <div className="absolute w-48 h-48 rounded-xl bg-blue-300 -bottom-6 -right-10 transform rotate-12 hidden md:block"></div>
      <div className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
        <div>
          <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
            ¿Olvidaste tu contraseña?
          </h1>
          <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">
            ¿Olvidaste tu contraseña? No hay problema, escribe tu correo electronico y te llegara un correo con un link para cambiar tu contraseña
          </p>
        </div>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Correo electronico"
            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
            value={email}
            onChange = {(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="text-center mt-6">
          <button className="py-3 w-64 text-xl text-white bg-blue-800 rounded-2xl  hover:bg-blue-500"
          type='submit'>
            Enviar Email
          </button>
        </div>
      </div>
      {/* <div className="w-40 h-40 absolute bg-blue-300 rounded-full top-0 right-12 hidden md:block"></div> */}
      <div className="w-20 h-40 absolute bg-blue-300 rounded-full bottom-20 left-10 transform rotate-45 hidden md:block"></div>
    </div>
    </form>

    </div>
  )
}

export default ForgotPassword