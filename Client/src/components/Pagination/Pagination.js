import React from "react";
import '../Pagination/Paginado.css'
export default function Paginado({ PostPage, paginado, allProducts }) {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(allProducts / PostPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav>
            <ul className="barra">
                {pageNumbers &&
                    pageNumbers.map(number => (
                        <li key={number} >
                            <a onClick={() => paginado(number)}>{number}</a>
                        </li>
                    ))}
            </ul>
        </nav>

    )
}