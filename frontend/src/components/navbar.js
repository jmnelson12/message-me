import "../styles/Navbar.css";
import React, { useState } from 'react';
import UserConsumer from "../context/user";
import { token_key, getFromStorage, removeFromStorage } from "../lib/storage";
import { logout } from "../api/user";

export default function Navbar() {
    var [isMenuToggled, setIsMenuToggled] = useState(false);

    const toggleMenu = function () {
        setIsMenuToggled(!isMenuToggled);
    }

    const handleLogout = function (ctx) {
        const token = getFromStorage(token_key);
        console.log(token);

        logout(token).then(res => {
            const { success, payload, errors, message } = res.data;
            // set loading ?
            if (success) {
                removeFromStorage(token_key);
                // set status message here
                ctx.setUserLoggedIn(false);
                ctx.setUserData({});
            }
        });
    }

    return (
        <UserConsumer>
            {ctx => {
                const { firstName, lastName } = ctx.userData;
                return (
                    <nav className="nav">
                        <div className="userInfo">
                            <p>Welcome, {`${firstName} ${lastName}`}</p>
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
                                <div
                                    className="menuItem"
                                    onClick={() => { handleLogout(ctx) }}
                                >
                                    Logout
                            </div>
                                <div
                                    className="menuItem txt-red"
                                    onClick={() => { handleLogout(ctx) }}
                                >
                                    Delete Account
                            </div>
                            </div>
                        }
                    </nav>
                )
            }}
        </UserConsumer>
    )
}
