import { addProduct, removeFavorite, getFavorites } from "../../Redux/Actions/Actions";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import swal from 'sweetalert'
import { Link } from 'react-router-dom'

const Favorites = ({ setShowFavorites, showFavorites }) => {
    const dispatch = useDispatch()
    const favorites = useSelector(state => state.userFavorites)

    useEffect(() => {
        dispatch(getFavorites(localStorage.getItem('id')))
    }, [dispatch])

    const handleRemoveFavorite = (id) => {
        let body = {
            "userId": localStorage.getItem('id'),
            "productId": id
        }
        dispatch(removeFavorite(body))
        dispatch(getFavorites(localStorage.getItem('id')))
    }

    const handleAddProduct = (id) => {
        swal({
            title: "Product added to cart",
            icon: "success",
            button: "Ok",
        });
        let userId = localStorage.getItem("id");
        let productId = id;
        let productsToadd = {
            "user_id": userId,
            "products_id": [
                {
                    "product_id": productId,
                    "quantity": 1
                }
            ]
        }
        dispatch(addProduct(productsToadd));
    }

    return (
        <Transition.Root show={showFavorites} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setShowFavorites} static>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="h-full flex flex-col shadow-xl overflow-y-scroll bg-white">
                                        <div className="flex-1">
                                            <div className="flex justify-between px-4 pt-4">
                                                <h2 className="text-lg font-medium text-gray-900">Favorites</h2>
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 text-gray-400 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                    onClick={() => setShowFavorites(false)}
                                                >
                                                    <span className="sr-only">Close panel</span>
                                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                </button>
                                            </div>
                                            <div className="mt-6 relative flex-1 px-4 sm:px-6">
                                                <div className="absolute inset-0 px-4 sm:px-6">
                                                    {favorites.map(favorite => (
                                                        <div className="flex justify-between border-b-2 border-gray-200 py-3 hover:bg-gray-100 px-2">
                                                            <div className="flex items-center">
                                                                <img src={favorite.image} alt={favorite.name} className="h-12 w-12 rounded-full" />
                                                                <div className="ml-4">
                                                                    <Link to={`/product/${favorite._id}`} key={favorite.id}>
                                                                        <span className="text-sm font-medium text-gray-900">{favorite.name}</span>
                                                                    </Link>
                                                                    <p className="text-sm font-medium text-gray-500">${favorite.price}</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <button
                                                                    onClick={() => handleRemoveFavorite(favorite._id)}
                                                                    type="button"
                                                                    className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 text-gray-400 hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:text-white"
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash-off" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                                        <line x1="3" y1="3" x2="21" y2="21"></line>
                                                                        <path d="M4 7h3m4 0h9"></path>
                                                                        <line x1="10" y1="11" x2="10" y2="17"></line>
                                                                        <line x1="14" y1="14" x2="14" y2="17"></line>
                                                                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l.077 -.923"></path>
                                                                        <line x1="18.384" y1="14.373" x2="19" y2="7"></line>
                                                                        <path d="M9 5v-1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                                                                    </svg>
                                                                </button>
                                                                <button onClick={() => handleAddProduct(favorite._id)} className="ml-4 inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 text-gray-400 hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shopping-cart-plus" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                                        <circle cx="6" cy="19" r="2"></circle>
                                                                        <circle cx="17" cy="19" r="2"></circle>
                                                                        <path d="M17 17h-11v-14h-2"></path>
                                                                        <path d="M6 5l6.005 .429m7.138 6.573l-.143 .998h-13"></path>
                                                                        <path d="M15 6h6m-3 -3v6"></path>
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root >
    )
}

export default Favorites
