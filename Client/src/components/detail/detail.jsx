import React, { useEffect } from 'react';
import { getProductById, cleanDetails } from '../../Redux/Actions/Actions.js';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import procesador from './procesadorimg.png'
import Navbar from '../navbar/navbar'
import Stripe from '../Stripe/Stripe.jsx'
import './detail.css';
import StripeCol from '../StipeCol/StripeCol.jsx';
import swal from 'sweetalert';


function DetailCard() {
  function getRandomArbitrary(min, max) {
    let numero = Math.random() * (max - min) + min;
    return Math.round(numero)
  }
  const hardcode = [{
    detail: "Intel i7-10400K",
    amount: 5000,
  },
  {
    detail: "Intel i9-10400K",
    amount: 9000,
  },
  {
    detail: "Intel i3-10000K",
    amount: 3000,
  },
  {
    detail: "Intel i1-10400K",
    amount: 7000,
  }
  ]

  const dispatch = useDispatch();
  const { id } = useParams();
  const details = useSelector((state) => state.DetailProduct)
  useEffect(() => {
    dispatch(cleanDetails())
    dispatch(getProductById(id))
  }, [])

  return (
    <div className="DetailCard">
      <Navbar />
      <section className="bg-white dark:bg-gray-900">
        <div className="container px-6 py-10 mx-auto">
          <div className="lg:-mx-6 lg:flex lg:items-center">
            <img className="espaciado object-cover object-center lg:h-[31rem]" src={details.image} alt="NOIMG" />

            <div className="mt-8 lg:w-1/2 lg:px-6 lg:mt-0">
              {details.name ? <p className="cap text-3xl font-semibold text-blue-500" > {details.name} ({details.category.name})</p> : null}

              <p className="max-w-lg mt-6 text-gray-500 dark:text-gray-400 ">
                {details.description}
              </p>
              <div className='espec'>
                <h3 className="mt-6 text-lg font-medium text-blue-500">Frecuencia</h3>
                <p className="text-gray-600 dark:text-gray-300">{getRandomArbitrary(2000, 4000)} Mhs</p>

                <h3 className="mt-6 text-lg font-medium text-blue-500">Nucleos/Hilos </h3>
                <p className="text-gray-600 dark:text-gray-300">{getRandomArbitrary(1, 6)} / {getRandomArbitrary(10, 14)}  </p>

                <h3 className="mt-6 text-lg font-medium text-blue-500">En stock:</h3>
                <p className="text-gray-600 dark:text-gray-300">{details.stock}</p>

              </div>


              <div className="flex items-center justify-between mt-12 lg:justify-start">
                <button
                  className="espacio padd1 px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-80"
                  onClick={() => swal({
                    title: "Product added to cart",
                    icon: "success",
                    button: "OK",
                  }
                  )}>Add to cart</button>


                <Link to="/payment">
                  <button className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                    Compra Rapida
                  </button>
                </Link>

                <p className=" padding max-w-lg mt-6 text-gray-500 dark:text-gray-400 padd ">
                  {details.price}USD
                </p>

              </div>

            </div>

          </div>
        </div>
      </section>
      {/* <div className='formtemp'>
        <Stripe amount={details.price * 100} detail={details.name}></Stripe>
      </div> */}

      {/* <div className='fromtemp'>
        <StripeCol products={hardcode}></StripeCol>

      </div> */}

    </div>
  );
}

export default DetailCard;