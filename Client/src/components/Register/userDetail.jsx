import React, {Component} from 'react';
import Navbar from '../navbar/navbar';

export default class UserDetail extends Component {
    constructor(props){
        super(props)
        this.state = {
            userData: ""
        }
    }
    componentDidMount(){
        // const token = this.state
        fetch('http://localhost:3001/users/userData', {
            method: 'POST',
            crossDomain:true,
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              'Access-Control-Allow-Origin': '*'
            },
            body:JSON.stringify({
             token:window.localStorage.getItem('token')
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data, 'userData')
            this.setState({userData: data.data})
        })
    }
    render(){
        return (
            <div>
                <Navbar/>
                <div class="h-screen bg-gray-200  dark:bg-gray-800   flex flex-wrap items-center  justify-center  ">
            <div class="container lg:w-2/6 xl:w-2/7 sm:w-full md:w-2/3    bg-white  shadow-lg    transform   duration-200 easy-in-out">
                <div class=" h-32 overflow-hidden" >
                    <img class="w-full" src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" alt="" />
                </div>
                <div class="flex justify-center px-5  -mt-12">
                    <img class="h-32 w-32 bg-white p-2 rounded-full   " src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" alt="" />

                </div>
                <div class=" ">
                    <div class="text-center px-14">
                        <h2 class="text-gray-800 text-3xl font-bold">Hola! {this.state.userData.full_name}</h2>
                        <a class="text-gray-400 mt-2 hover:text-blue-500"  target="BLANK()">{this.state.userData.email}</a>
                        <p class="mt-2 text-gray-500 text-sm">Bienvenido a compuDevs </p>
                    </div>
                    <hr class="mt-6" />
                   
                </div>
            </div>
        </div>
            </div>
        )
    }
}