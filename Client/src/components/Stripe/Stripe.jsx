import React, { useEffect, useState } from 'react';
import './Stripe.css'
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { CardElement, Elements, useStripe, useElements, } from '@stripe/react-stripe-js';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cleanDetails, getProductById, } from "../../Redux/Actions/Actions";
import paloma from './palomita1.png'



const stripePromise = loadStripe("pk_test_51LzkQ9EsbLOetD4WD60JMd2sSsaEOSnizWXhGa6FTKgFnZM8HOvtnJdQlDLmJNGwcntCURvyjEYgGjNXqejdOFSM004Y9xSLvY")




const CheckoutForm = (props) => {
    const stripe = useStripe()
    const elements = useElements()
    const useremail = window.localStorage.getItem('email')
    const handleSubmit = async (e) => {
        e.preventDefault();

        var modal = document.getElementById("myModal");
        var span = document.getElementsByClassName("close")[0];

        span.onclick = function () {
            window.location.replace('https://compudevs-lne9v251e-thereapson.vercel.app/products');
        }

        window.onclick = function (event) {
            if (event.target == modal) {
                window.location.replace('https://compudevs-lne9v251e-thereapson.vercel.app/products');
            }
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        })

        if (!error) {
            const { data } = await axios.post('products/payment', {
                id: paymentMethod.id,
                amount: props.amount,
                detail: props.detail,
                email: useremail || "alternativemail@hotmail.com"

            })
            modal.style.display = "block"
            console.log(data)
            console.log(data)
        } else {
            console.log(error)
        }
    }

    return <form onSubmit={handleSubmit} >
        <CardElement />
        <button className='px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80'>
            Pay
        </button>
        <h2>Total Price: ${props.amount/100}</h2>
    </form>
}
function Stripe() {

    const [bandera, setBandera] = useState(false)
    const { id } = useParams();
    const details = useSelector((state) => state.DetailProduct);
    const dispatch = useDispatch();
    ;
    useEffect(() => {
        dispatch(cleanDetails())
        dispatch(getProductById(id))

    }, [])


    return (
        <div className='prueba'>
            <h1>
                Checkout
            </h1>
            <Elements stripe={stripePromise}>
                <CheckoutForm amount={details.price * 100} detail={details.name}>

                </CheckoutForm>
            </Elements>
            
            <div id="myModal" className="modal">

                {/* <!-- Modal content --> */}
                <div className="modal-content">
                    <span className="close">&times;</span>
                    <p className='parrafo'>Pago efectuado exitosamente</p>
                    <img src={paloma} alt="NOIMG" />
                </div>

            </div>
        </div>

    );
}

export default Stripe;