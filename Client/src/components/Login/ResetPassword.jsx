import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "react-toastify";

function Resetpassword() {

const {id, token} = useParams();
const history = useNavigate();

const [password, setPassword] = useState(""); 
const [message, setMessage] = useState(""); 

const userValid = async() => {
  const res = await fetch(`http://localhost:3001/users/resetPassword/${id}/${token}`, {
    method :"GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  const data = await res.json()

  if (data.status == 201){
    console.log('usuario valido')
  }else{
    alert('!el token expiro')
  }
}  

const sendPassword = async(e) => {
  e.preventDefault();
fetch(`http://localhost:3001/users/resetPassword/${id}/${token}`, {
    method :"POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({password})
    // body: password
  })
 .then((res) => res.json())
 .then((data) => {
  console.log(data, 'reset password')
  alert(data.status)
 })
    // setMessage(true)
    alert('tu contraseña fue cambiada con exito')
    history('/')
 
}

useEffect(() => {
  userValid()
})
  return (
    <form form onSubmit={sendPassword}>
      <div className="min-h-screen bg-blue-400 flex justify-center items-center">
        {/* <div className="absolute w-60 h-60 rounded-xl bg-blue-300 -top-5 -left-16 z-0 transform rotate-45 hidden md:block"></div> */}
        <div className="absolute w-48 h-48 rounded-xl bg-blue-300 -bottom-6 -right-10 transform rotate-12 hidden md:block"></div>
        <div className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
          <div>
            <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
              Ingresa tu nueva contraseña
            </h1>
            <p className="w-80  text-sm  font-semibold text-gray-700 tracking-wide ">
              Nueva contraseña
            </p>
          </div>
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Nueva contraseña"
              className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
              id="password"
              value = {password}
              onChange = {(e) => setPassword(e.target.value)}
            />
            
          </div>
          
          <div className="text-center mt-6">
            <button className="py-3 w-64 text-xl text-white bg-blue-400 rounded-2xl" type="submit">
              Enviar
            </button>
          </div>
        </div>
        {/* <div className="w-40 h-40 absolute bg-blue-300 rounded-full top-0 right-12 hidden md:block"></div> */}
        <div className="w-20 h-40 absolute bg-blue-300 rounded-full bottom-20 left-10 transform rotate-45 hidden md:block"></div>
      </div>
    </form>
  );
}

export default Resetpassword;
