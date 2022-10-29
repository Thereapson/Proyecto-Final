import React, { useEffect } from 'react';
import { getProductById } from '../../Redux/Actions/Actions.js';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import procesador from './procesadorimg.png'
import './detail.css';

function DetailCard() {

  const hardcode = {
    nombre: "Intel i7-10400K",
    tipo: "Procesador",
    Especificaciones: ["3200Mh", "Nucleos: 3", "Hilos: 4"],
    costo: "$500USD",
    imagen: procesador,
    descripcion: "El procesador está formado por un conjunto de registros que almacenen datos, una unidad aritmético-lógica que realiza operaciones con ellos y una unidad de control que se encarga de coordinar a todos los componentes. Un reloj interno determina la velocidad de trabajo de estos elementos internos."
  }

  const dispatch = useDispatch();
  const { id } = useParams();
  const details = useSelector((state) => state.DetailProduct)
  useEffect(() => {
    dispatch(getProductById(id))
  }, [])

  return (
    <div className="DetailCard">
      <section className="bg-white dark:bg-gray-900">
        <div className="container px-6 py-10 mx-auto">
          <div className="lg:-mx-6 lg:flex lg:items-center">
            <img className="espaciado object-cover object-center lg:h-[31rem]" src={details.image} alt="NOIMG" />

            <div className="mt-8 lg:w-1/2 lg:px-6 lg:mt-0">
            {details.name?<p className="text-3xl font-semibold text-blue-500" > {details.name} (Aca va el tipo)</p>:null}

              <p className="max-w-lg mt-6 text-gray-500 dark:text-gray-400 ">
                {details.description}
              </p>
              <div className='espec'>
                <h3 className="mt-6 text-lg font-medium text-blue-500">Frecuencia (Falta)</h3>
                <p className="text-gray-600 dark:text-gray-300">{hardcode.Especificaciones[0]}</p>

                <h3 className="mt-6 text-lg font-medium text-blue-500">Nucleos/Hilos (Falta) </h3>
                <p className="text-gray-600 dark:text-gray-300">{hardcode.Especificaciones[1]}</p>

                <h3 className="mt-6 text-lg font-medium text-blue-500">En stock:</h3>
                <p className="text-gray-600 dark:text-gray-300">{details.stock}</p>

              </div>


              <div className="flex items-center justify-between mt-12 lg:justify-start">
                <button className="espacio padd1 px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-80">
                  Añadir al carrito
                </button>
                <button className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                  Compra Rapida
                </button>
                <p className=" padding max-w-lg mt-6 text-gray-500 dark:text-gray-400 padd ">
                  {details.price}USD
                </p>

              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DetailCard;