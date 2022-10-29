import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from "../../Redux/Actions/Actions";
import Card from '../Card/Card';
import Noproductsfound from '../noproductsfound/noproductsfound';

const Products = () => {
    const productsRender = useSelector(state => state.productsRender);
    const allProducts = useSelector(state => state.products);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);
    // if (filteredProducts.length > 0) {
    //     return {
    //         ...state,
    //         productsRender: filteredProducts,
    //     };
    // } else {
    //     return {
    //         ...state,
    //         productsRender: ["No Products Found"],
    //     };
    // }
    return (
        <div className="container mx-auto px-4">
            <div className="flex flex-wrap -mx-1 lg:-mx-4 justify-center gap-4">
                {
                    productsRender[0] === "No Products Found" ? <Noproductsfound /> // no products found
                        :
                        productsRender.length > 0 ? productsRender.map((product) => <Card key={product._id} product={product} />) // products with filter
                            :
                            allProducts.map((product) => <Card key={product._id} product={product} />)  // all products
                }
            </div>
        </div>
    )
}

export default Products;