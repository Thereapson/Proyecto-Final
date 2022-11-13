import { removeFavorite, getFavorites } from '../../Redux/Actions/Actions'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

const Favorites = ({ setShowFavorites, showFavorites }) => {
    const dispatch = useDispatch()
    const favorites = useSelector(state => state.userFavorites)

    useEffect(() => {
        dispatch(getFavorites(localStorage.getItem('id')))
    }, [dispatch])

    const handleRemoveFavorite = (id) => {
        console.log('id', id)
        let body = {
            "userId": localStorage.getItem('id'),
            "productId": id
        }
        dispatch(removeFavorite(body))
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
                                    <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
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
                                                        <div key={favorite._id} className="flex justify-between border-b-2 border-gray-200 py-3">
                                                            <div className="flex items-center">
                                                                <img className="h-10 w-10 rounded-full" src={favorite.image} alt="" />
                                                                <div className="ml-4">
                                                                    <h1 className="text-md font-medium text-gray-900">{favorite.name}</h1>
                                                                    <p className="text-sm font-medium text-gray-500">${favorite.price}</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <button
                                                                    onClick={() => handleRemoveFavorite(favorite._id)}
                                                                    type="button"
                                                                    className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 text-gray-400 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                                >
                                                                    <span className="sr-only">Close panel</span>
                                                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
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
