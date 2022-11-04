import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteProductToCart, addProduct } from '../../Redux/Actions/Actions'
import { useEffect } from 'react'

const Cart = ({ setShowCart, showCart }) => {
    const open = showCart
    const setOpen = setShowCart
    const dispatch = useDispatch();

    const products = useSelector(state => state.cart);

    const total = products.reduce((acc, product) => {
        return acc + product.price * product.quantity;
    }, 0);

    const handleRemoveAll = () => {
        products.forEach(product => {
            for (let i = 0; i < product.quantity; i++) {
                dispatch(deleteProductToCart(product));
            }
        })
    }

    const handleRemoveToCartProduct = (product) => {
        for (let i = 0; i < product.quantity; i++) {
            dispatch(deleteProductToCart(product));
        }
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen} static>
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
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                                            <div className="flex items-start justify-between">
                                                <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        <span className="sr-only">Close panel</span>
                                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mt-8">
                                                <div className="flow-root">
                                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                        {products.map((product) => (
                                                            <li key={product.id} className="flex py-6">
                                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                    <img
                                                                        src={product.image}
                                                                        alt={product.name}
                                                                        className="h-full w-full object-cover object-center"
                                                                    />
                                                                </div>

                                                                <div className="ml-4 flex flex-1 flex-col">
                                                                    <div>
                                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                                            <h3>
                                                                                <Link to={`/product/${product.id}`}> {product.name} </Link>
                                                                            </h3>
                                                                            <p className="ml-4">{product.price}</p>
                                                                        </div>
                                                                        {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                                                                    </div>
                                                                    <div className="flex flex-1 items-end justify-between text-sm gap-4">
                                                                        <p className="text-gray-500">Qty {product.quantity}</p>
                                                                        <div className="flex">
                                                                            <button onClick={() => dispatch(deleteProductToCart(product))} className="text-gray-400 hover:text-gray-500">
                                                                                <span className="font-bold text-xl">-</span>
                                                                            </button>
                                                                            <button onClick={() => dispatch(addProduct(product))} className="text-gray-400 hover:text-gray-500">
                                                                                <span className="font-bold text-xl">+</span>
                                                                            </button>
                                                                        </div>

                                                                        <div className="flex">
                                                                            <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={() => handleRemoveToCartProduct(product)}>
                                                                                Remove
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                    {/* button remove all products */}
                                                    <button type="button" className="font-medium text-indigo-200 hover:text-indigo-500" onClick={() => handleRemoveAll()}>
                                                        Remove All
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <p>Subtotal</p>
                                                {total}
                                            </div>
                                            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                            <div className="mt-6">
                                                <Link to={'/checkout' + (products.length > 0 ? '?products=' + products.map(product => product.id).join(',') : '')}>
                                                    <button type="button" className="w-full flex justify-center bg-indigo-600 border border-transparent rounded-md py-3 px-8 inline-flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700">
                                                        Checkout
                                                    </button>
                                                </Link>
                                            </div>
                                            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                                <p>
                                                    or
                                                    <button
                                                        type="button"
                                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        Continue Shopping
                                                        <span aria-hidden="true"> &rarr;</span>
                                                    </button>
                                                </p>
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

export default Cart;