/* eslint-disable no-sequences */
import React, { useState } from "react";
import Navbar from '../navbar/navbar';
import axios from 'axios'
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";
import GoogleRegister from "./GoogleRegister/GoogleRegister";
import { useDispatch } from "react-redux";
import { postUser } from "../../Redux/Actions/Actions";


const validate = (input) => {

  let errors = {}

  if (!input.full_name) {
    errors.full_name = "Nombre es requerido"
  }

  if (!input.email) {
    errors.email = "Email es requerido"
  }

  if (!input.password) {
    errors.password = "Ingrese una contraseña"
  }

  if (input.password.length <= 6) {
    errors.password = "La contraseña debe contener al menos 6 caracteres"
  }

  if (input.password === input.confirmPassword) {
    errors.password = "La contraseña deben ser iguales"
  }

  return errors
}


const Register = () => {

  const [input, setInput] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [mensaje, setMensaje] = useState();
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({})

  // const dispatch = useDispatch()

  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   const { full_name, email, password, confirmPassword } = input
  //   console.log(full_name, email, password, confirmPassword)
  //   await axios('/users/register', {
  //     method: 'POST',
  //     crossDomain: true,
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json',
  //       'Access-Control-Allow-Origin': '*'
  //     },
  //     body: JSON.stringify({
  //       full_name,
  //       email,
  //       password,
  //       confirmPassword: confirmPassword === password
  //     }),
  //   })
  //     .then((res) => {
  //       swal({
  //         title: "Register successful",
  //         icon: "success",
  //         button: "Ok",
  //       });
  //       setTimeout(() => {
  //         window.location.href = '/login'
  //       }, 2000)
  //     })
  // }

  const { full_name, email, password, confirmPassword } = input

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });

    setErrors(validate({ ...input, [e.target.name]: e.target.value }))
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (full_name !== "" && email !== "" && password !== "" && confirmPassword === password) {
      const Usuario = {
        full_name,
        email,
        password,
        confirmPassword
      }
      setLoading(true)
      await axios.post("/users/register", Usuario)
        .then((res) => {
          const { data } = res
          setMensaje(data.mensaje)
          setInput({
            full_name: "",
            email: "",
            password: "",
            confirmPassword: "",
          })
          setTimeout(() => {
            setMensaje("")
            swal({
              title: "Register successful",
              icon: "success",
              button: "Ok",
            });
            navigate("/login")
          }, 2000)
        })
        .catch((error) => {
          console.error(error)
          setMensaje("Hubo un error")
          swal({
            title: "It was an  error",
            icon: "error",
            button: "Ok",
          });
          setTimeout(() => {
            setMensaje("")
          }, 2000)
        })
      setLoading(false)
    }else{
      swal({
        title: "It was an  error",
        icon: "error",
        button: "Ok",
      });
    }


  }


  return (
    <div>
      <Navbar />
      <section className="bg-white dark:bg-gray-900">
        <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
          <form className="w-full max-w-md" onSubmit={handleSubmit}>
            {/* <img class="object-cover w-24 h-24 mx-auto rounded-full" src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="user avatar"/> */}

            <div className="flex items-center justify-center mt-6">
              <a
                href="#"
                className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white"
              >
                Registrate
              </a>
            </div>

            <div className="relative flex items-center mt-8">
              <span className="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </span>

              <input
                type="text"
                name="full_name"
                className="block w-full py-3 text-gray-700 bg-white border rounded-md px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Nombre completo"
                onChange={(e) => handleChange(e)}
              />
            </div>
            {/* 
            <label
              for="dropzone-file"
              className="flex items-center px-3 py-3 mx-auto mt-6 text-center bg-white border-2 border-dashed rounded-md cursor-pointer dark:border-gray-600 dark:bg-gray-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-300 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>

              <h2 className="mx-3 text-gray-400">Foto de perfil</h2>

              <input id="dropzone-file" type="file" className="hidden" />
            </label> */}

            <div className="relative flex items-center mt-6">
              <span className="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </span>

              <input
                type="email"
                name="email"
                className="block w-full py-3 text-gray-700 bg-white border rounded-md px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Correo electronico"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="relative flex items-center mt-4">
              <span className="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </span>

              <input
                type="password"
                name="password"
                className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Contraseña"
                onChange={(e) => handleChange(e)}
                autoComplete="off"
              />
            </div>


            <div className="relative flex items-center mt-4">
              <span className="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </span>

              <input
                type="password"
                name="confirmPassword"
                className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Confirmar contraseña"
                onChange={(e) => handleChange(e)}
                autoComplete="off"
              />
            </div>
            {/* <div className="relative flex items-center mt-4">
              <span className="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </span>

              <input
                type="password"
                className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Confirmar contraseña"
              />
            </div> */}

            <div className="mt-6">
              <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50" type="submit">
                Registrarte
              </button>

              <div>
                <span className="w-5/6 px-4 py-3 font-bold text-center">
                  <GoogleRegister />
                </span>
              </div>

              <div className="mt-6 text-center ">
                <a
                  href="/login"
                  className="text-sm text-blue-500 hover:underline dark:text-blue-400"
                >
                  ¿Ya tienes una cuenta?
                </a>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );


}

export default Register