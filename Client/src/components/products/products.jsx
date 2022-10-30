import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts, shortByPrice } from "../../Redux/Actions/Actions";
import Card from '../Card/Card';
import Noproductsfound from '../noproductsfound/noproductsfound';
import Paginado from '../Pagination/Pagination';

//ANGIE



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

    const [page, setPage] = useState(1);
    const [PostPage, setPostPage] = useState(3) //Cantidad de items a mostrar
    const indexOfLastVideogame = page * PostPage; //se multiplica la pag por items
    const indexOfFirstVideogame = indexOfLastVideogame - PostPage; //Tiene que dar 0
    const currentProducts = allProducts.slice(indexOfFirstVideogame, indexOfLastVideogame) //Retira los items y devuelve los primeros 15

    const paginado = (pageNumber) => {
        setPage(pageNumber)
    }


    return (
        <div className="container mx-auto px-4">
            <div className="flex flex-wrap -mx-1 lg:-mx-4 justify-center gap-4">
                {
                    currentProducts[0] === "No Products Found" ? <Noproductsfound /> // no products found
                        :
                        productsRender.length > 0 ? productsRender.map((product) => <Card key={product._id} product={product} />) // products with filter
                            :
                            allProducts.map((product) => <Card key={product.id} product={product} />)  // all products
                }
            </div>
            <div className='paginado'>
                <Paginado
                    PostPage={PostPage}
                    allProducts={allProducts.length}
                    paginado={paginado}
                />
            </div>
        </div>
    )
}

export default Products;