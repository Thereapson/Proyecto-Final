import React from 'react'
import { useState } from 'react'
import { GoogleLogin } from "react-google-login"
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";



const clientId = "650713409200-ugee25co9jjpjkp8ufhob0odo9vdn5a9.apps.googleusercontent.com"


const GoogleRegister = () => {

    const navigate = useNavigate();


    const [input, setInput] = useState({
        full_name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const onSuccess = (res) => {
        console.log("register ----", res)
        try {
            setInput({
                full_name: res.profileObj.name,
                email: res.profileObj.email,
                password: res.profileObj.googleId,
                confirmPassword: res.profileObj.googleId,
            })
            setTimeout(() => {
                swal({
                    title: "Register successful",
                    icon: "success",
                    button: "Ok",
                });
                navigate("/login")
            }, 2000)
        } catch (error) {
            console.log(error)
        }

    }

    const onFailure = (res) => {
        console.log("Register failed! res: ", res)
    }

    return (
        <div id="signInButton">
            <GoogleLogin
                clientId={clientId}
                buttonText="Registrate con Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                inSignedIn={true}
            />
        </div>
    )
}

export default GoogleRegister