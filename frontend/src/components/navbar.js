import "../styles/Navbar.css";
import React, { useState } from 'react';
import UserConsumer from "../context/user";

export default function Navbar() {
    var [isMenuToggled, setIsMenuToggled] = useState(false);

    function toggleMenu() {
        setIsMenuToggled(!isMenuToggled);
    }

    return (
        <UserConsumer>
            {ctx => (
                <nav className="nav">
                    <div className="userInfo">
                        <p>Logged in as: John Diggity</p>
                    </div>

                    <div
                        onClick={toggleMenu}
                        className={"hamburger " + (isMenuToggled ? 'toggle' : "")}
                    >
                        <div className="bar1"></div>
                        <div className="bar2"></div>
                        <div className="bar3"></div>
                    </div>

                    {isMenuToggled &&
                        <div className="userMenu">
                            {ctx.userLoggedIn ? (
                                <>
                                    <div className="menuItem">Logout</div>
                                    <div className="menuItem txt-red">Delete Account</div>
                                </>
                            ) : (
                                    <>
                                        <div className="menuItem">Login</div>
                                        <div className="menuItem">Sign Up</div>
                                    </>
                                )}
                        </div>
                    }
                </nav>
            )}
        </UserConsumer>
    )
}
