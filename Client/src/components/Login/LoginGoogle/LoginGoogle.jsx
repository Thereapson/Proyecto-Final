import { useEffect } from "react"
import { GoogleLogin } from "react-google-login"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { getUser } from "../../../Redux/Actions/Actions"
import swal from 'sweetalert';



const clientId = "650713409200-ugee25co9jjpjkp8ufhob0odo9vdn5a9.apps.googleusercontent.com"


function Login() {

    const { id } = useParams()

    const dispatch = useDispatch();
    const userId = useSelector(state => state.userData)



    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getUser(id))
    }, [dispatch, id])



    const onSuccess = async (res) => {

        let user = await userId.id


        console.log("Login success! current user: ", res)
        JSON.stringify(localStorage.setItem('token', res.tokenId));
        JSON.stringify(localStorage.setItem('isLogged', true));
        JSON.stringify(localStorage.setItem('id', user))
        JSON.stringify(localStorage.setItem('email', res.profileObj.email))

        setTimeout(() => {

            swal({
                title: "Login successful",
                icon: "success",
                button: "Ok",
            });
            window.location.href = '/userDetail'
            // navigate("/userDetail")
        }, 3000)
    }

    const onFailure = (res) => {
        console.log("Login failed! res: ", res)
    }

    return (
        <div id="signInButton">
            <GoogleLogin
                clientId={clientId}
                buttonText="Ingresa con Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                inSignedIn={true}
            />
        </div>
    )
}

export default Login