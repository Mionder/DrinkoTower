import React from "react";
import headerLogo from "../assets/DrinkoTower.png";
import Image from "./Component/Image";

export default function Header(){
    return(
        <header className="header" id="header">
            <Image img={headerLogo} className="logo" alt="logo"/>
        </header>
    )
}