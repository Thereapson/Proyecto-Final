import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts, getProductsByMinMax } from "../../Redux/Actions/Actions";
import Card from '../Card/Card';
import Noproductsfound from '../noproductsfound/noproductsfound';
import Paginado from "../paginado/paginado";
import Navbar from '../navbar/navbar';

const Products = () => {
    let productsRender = useSelector(state => state.productsRender);
    let allProducts = useSelector(state => state.products);
    const dispatch = useDispatch();


    // paginado 
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(6);
    let productsRendered = productsRender.length ? productsRender.length : allProducts.length;
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
        // dispatch(cleanProducts());
        dispatch(getProductsByMinMax(sorted.min, sorted.max));
        setCurrentPage(1);
        setSorted({
            min: null,
            max: null,
        });
    }


    return (
        <div className="container">
            <Navbar setCurrentPage={setCurrentPage} />
            <div className="sort flex flex justify-center items-center mt-5 relative">
                <form onSubmit={handleSort}>
                    <label>Min</label>
                    <input type="number" name="min" onChange={handleInputChange} value={sorted.min} />
                    <label>Max</label>
                    <input type="number" name="max" onChange={handleInputChange} value={sorted.max} />
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2">Sort</button>
                </form>
                {/* <label>Sort by price</label>
                <button onClick={() => setSorted({ ...sorted, order: "asc" })} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Asc</button>
                <button onClick={() => setSorted({ ...sorted, order: "desc" })} className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Desc</button>
                {sorted && <label>order: {sorted.order}</label>} */}
            </div>
            <div className="flex flex-wrap justify-center gap-4 p-4">
                {
                    productsRender[0] === "No Products Found" ? <Noproductsfound /> // no products found
                        :
                        productsRender.length > 0 ? productsRender.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage).map((product) => <Card key={product._id} product={product} />) // products with filter
                            :
                            allProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage).map((product) => <Card key={product.id} product={product} />)  // all products
                }
            </div>
            <div className='paginado'>
                <Paginado currentPage={currentPage} max={max} setCurrentPage={setCurrentPage} />
            </div>
        </div>
    )
}

export default Products;