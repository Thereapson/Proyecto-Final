import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import { addProduct, addFavorite, removeFavorite, getFavorites, getQuantity } from "../../Redux/Actions/Actions";
import { useSelector } from "react-redux";

const Card2 = ({ product }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.userData);
    const favorites = useSelector(state => state.userFavorites);
    const [quantity, setQuantity] = React.useState(1);
    const handleAddProduct = () => {
        swal({
            title: "Product added to cart",
            icon: "success",
            button: "Ok",
        });
        let userId = localStorage.getItem("id");
        let productId = product.id;
        let productsToadd = {
            "user_id": userId,
            "products_id": [
                {
                    "product_id": productId,
                    "quantity": quantity
                }
            ]
        }
        dispatch(addProduct(productsToadd));
        dispatch(getQuantity())
        setQuantity(1);
    }

    const [inFavorites, setInFavorites] = React.useState(false);

    const handleIsInFav = () => {
        if (favorites.length) {
            favorites.forEach(favorite => {
                if (favorite._id === product.id) {
                    setInFavorites(true);
                }
            })
        }
    }
    useEffect(() => {
        handleIsInFav();
    }, [favorites])

    const handleRemoveFavorite = (id) => {
        console.log('id', id)
        let body = {
            "userId": localStorage.getItem('id'),
            "productId": id
        }
        dispatch(removeFavorite(body))
        dispatch(getFavorites(localStorage.getItem('id')))
    }

    const handleAddFavorite = () => {
        handleIsInFav();
        if (inFavorites) {
            swal({
                title: "Product already in favorites",
                icon: "warning",
                // do you want to remove it from your favourites?
                text: "Do you want to remove it from your favorites?",
                buttons: ["No", "Yes"],
            })
                .then((willDelete) => {
                    if (willDelete) {
                        handleRemoveFavorite(product.id);
                        setInFavorites(false);
                        swal("Product removed from favorites", {
                            icon: "success",
                        });
                    }
                });
        } else {
            swal({
                title: "Product added to favorites",
                icon: "success",
                button: "Ok",
            });
            let userId = localStorage.getItem("id");
            let productId = product.id;
            let productsToadd = {
                "userId": userId,
                "productId": productId
            }
            dispatch(addFavorite(productsToadd));
            dispatch(getFavorites(localStorage.getItem("id")));
        }
    }

    return (
        // from product render:
        // <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        //                         {productsRender[0] === "No Products Found" ? <Noproductsfound />
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
        //                             })}
        //                     </div>

        // card to render:
        <div className="bg-white shadow-md rounded-lg overflow-hidden relative h-96 flex flex-col justify-between">
            {/* svg button add to favorite*/}
            <button
                type="button"
                className="absolute right-4 top-4 rounded-full text-white p-1 bg-red-600 hover:bg-red-700 z-10"
                onClick={handleAddFavorite}
            >
                <svg
                    className="h-5 w-5 fill-current text-white hover:text-white hover:scale-110 transition duration-300 ease-in-out"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    ></path>
                </svg>
            </button >
            {/* img hover scale 1.1 but overflow in conatiner and heigh 60% of full heigh*/}
            <div className="overflow-hidden h-3/5">
                <Link to={`/product/${product.id}`}>
                    <img src={product.image} alt="Sunset in the mountains" className="w-full h-full object-cover transform hover:scale-110 transition duration-300 ease-in-out" />
                </Link >

            </div>
            {/* product name */}
            <div className="flex items-center justify-center">
                {/* if name > 20 characters slice and set ...
                    after if hover show full name */}
                <span className="text-gray-700 text-lg font-medium hover:text-gray-900 transition duration-300 ease-in-out">{product.name.length > 20 ? product.name.slice(0, 20) + "..." : product.name}</span>
            </div>
            <div className="flex items-center justify-center flex-col bg-gray-100 py-2">

                {/* product price */}
                <div className="flex justify-between items-center px-4 w-full">
                    <p className="text-gray-700 font-semibold text-lg">${quantity ? quantity * product.price : product.price} {product.lastPrice ? <span className="text-red-500 line-through">${product.lastPrice}</span> : <span className="text-red-500 line-through">${900}</span>}
                        {product.lastPrice ? <span className="absolute left-4 top-4 rounded-full text-white text-sm bg-green-600 hover:bg-green-700 z-10">
                            {Math.round((product.lastPrice - (quantity ? quantity * product.price : product.price)) / product.lastPrice * 100)}%</span> :
                            <span className="absolute left-4 top-4 rounded-full text-white p-1 text-sm bg-green-600 hover:bg-green-700 z-10">{Math.round((300 - (quantity ? quantity * product.price : product.price)) / 300 * 100)}%</span>}
                    </p>

                </div>
                {/* set quantity and add to cart */}
                <div className="flex justify-between items-center px-4 py-2 bg-gray-100 w-full">
                    {/* set quantity with input read only and button to increase or decrease */}
                    <div className="flex items-center space-x-4 text-gray-700">
                        <button className="text-white focus:outline-none bg-primary hover:bg-primary-light px-3 rounded-md pb-1" onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>
                            -
                        </button>
                        <input type="text" className="w-12 border-none text-center text-gray-700 focus:outline-none focus:text-gray-600 bg-transparent" readOnly value={quantity} />
                        <button className="text-white focus:outline-none bg-primary hover:bg-primary-light px-3 pb-1 rounded-md" onClick={() => setQuantity(quantity + 1)}>
                            +
                        </button>
                    </div>
                    {/* button add to cart */}
                    <button
                        type="button"
                        className="bg-primary group-hover:md:block hover:md:block hidden md:block text-white px-3 py-2 rounded-md text-sm font-medium"
                        onClick={handleAddProduct}
                    >
                        Add to cart
                    </button>
                </div>
            </div>
        </div >
    );
};

export default Card2;
