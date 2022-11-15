import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProductsByMinMax, getProductsByCategory, getProductsBySearch } from "../../Redux/Actions/Actions";
import Noproductsfound from '../noproductsfound/noproductsfound';
import Paginado from "../paginado/paginado";
import Navbar from '../navbar/navbar';
import Card from '../Card/Card2';


const Products = () => {
    let productsRender = useSelector(state => state.productsRender);
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories);

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
        console.log('sorted', sorted)
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
        setCategory('');
    }

    // search usin for filter by name and brand 
    const [search, setSearch] = useState('');
    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(getProductsBySearch(search));
        setSearch('');
    }

    const handleInputChangeSearch = (e) => {
        setSearch(e.target.value);
    }

    return (
        <div className="container bg-lightMode min-h-screen">
            <Navbar setCurrentPage={setCurrentPage} />
            <div className="flex justify-center">
                {/* sidebar filters and sorts */}
                <div className="w-1/4">
                    <div className="flex flex-col justify-center items-center">
                        <div className="w-full flex flex-col justify-center items-center gap-3 p-5">
                            <form onSubmit={handleSort} className="flex flex-col md:flex-row justify-center items-center bg-gray-100 rounded-md p-2 shadow-md gap-3 w-full">
                                <input type="number" name="min" value={sorted.min < 1 ? '' : sorted.min} onChange={handleInputChange} placeholder={`Min: $${minPrice ? minPrice : 0}`} className="w-full rounded-md p-2 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none" />
                                <input type="number" name="max" value={sorted.max < 1 ? '' : sorted.max} onChange={handleInputChange} placeholder={`Max: $${maxPrice ? maxPrice : 0}`} className="w-full rounded-md p-2 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none" />
                                <button type="submit" disabled={productsRender[0] === "No Products Found" || sorted.min === 0 || sorted.max === 0 || sorted.min < 0 || sorted.max < 0 || sorted.min > sorted.max ? true : false} className="bg-primary text-white rounded-md px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed w-20 h-10">Sort</button>
                            </form>
                            <div className="gap-3 bg-gray-100 rounded-md p-2 shadow-md flex flex-col md:flex-row justify-center items-center w-full">
                                <label className='text-gray-500 text-sm md:text-base'>Order by price:</label>
                                <button onClick={handleOrder} value="asc" disabled={order === "asc" || productsRender[0] === "No Products Found"} className="bg-primary text-white rounded-md px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed w-20 h-10">Asc</button>
                                <button onClick={handleOrder} value="desc" disabled={order === "desc" || productsRender[0] === "No Products Found"} className="bg-primary text-white rounded-md px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed w-20 h-10">Desc</button>
                            </div>
                            <div className="bg-gray-100 rounded-md p-2 shadow-md flex flex-col justify-center items-center w-full">
                                {/* categories with <Accordion> by flowbite tailwind */}
                                <form onSubmit={handleFilter} className="flex flex-col justify-center items-center w-full gap-3">
                                    <label className='text-gray-500 text-sm md:text-base'>Filter by category:</label>
                                    <select onChange={handleCategory} value={category} className="w-full rounded-md p-2 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none mt-2">
                                        <option value="">Select a category</option>
                                        {categories.map(category => <option key={category.id} value={category.name}>{category.name}</option>)}
                                    </select>

                                    <button type="submit" disabled={category === "" || productsRender[0] === "No Products Found"} className="bg-primary text-white rounded-md px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed w-20 h-10">Filter</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                {/* products render show 3 product per row */}
                <div className=" w-3/4 flex flex-col justify-center items-center ">
                    <div className="flex flex-col justify-center items-center">
                        <div className="w-full flex flex-col justify-center items-center gap-3">
                            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 px-20 pt-6">
                                {productsRender[0] === "No Products Found" ? <Noproductsfound />
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
                            <Paginado
                                productsPerPage={productsPerPage}
                                productsRendered={productsRendered}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                max={max}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

//                 <div className="flex flex-wrap justify-center gap-4 p-4">
//                     {
//                         productsRender[0] === "No Products Found" ? <Noproductsfound /> // no products found
//                             :
//                             productsRender.sort((a, b) => {
//                                 if (order === "asc") {
//                                     return a.price - b.price;
//                                 } else if (order === "desc") {
//                                     return b.price - a.price;
//                                 } else {
//                                     return a.id - b.id;
//                                 }
//                             }).slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage).map((product) => {
//                                 return (
//                                     <Card key={product.id} product={product} />
//                                 )
//                             })
//                     }
//                 </div>
//                 <div className='paginado'>
//                     <Paginado currentPage={currentPage} max={max} setCurrentPage={setCurrentPage} />
//                 </div>
//             </div>
//         </div>
//     )
// }

export default Products;