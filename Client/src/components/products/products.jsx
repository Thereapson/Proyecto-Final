import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts, getProductsBySearch } from "../../Redux/Actions/Actions";
import { useSearchParams } from "react-router-dom";


const Products = () => {
    const products = useSelector(state => state.products);
    const filteredProducts = useSelector(state => state.filteredProducts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const [searchParams] = useSearchParams();
    const search = searchParams.get("search");

    useEffect(() => {
        if (search) {
            console.log('search', search);
            dispatch(getProductsBySearch(search));
        } else {
            dispatch(getProducts());
        }
    }, [dispatch, search]);



    return (
        <div className="bg-white">
            <div className="container mx-auto">
                <div className="grid grid-cols-4 gap-4">
                    {
                        (search ? filteredProducts.map((product) => (
                            <div key={product.id} className="bg-gray-100">
                                <div className="p-4">
                                    <img src={product.image} alt={product.name} />
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-bold">{product.name}</h3>
                                    <p className="text-gray-500">${product.price}</p>
                                </div>
                            </div>
                        )) : products.map((product) => (
                            <div key={product.id} className="bg-gray-100">
                                <div className="p-4">
                                    <img src={product.image} alt={product.name} />
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-bold">{product.name}</h3>
                                    <p className="text-gray-500">${product.price}</p>
                                </div>
                            </div>
                        )))
                    }
                </div>
            </div>
        </div>
    )
}

export default Products;