import React from "react";
import "./navbar.css";
import { useState,useEffect } from "react";
function Navbar({theme,changetheme}) {
    return(
        <nav className="navbar">
            <button className="theme-emoji" onClick={changetheme}>{ theme === "dark" ? "🌞" : "🌜"}</button>
            <ul>
                <li>Home</li>
                <li>Get Started</li>
                <li>Try Out</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
        </nav>
    )
}
export default Navbar;