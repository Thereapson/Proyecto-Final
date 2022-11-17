import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProductsByMinMax, getProductsByCategory, getProductsBySearch } from "../../Redux/Actions/Actions";
import Noproductsfound from '../noproductsfound/noproductsfound';
import Paginado from "../paginado/paginado";
import Navbar from '../navbar/navbar';
import Card from '../Card/Card2';
import swal from 'sweetalert';


const Products = () => {
    let productsRender = useSelector(state => state.productsRender);
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories);
    const brands = useSelector(state => state.brands);
    // paginado 
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(9);
    let productsRendered = productsRender.length
    const max = Math.ceil(productsRendered / productsPerPage);

    const [sorted, setSorted] = useState({
        min: '',
        max: ''
    });

    const handleInputChange = (e) => {
        setSorted({
            ...sorted,
            [e.target.name]: e.target.value
        });
    }

    const handleSort = (e) => {
        e.preventDefault();
        if (sorted.min && sorted.max) {
            let min = typeof sorted.min === 'string' ? parseInt(sorted.min) : sorted.min;
            let max = typeof sorted.max === 'string' ? parseInt(sorted.max) : sorted.max;
            dispatch(getProductsByMinMax(min, max));
            setCurrentPage(1);
            setSorted({
                min: '',
                max: ''
            });
        } else {
            swal({
                title: "Please, fill both fields",
                icon: "warning",
                button: "Ok",
            });
            setSorted({
                min: false,
                max: false
            });
        }
    }

    const [order, setOrder] = useState('');
    const handleOrder = (e) => {
        setCurrentPage(1);
        let order = e.target.value;
        setOrder(order);
    }

    let minPrice = Math.min(...productsRender.map(product => product.price));
    let maxPrice = Math.max(...productsRender.map(product => product.price));

    // filter by category
    const [category, setCategory] = useState('');
    const handleCategory = (e) => {
        setCurrentPage(1);
        let category = e.target.value;
        setCategory(category);
    }

    const handleFilter = (e) => {
        e.preventDefault();
        dispatch(getProductsByCategory(category));
    }

    // search usin for filter by name and brand 
    const [brand, setBrand] = useState('');
    const handleBrand = (e) => {
        e.preventDefault();
        dispatch(getProductsBySearch(brand));
        setBrand('');
    }

    const handleInputChangeBrand = (e) => {
        setBrand(e.target.value);
        console.log(brands)
    }

    return (
        <div className=" min-h-screen">

            <Navbar setCurrentPage={setCurrentPage} />

            <div className="flex justify-center">
                <div className="w-1/4">
                    <div className="flex flex-col justify-center items-center">
                        <div className="w-full flex flex-col justify-center items-center gap-3 p-5">
                            <div className="bg-gray-100 rounded-md p-2 shadow-md flex flex-col justify-center items-center w-full">
                                <div className="w-full flex justify-center items-center flex-col gap-2">
                                    <label className='text-gray-500 text-sm md:text-base'>Filter by category:</label>
                                    <div className="flex flex-row gap-4 justify-center items-center flex-wrap w-full">
                                        {categories.map(c => (
                                            <button onClick={handleCategory} value={c.name} disabled={category === c.name || productsRender[0] === "No Products Found" || c.name === category} className="bg-transparent text-black rounded-md px-4 py-1 disabled:opacity-50 disabled:cursor-not-allowed h-10 disabled:border-2 disabled:border-primary disabled:text-primary">{c.name}</button>
                                        ))}
                                    </div>
                                    <div className="flex justify-center items-center gap-2">
                                        <button onClick={handleFilter} disabled={category === '' || productsRender[0] === "No Products Found"} className="bg-primary text-white rounded-md px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed w-20 h-10">Filter</button>
                                        <button onClick={() => window.location.reload()} disabled={!category} className="bg-primary text-white rounded-md px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed w-20 h-10">Clear</button>
                                    </div>
                                </div>
                            </div>
                            <form onSubmit={handleSort} className="flex flex-col md:flex-row justify-center items-center bg-gray-100 rounded-md p-2 shadow-md gap-3 w-full">
                                <input type="number" name="min" value={sorted.min <= 0 ? '' : sorted.min} onChange={handleInputChange} placeholder={`Min: $${minPrice ? minPrice : 0}`} className="w-full rounded-md p-2 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none" />
                                <input type="number" name="max" value={sorted.max <= 0 ? '' : sorted.max} onChange={handleInputChange} placeholder={`Max: $${maxPrice ? maxPrice : 0}`} className="w-full rounded-md p-2 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none" />
                                {sorted.min && sorted.max
                                    ?
                                    <button type="submit" disabled={productsRender[0] === "No Products Found" || sorted.min <= 0 && sorted.max <= 0 || sorted.min == '' && sorted.max == '' ? true : false} className="bg-primary text-white rounded-md px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed w-20 h-10">Sort</button>
                                    :
                                    null
                                }
                            </form>
                            <div className="gap-3 bg-gray-100 rounded-md p-2 shadow-md flex flex-col md:flex-row justify-center items-center w-full">
                                <label className='text-gray-500 text-sm md:text-base'>Order by price:</label>
                                <button onClick={handleOrder} value="asc" disabled={order === "asc" || productsRender[0] === "No Products Found"} className="bg-primary text-white rounded-md px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed w-20 h-10">Asc</button>
                                <button onClick={handleOrder} value="desc" disabled={order === "desc" || productsRender[0] === "No Products Found"} className="bg-primary text-white rounded-md px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed w-20 h-10">Desc</button>
                            </div>
                            <div className="bg-gray-100 rounded-md p-2 shadow-md flex flex-col justify-center items-center w-full">
                                <div className="w-full flex justify-center items-center flex-col gap-2">
                                    <label className='text-gray-500 text-sm md:text-base'>Filter by brand:</label>
                                    <div className="flex flex-row gap-2 justify-center items-center flex-wrap w-full">
                                        {brands && brands.map(b => (
                                            <button onClick={handleInputChangeBrand} value={b} disabled={productsRender[0] === "No Products Found" || b === brand} className="bg-transparent text-black rounded-md px-4 py-1 disabled:opacity-50 disabled:cursor-not-allowed h-10 disabled:border-2 disabled:border-primary disabled:text-primary">{b}</button>
                                        ))}
                                    </div>
                                    <div className="flex justify-center items-center gap-2">
                                        <button onClick={handleBrand} disabled={brand === '' || productsRender[0] === "No Products Found"} className="bg-primary text-white rounded-md px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed w-20 h-10">Filter</button>
                                        <button onClick={() => window.location.reload()} disabled={!brand} className="bg-primary text-white rounded-md px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed w-20 h-10">Clear</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" w-3/4 flex flex-col justify-center items-center ">
                    <div className="flex flex-col justify-center items-center">
                        <div className="w-full flex flex-col justify-center items-center gap-3">
                            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 px-20 pt-6">
                                {productsRender[0] === "No Products Found" || productsRender.length <= 0 ? <Noproductsfound />
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
                                    })}

                            </div>
                            {productsRender[0] === "No Products Found" ? null
                                :
                                <Paginado
                                    productsPerPage={productsPerPage}
                                    productsRendered={productsRendered}
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                    max={max}
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products;