import React from "react";
import './StripeCol.css'
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import {
    CardElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';



const stripePromise = loadStripe("pk_test_51LzkQ9EsbLOetD4WD60JMd2sSsaEOSnizWXhGa6FTKgFnZM8HOvtnJdQlDLmJNGwcntCURvyjEYgGjNXqejdOFSM004Y9xSLvY")



const CheckoutForm = (props) => {
    const stripe = useStripe()
    const elements = useElements()


    const handleSubmit = async (e) => {
        e.preventDefault();

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        })

        if (!error) {
            props.products.forEach(async (product) => {
                const { data } = await axios.post('http://localhost:3001/products/payment', {
                    id: paymentMethod.id,
                    amount: product.amount,
                    detail: product.detail,
                    email: "andrealtfe1808@hotmail.com"

                })
                console.log(data)
            });




        } else {
            console.log(error)
        }

    }

    return <form onSubmit={handleSubmit} >
        <CardElement />
        <button className='px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80'>
            Comprar
        </button>
    </form>
}
function StripeCol(props) {

    return (
        <div className=''>

            <Elements stripe={stripePromise}>
                <CheckoutForm products={props.products}>

                </CheckoutForm>
            </Elements>
        </div>
    );
}

export default StripeCol;
