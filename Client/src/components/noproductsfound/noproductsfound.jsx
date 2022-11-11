import React from "react";
import { Link } from "react-router-dom";

const Noproductsfound = () => {
    return (
        <div className="w-full flex flex-col justify-center items-center h-96">
            {/* 404 logo svg responsive usin tailwind breakpints*/}
            <div className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" className="sm:w-1/2 w-3/4 mx-auto">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M3 7v4a1 1 0 0 0 1 1h3"></path>
                    <path d="M7 7v10"></path>
                    <path d="M10 8v8a1 1 0 0 0 1 1h2a1 1 0 0 0 1 -1v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1z"></path>
                    <path d="M17 7v4a1 1 0 0 0 1 1h3"></path>
                    <path d="M21 7v10"></path>
                </svg>
            </div>
            {/* product no found tilte */}
            <div className="flex-col justify-center items-center text-center">
                <h1 className="text-2xl font-bold text-gray-600">Product not found</h1>
                <p className="text-gray-500">Sorry, we couldn't find the product you are looking for.</p>
            </div>

            {/* return to product page */}
            <div className="flex-col justify-center items-center">


                <button
                    onClick={() => window.location.reload()}
                    className="bg-yellow-400 text-white px-4 py-2 rounded-lg mt-4 hover:bg-yellow-500 hover:text-white transition duration-300 ease-in-out hover:shadow-lg hover:scale-105"
                >Return to products</button>

            </div>
        </div>
    );
};

export default Noproductsfound;