/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../navbar/navbar';
import Logo from '../../images/Logo.png'

const userDetail = () => {
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         userData: ""
    //     }
    // }

    const userData = useSelector(state => state.userData)

    const [user, setUser] = useState("")

    useEffect(() => {
        // const token = this.state
        fetch('https://compudevs.herokuapp.com/users/userData', {
            method: 'POST',
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                token: window.localStorage.getItem('token')
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data, 'userData')
                setUser({ userData: data.data })
            })

    }, [])

    return (
        <div>
            <Navbar />
            <div class=" bg-gray-200  dark:bg-gray-800   flex flex-wrap items-center  justify-center  ">
                <div class="container lg:w-2/6 xl:w-2/7 sm:w-full md:w-2/3    bg-white  shadow-lg    transform   duration-200 easy-in-out">
                    <div class=" h-32 overflow-hidden" >
                        <img class="w-full" src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" alt="" />
                    </div>
                    <div class="flex justify-center px-5  -mt-12">
                        <img class="h-32 w-32 bg-white p-2 rounded-full   " src={Logo} alt="" />


                    </div>
                    <div class=" ">
                        <div class="text-center px-14">
                            <h2 class="text-gray-800 text-3xl font-bold">Hola! {userData.full_name}</h2>
                            <a class="text-gray-400 mt-2 hover:text-blue-500" target="BLANK()">{userData.email}</a>
                            <p class="mt-2 text-gray-500 text-sm">Bienvenido a compuDevs </p>
                            <p>Ya eres parte de nosotros</p>
                            <p>Para continuar viendo tus productos haz  click aqui</p>
                            <button className=" mt-5 bg-primary text-white rounded-md px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed w-30 h-10 hover:bg-orange-300 ">
                            <a href='/products'>Productos</a>

                            </button>
                        </div>
                        <hr class="mt-6" />

                    </div>
                </div>
            </div>
        </div>
    )

}

export default userDetail