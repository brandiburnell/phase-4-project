import React from "react";
import { NavLink } from "react-router-dom";
import "../components/styles/NavBar.css";

function NavBar() {
    return (
        <nav>
            <NavLink
                to="/"
                className="nav-link"
            >
            home</NavLink>
            <NavLink
                to="/newbook"
                className="nav-link"
            >
            add a book</NavLink>
            <NavLink
                to="search"
                className="nav-link">
            search</NavLink>

        </nav>
    );
}

export default NavBar;