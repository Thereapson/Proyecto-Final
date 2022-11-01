import React from "react";
import { Link } from "react-router-dom";

import logo from "../../images/compuDevs.png"
import style from "./landing.module.css"

export function LandingPage() {
    return (
        <div className={style.landing_container}>
            <Link to={"/products"}> 
                <img className={style.logo} src={logo} alt="PCMaster" />
            </Link>
        </div>
    );
}