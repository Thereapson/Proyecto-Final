import React, { useEffect } from 'react';
// import { getComponentId } from '../../redux/actions';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import NavBar from '../NavBar/NavBar';
import procesador from './Components/procesadorimg.png'
import './DetailCard.css';

function DetailCard() {

  const hardcode = {
    nombre: "Intel i7-10400K",
    tipo: "Procesador",
    Especificaciones: ["3200Mh", "Nucleos: 3", "Hilos: 4"],
    costo: "$500USD",
    imagen: procesador,
    descripcion: "El procesador está formado por un conjunto de registros que almacenen datos, una unidad aritmético-lógica que realiza operaciones con ellos y una unidad de control que se encarga de coordinar a todos los componentes. Un reloj interno determina la velocidad de trabajo de estos elementos internos."
  }
  //PLANTILLA PARA HACER LA CONEXION CON REDUX
  // const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id)
  // const details = useSelector((state) => state.ComponentDetail)
  // useEffect(() => {
  //   // dispatch(getComponentId(id))
  // }, [])

  return (
    <div className="DetailCard">
      {/* <div>
                <NavBar></NavBar>
            </div> */}
      <section className="bg-white dark:bg-gray-900">
        <div className="container px-6 py-10 mx-auto">
          <div className="lg:-mx-6 lg:flex lg:items-center">
            <img className="object-cover object-center lg:w-1/2 lg:mx-6 w-full h-96 rounded-lg lg:h-[31rem]" src={hardcode.imagen} alt="NOIMG" />

            <div className="mt-8 lg:w-1/2 lg:px-6 lg:mt-0">
              <p className="text-3xl font-semibold text-blue-500" >{hardcode.nombre} ({hardcode.tipo})</p>

              <p className="max-w-lg mt-6 text-gray-500 dark:text-gray-400 ">
                {hardcode.descripcion}
              </p>
              <div className='espec'>
                <h3 className="mt-6 text-lg font-medium text-blue-500">Frecuencia</h3>
                <p className="text-gray-600 dark:text-gray-300">{hardcode.Especificaciones[0]}</p>

                <h3 className="mt-6 text-lg font-medium text-blue-500">Nucleos</h3>
                <p className="text-gray-600 dark:text-gray-300">{hardcode.Especificaciones[1]}</p>

                <h3 className="mt-6 text-lg font-medium text-blue-500">Hilos</h3>
                <p className="text-gray-600 dark:text-gray-300">{hardcode.Especificaciones[2]}</p>

              </div>


              <div className="flex items-center justify-between mt-12 lg:justify-start">
                <button class="padd1 px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-80">
                  Añadir al carrito
                </button>
                <button class="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                  Compra Rapida
                </button>
                <p className="max-w-lg mt-6 text-gray-500 dark:text-gray-400 padd ">
                  {hardcode.costo}
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