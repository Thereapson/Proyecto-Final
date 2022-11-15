import React from "react";
import { Link } from "react-router-dom";

const Noproductsfound = () => {
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }
            , 1000);
    }, [])

    return (
        <div className="bg-white w-screen h-screen absolute top-0 left-0 flex justify-center items-center flex-col">
            {loading ?
                <>
                    <div
                        className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900">
                    </div>
                    <span className="absolute animate-pulse text-sm text-gray-900">Loading...</span>
                </>
                :
                <>
                    <div className=" flex flex-col justify-center items-center gap-4">
                        <div className="flex flex-col justify-center items-center animate-bounce">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-error-404" width="200" height="200" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M3 7v4a1 1 0 0 0 1 1h3"></path>
                                <path d="M7 7v10"></path>
                                <path d="M10 8v8a1 1 0 0 0 1 1h2a1 1 0 0 0 1 -1v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1z"></path>
                                <path d="M17 7v4a1 1 0 0 0 1 1h3"></path>
                                <path d="M21 7v10"></path>
                            </svg>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <span className="text-2xl font-bold">Products not found</span>
                            <span className="text-gray-500">Please try again later</span>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center mt-4">

                        <button
                            className="bg-primary text-white px-4 py-2 rounded-md hover:animated-bounce"
                            onClick={() => window.location.reload()}>
                            Go to back to products
                        </button>
                    </div>
                </>
            }
        </div>
    );
};

export default Noproductsfound;