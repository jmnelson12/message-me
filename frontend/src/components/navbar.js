import "../styles/Navbar.css";
import React, { useState } from 'react';
import UserConsumer from "../context/user";
import GlobalConsumer from "../context/global";
import { token_key, getFromStorage, removeFromStorage } from "../lib/storage";
import { setMouseStyle, MS_WAIT, MS_DEFAULT } from "../lib/utils";
import { logout, remove } from "../api/user";

export default function Navbar() {
    var [isMenuToggled, setIsMenuToggled] = useState(false);

    const toggleMenu = function () {
        setIsMenuToggled(!isMenuToggled);
    }
    const handleLogout = function (userCtx, globalCtx) {
        const token = getFromStorage(token_key);
        setMouseStyle(MS_WAIT);

        logout(token).then(res => {
            const { success, errors, message } = res.data;
            setMouseStyle(MS_DEFAULT);

            if (success) {
                //removeFromStorage(token_key);
                globalCtx.setGlobalMessage({
                    type: "success",
                    text: "Logged Out"
                });
                userCtx.setIsLoggedIn(false);
                userCtx.setUserData({});
            } else {
                globalCtx.setGlobalMessage({
                    type: "error",
                    text: errors[0] || message
                });
            }
        });
    }
    const handleDelete = function (userCtx, globalCtx) {
        /* eslint-disable */
        var c = confirm("Are you sure you want to delete your account?");
        /* eslint-enable */

        if (c) {
            const token = getFromStorage(token_key);

            remove(token).then(res => {
                const { success, errors, message } = res.data;

                if (success) {
                    removeFromStorage(token_key);
                    globalCtx.setGlobalMessage({
                        type: "success",
                        text: "User Deleted"
                    });
                    userCtx.setIsLoggedIn(false);
                    userCtx.setUserData({});
                } else {
                    globalCtx.setGlobalMessage({
                        type: "error",
                        text: errors[0] || message
                    });
                }
            });
        }
    }

    return (
        <GlobalConsumer>
            {globalContext => (
                <UserConsumer>
                    {userContext => {
                        const { firstName, lastName } = userContext.userData;
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
                                            onClick={() => { handleLogout(userContext, globalContext) }}
                                        >
                                            Logout
                            </div>
                                        <div
                                            className="menuItem txt-red"
                                            onClick={() => { handleDelete(userContext, globalContext) }}
                                        >
                                            Delete Account
                            </div>
                                    </div>
                                }
                            </nav>
                        )
                    }}
                </UserConsumer>
            )}
        </GlobalConsumer>
    )
}
