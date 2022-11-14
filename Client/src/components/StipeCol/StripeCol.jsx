import { React, useEffect } from "react";
import './StripeCol.css'
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { CardElement, Elements, useStripe, useElements, } from '@stripe/react-stripe-js';
import { useSearchParams } from "react-router-dom";
import { buyAllProducts, getCart, removeCart, showBuyProduct } from "../../Redux/Actions/Actions";
import { useDispatch, useSelector } from 'react-redux';
import paloma from './palomita1.png'
import Stripecard from "../stripecard/stripecard.jsx";


const stripePromise = loadStripe("pk_test_51LzkQ9EsbLOetD4WD60JMd2sSsaEOSnizWXhGa6FTKgFnZM8HOvtnJdQlDLmJNGwcntCURvyjEYgGjNXqejdOFSM004Y9xSLvY")



const CheckoutForm = (props) => {
    const stripe = useStripe()
    const elements = useElements()
    const dispatch = useDispatch()
    const handleRemoveAll = () => {

        dispatch(removeCart(props.user))
    }

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
            handleRemoveAll()
        } else {
            console.log(error)
        }

    }

    return <form onSubmit={handleSubmit} >
        <CardElement />
        <div className="pagarcantidad">
            {props.cantidadapagar ? <p className="cantidadapagar">${props.cantidadapagar}</p> : null}
            <button className='place px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80'>
                Pay
            </button>
        </div>

    </form>
}
function StripeCol() {

    const calcularcantidad = function (id) {
        let cantidad = 0
        for (let i = 0; i < allproducts.length; i++) {
            if (allproducts[i]._id === id) {
                cantidad++
            }
        }
        if (cantidad === 1) {
            return cantidad + ' unidad'
        }
        return cantidad + ' unidades';
    }

    const calcularcantidadnum = function (id) {
        let cantidad = 0
        for (let i = 0; i < allproducts.length; i++) {
            if (allproducts[i]._id === id) {
                cantidad++
            }
        }
        return cantidad
    }

    const calculartotal = function () {
        let total = 0;
        for (let i = 0; i < allproducts.length; i++) {
            total = total + allproducts[i].price;
        }
        return total;
    }

    const showprods = useSelector(state => state.abouttobuyproducts)
    const cart = useSelector(state => state.cart);
    const id = window.localStorage.getItem('id')
    const useremail = window.localStorage.getItem('email')
    const dispatch = useDispatch();
    const allproducts = useSelector((state) => state.buyproducts)
    const [params, setParams] = useSearchParams();
    let array = params.get('products').trim().split(',')
    useEffect(() => {
        dispatch(buyAllProducts(array))
        dispatch(getCart(id));
        dispatch(showBuyProduct(array))
    }, [])


    return (
        <div className='pruebaxd'>
            <h1>
                Checkout
            </h1>
            <div className="containerxd">
                {showprods ? showprods.map((x) => { return <Stripecard key={x._id} cantidadnum={calcularcantidadnum(x._id)} cantidad={calcularcantidad(x._id)} img={x.image} name={x.name} price={x.price} /> }) : <h2>Cargando carrito</h2>}
            </div>

            <Elements stripe={stripePromise}>
                <CheckoutForm products={allproducts} email={useremail || "alternativemail@gmail.com"} user={cart.user} cantidadapagar={calculartotal()}>

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
            {/* <button onClick={() => { calculartotal() }}>xd</button> */}
        </div>
    );
}

export default StripeCol;