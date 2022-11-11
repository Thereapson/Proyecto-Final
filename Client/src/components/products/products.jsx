import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProductsByMinMax } from "../../Redux/Actions/Actions";
import Card from '../Card/Card';
import Noproductsfound from '../noproductsfound/noproductsfound';
import Paginado from "../paginado/paginado";
import Navbar from '../navbar/navbar';

const Products = () => {
    let productsRender = useSelector(state => state.productsRender);
    const dispatch = useDispatch();

    // paginado 
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(6);
    let productsRendered = productsRender.length
    const max = Math.ceil(productsRendered / productsPerPage);

    const [sorted, setSorted] = useState({
        min: 0,
        max: 0,
    });

    const handleInputChange = (e) => {
        setSorted({
            ...sorted,
            [e.target.name]: e.target.value
        });
    }

    const handleSort = (e) => {
        e.preventDefault();
        dispatch(getProductsByMinMax(sorted.min, sorted.max));
        setCurrentPage(1);
        setSorted({
            min: '',
            max: '',
        });
    }
    const [order, setOrder] = useState('');
    const handleOrder = (e) => {
        setCurrentPage(1);
        let order = e.target.value;
        setOrder(order);
    }

    return (
        <div className="container">
            <Navbar setCurrentPage={setCurrentPage} />
            {/* sorts min, max and order asc or desc, responsive with tailwind */}
            <div className="w-full flex flex-col md:flex-row justify-center items-center gap-3">
                <form onSubmit={handleSort} className="flex flex-col md:flex-row justify-center items-center bg-gray-100 rounded-md p-2 shadow-md gap-3">
                    <input type="number" name="min" value={sorted.min === 0 ? "" : sorted.min} onChange={handleInputChange} placeholder="min" className='w-20 h-10 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent' />
                    <input type="number" name="max" value={sorted.max === 0 ? "" : sorted.max} onChange={handleInputChange} placeholder="max" className='w-20 h-10 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent' />
                    <button type="submit" disabled={sorted.min === 0 && sorted.max === 0 || sorted.min === "" && sorted.max === "" || productsRender[0] === "No Products Found"} className="bg-primary text-white rounded-md px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed w-20 h-10">Sort</button>
                </form>
                <div className="gap-3 bg-gray-100 rounded-md p-2 shadow-md flex flex-col md:flex-row justify-center items-center">
                    <label className='text-gray-500 text-sm md:text-base'>Order by price:</label>
                    <button onClick={handleOrder} value="asc" disabled={order === "asc" || productsRender[0] === "No Products Found"} className="bg-primary text-white rounded-md px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed w-20 h-10">Asc</button>
                    <button onClick={handleOrder} value="desc" disabled={order === "desc" || productsRender[0] === "No Products Found"} className="bg-primary text-white rounded-md px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed w-20 h-10">Desc</button>
                </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4 p-4">
                {
                    productsRender[0] === "No Products Found" ? <Noproductsfound /> // no products found
                        :
                        productsRender.sort((a, b) => {
                            if (order === "asc") {
                                return a.price - b.price;
                            } else if (order === "desc") {
                                return b.price - a.price;
                            } else {
                                return a.id - b.id;
                            }
                        }).slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage).map((product) => {
                            return (
                                <Card key={product.id} product={product} />
                            )
                        })
                }
            </div>
            <div className='paginado'>
                <Paginado currentPage={currentPage} max={max} setCurrentPage={setCurrentPage} />
            </div>
        </div>
    )
}

export default Products;