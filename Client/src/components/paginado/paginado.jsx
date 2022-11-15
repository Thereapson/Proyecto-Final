import React from "react";
import { useState } from "react";

export default function Paginado(props) {
    const { currentPage, max, setCurrentPage } = props;

    const [inputPage, setInputPage] = useState(1);

    const nextPage = () => {
        if (currentPage < max) {
            setCurrentPage(currentPage + 1);
            setInputPage(inputPage + 1);
        }
    }
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            setInputPage(inputPage - 1);
        }
    }
    return (
        <div className="flex justify-center items-center w-full h-12 gap-4">
            {currentPage > 1 ? <button onClick={prevPage} disabled={currentPage === 1} className="bg-primary text-white rounded-md px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed w-20 h-10">
                Prev
            </button > : null
            }
            <div className="paginado__container">
                <button onClick={nextPage} disabled={currentPage === max} className="bg-primary text-white rounded-md px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed w-20 h-10">
                    Next
                </button>
            </div >
        </div >
    )
}

