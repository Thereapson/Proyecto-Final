import React from "react";
import { Link } from "react-router-dom";

const Noproductsfound = () => {
    return (
        <div className="container mx-auto px-4">
            <div className="flex flex-wrap -mx-1 lg:-mx-4 justify-center gap-4">
                <h1 className="text-2xl text-center">No Products Found</h1>
            </div>
        </div>
    );
};

export default Noproductsfound;