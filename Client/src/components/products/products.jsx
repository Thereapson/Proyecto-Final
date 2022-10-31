import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from "../../Redux/Actions/Actions";
import Card from '../Card/Card';
import Noproductsfound from '../noproductsfound/noproductsfound';
import Paginado from "../paginado/paginado";
import Navbar from '../navbar/navbar';

const Products = () => {
    const productsRender = useSelector(state => state.productsRender);
    const allProducts = useSelector(state => state.products);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);
    // paginado 
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(6);
    let productsRendered = productsRender.length ? productsRender.length : allProducts.length;
    const max = Math.ceil(productsRendered / productsPerPage);

    return (
        <div className="container mx-auto px-4">
            <Navbar setCurrentPage={setCurrentPage} />
            <div className="flex flex-wrap -mx-1 lg:-mx-4 justify-center gap-4">
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