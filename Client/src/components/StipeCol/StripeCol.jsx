import { React, useEffect } from "react";
import './StripeCol.css'
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { CardElement, Elements, useStripe, useElements, } from '@stripe/react-stripe-js';
import { useSearchParams } from "react-router-dom";
import { buyAllProducts } from "../../Redux/Actions/Actions";
import { useDispatch, useSelector } from 'react-redux';
import paloma from './palomita1.png'


const stripePromise = loadStripe("pk_test_51LzkQ9EsbLOetD4WD60JMd2sSsaEOSnizWXhGa6FTKgFnZM8HOvtnJdQlDLmJNGwcntCURvyjEYgGjNXqejdOFSM004Y9xSLvY")



const CheckoutForm = (props) => {
    const stripe = useStripe()
    const elements = useElements()



    const handleSubmit = async (e) => {
        e.preventDefault();

        var modal = document.getElementById("myModal");
        var span = document.getElementsByClassName("close")[0];

        span.onclick = function () {
            window.location.replace('/products');
        }

        window.onclick = function (event) {
            if (event.target == modal) {
                window.location.replace('/products');
            }
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        })

        if (!error) {
            props.products.forEach(async (product) => {
                if (product !== "") {
                    const { data } = await axios.post('/products/payment', {
                        id: paymentMethod.id,
                        amount: product.price * 100,
                        detail: product.name,
                        email: props.email

                    })
                    modal.style.display = "block"
                    console.log(data)
                } else {
                    console.log('No es un id correcto')
                }

            });




        } else {
            console.log(error)
        }

    }

    return <form onSubmit={handleSubmit} >
        <CardElement />
        <button className='px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80'>
            Pay
        </button>
    </form>
}
function StripeCol() {
    const useremail = window.localStorage.getItem('email')
    const dispatch = useDispatch();
    const allproducts = useSelector((state) => state.buyproducts)
    const [params, setParams] = useSearchParams();
    let array = params.get('products').trim().split(',')
    useEffect(() => {
        dispatch(buyAllProducts(array))
    }, [])


    return (
        <div className='prueba'>
            <h1>
                Checkout
            </h1>
            <Elements stripe={stripePromise}>
                <CheckoutForm products={allproducts} email={useremail || "alternativemail@gmail.com"}>

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

export default StripeCol;
