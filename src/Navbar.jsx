import React from "react";
import "./navbar.css";
function Navbar() {
    return(
        <nav className="navbar">
            <ul>
                <li>Home</li>
                <li>Summary</li>
                <li>Flashcards</li>
                <li>Quizzes</li>
                <li>Contact</li>
            </ul>
        </nav>
    )
}
export default Navbar;