import "../styles/Navbar.css";
import React, { useState } from 'react';

export default function Navbar() {
    var [isMenuToggled, setIsMenuToggled] = useState(false);

    function toggleMenu() {
        setIsMenuToggled(!isMenuToggled);
    }

    return (
        <nav className="nav">
            <div
                onClick={toggleMenu}
                className={"hamburger " + (isMenuToggled ? 'toggle' : "")}
            >
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
            </div>

            {isMenuToggled && <div className="userMenu">
                oi
            </div>}
        </nav>
    )
}
