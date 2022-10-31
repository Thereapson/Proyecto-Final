import React from "react";
import { useState } from "react";
import "./paginado.css";

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
    // const onKeyPress = (e) => {
    //     if (e.key === 'Enter') {
    //         if (e.target.value > max) {
    //             setCurrentPage(max);
    //             setInputPage(max);
    //         } else if (e.target.value < 1) {
    //             setCurrentPage(1);
    //             setInputPage(1);
    //         } else {
    //             setCurrentPage(parseInt(e.target.value));
    //             setInputPage(parseInt(e.target.value));
    //         }
    //     }
    // }

    // const onChange = (e) => {
    //     setInputPage(e.target.value);
    // }

    return (
        <div className="paginado">
            <button onClick={prevPage} disabled={currentPage === 1} className="paginado__button_prev">
                Prev
                {/* {currentPage === 1 ?
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-octagon-off" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M7.647 3.653l.353 -.353c.2 -.2 .4 -.3 .7 -.3h6.6c.3 0 .5 .1 .7 .3l4.7 4.7c.2 .2 .3 .4 .3 .7v6.6c0 .3 -.1 .5 -.3 .7l-.35 .35m-1.997 1.997l-2.353 2.353c-.2 .2 -.4 .3 -.7 .3h-6.6c-.3 0 -.5 -.1 -.7 -.3l-4.7 -4.7c-.2 -.2 -.3 -.4 -.3 -.7v-6.6c0 -.3 .1 -.5 .3 -.7l2.35 -2.35"></path>
                            <path d="M3 3l18 18"></path>
                        </svg>
                    </>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-narrow-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <line x1="5" y1="12" x2="9" y2="16"></line>
                        <line x1="5" y1="12" x2="9" y2="8"></line>
                    </svg>
                } */}

            </button>
            {/* <input name="inputPage" autoComplete="off" onKeyDown={(e) => onKeyPress(e)} onChange={(e) => onChange(e)} value={inputPage} className="paginado__input" type="number" /> */}
            <button onClick={nextPage} disabled={currentPage === max} className="paginado__button_next">
                Next
                {/* {currentPage === max ?
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-octagon-off" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M7.647 3.653l.353 -.353c.2 -.2 .4 -.3 .7 -.3h6.6c.3 0 .5 .1 .7 .3l4.7 4.7c.2 .2 .3 .4 .3 .7v6.6c0 .3 -.1 .5 -.3 .7l-.35 .35m-1.997 1.997l-2.353 2.353c-.2 .2 -.4 .3 -.7 .3h-6.6c-.3 0 -.5 -.1 -.7 -.3l-4.7 -4.7c-.2 -.2 -.3 -.4 -.3 -.7v-6.6c0 -.3 .1 -.5 .3 -.7l2.35 -2.35"></path>
                            <path d="M3 3l18 18"></path>
                        </svg>
                    </>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-narrow-right" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <line x1="15" y1="16" x2="19" y2="12"></line>
                        <line x1="15" y1="8" x2="19" y2="12"></line>
                    </svg>
                } */}
            </button>
        </div>
    )
}

