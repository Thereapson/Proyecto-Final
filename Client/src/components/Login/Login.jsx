/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { GoogleLogin } from "react-google-login"
import Navbar from "../navbar/navbar";
import firebase from "firebase"
import { useEffect } from "react";




const Login = () => {

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    })
    const [mensaje, setMensaje] = useState()
    const [loading, setLoading] = useState(false)

    const [user, setUser] = useState(null)
    const [auth, setAuth] = useState(false) //|| window.localStorage.getItem("auth") === true)
    const [token, setToken] = useState("")
    const navigate = useNavigate()

    const { email, password } = inputs



    const HandleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }


    useEffect(() => {
        firebase.auth().onAuthStateChanged(userCred => {
            if (userCred) {
                setAuth(true)
                window.localStorage.setItem("auth", "true")
                userCred.getIdToken().then((token) => {
                    setToken(token)
                })
            }
        })
    }, [])

    const handleAuth = () => {
        const provider = new firebase.auth.GoogleAuthProvider()

        firebase.auth().signInWithPopup(provider)
            .then(userCred => {
                if (userCred) {
                    setAuth(true)
                    window.localStorage.setItem("auth", "true")
                }

                console.log(`${userCred.user.email} ha iniciado sesión`)
                console.log(userCred)
                navigate("/userDetail")
            })
            .catch(error => console.log(`Error ${error.cod}: ${error.message}`))

    }

    const handleLogout = () => {
        firebase.auth().signOut()
            .then(result => console.log(`${result.user.email} ha salido`))
            .catch(error => console.log(`Error ${error.cod}: ${error.message}`))

    }

    const renderLoginButton = () => {
        //si el usuario esta logeado
        if (user) {
            return (
                <div>
                    <img src={user.photoURL} alt={user.displayName} />
                    <p>Hola {user.displayName}</p>
                    <button onClick={() => handleLogout()}>Salir</button>
                </div>
            )
        } else {
            //si no lo esta
            return (
                <button onClick={() => handleAuth()}>Login con Google</button>
            )
        }

    }

    //--------------------------

    const onSubmit = async (e) => {
        e.preventDefault()

        if (email !== "" && password !== "") {
            const Usuario = {
                email,
                password,
            }

            setLoading(true)

            await axios
                .post('http://localhost:3001/users/login', Usuario)
                .then((res) => {
                    const { data } = res
                    setMensaje(data.mensaje)
                    setTimeout(() => {
                        setMensaje("")
                        console.log(res, "login ---")
                        window.localStorage.setItem("token", data?.data)
                        window.localStorage.setItem('isLogged', true);
                        window.localStorage.setItem('id', data.id)
                        window.localStorage.setItem('email', data.email)


                        navigate("/userDetail")
                    }, 1500)
                })
                .catch((error) => {
                    console.error(error)
                    setMensaje("Correo u Contraseña incorrecta")
                    setTimeout(() => {
                        setMensaje("")
                    }, 1500)
                })
            setInputs({ email: "", password: "" })
            setLoading(false)
        }
    }

    return (
        <>
            <div>
                <Navbar />
                <div>
                    <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl my-40">
                        <div
                            className="hidden bg-cover lg:block lg:w-1/2"
                            style={{
                                backgroundImage: `url('https://images.unsplash.com/photo-1606660265514-358ebbadc80d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1575&q=80')`
                            }}
                        /></div>


                    <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
                        <h3 className="text-2xl font-semibold text-center text-gray-700 dark:text-white">Bienvenido a TecnoParts</h3>
                        <h2 className="text-xl text-center text-gray-600 dark:text-gray-200">Inicio de Sesión</h2>
                    </div>

                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mt-4">
                            <label
                                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                                htmlFor="LoggingEmailAddress">Correo electronico</label>
                            <input
                                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                                onChange={(e) => HandleChange(e)}
                                value={email}
                                name="email"
                                id="email"
                                type="email"
                                placeholder="Correo..."
                            />
                        </div>
                        <div className="mt-4">
                            <label
                                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                                htmlFor="loggingPassword">Contraseña</label>
                            <input
                                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                                onChange={(e) => HandleChange(e)}
                                value={password}
                                name="password"
                                id="password"
                                type="password"
                                placeholder="Contraseña..."
                                autoComplete="off"
                            />
                            <Link to="/forgotPassword">¿Olvidaste tu contraseña?</Link>
                        </div>



                        <button type="submit">
                            {loading ? "Cargando..." : "Iniciar Sesión"}
                        </button>

                        <br />

                        <div>
                            {renderLoginButton()}
                        </div>
                        <p>
                            Aun no tienes cuenta?{" "}
                            <b onClick={() => navigate("/register")}>Registrate!</b>
                        </p>
                    </form>
                    {mensaje && <div>{mensaje}</div>}
                </div>

            </div>
        </>
    )
}

export default Login