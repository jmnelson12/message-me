import "../styles/Auth.css";
import React, { useState } from 'react';

export default function Auth() {
    const [loginTabShowing, setLoginTabShowing] = useState(true);
    const [loginState, setLoginState] = useState({
        email: "",
        password: ""
    });
    const [registerState, setRegisterState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        organization: ""
    });

    return (
        <div className="authPage">
            <div className="authWrapper">
                {loginTabShowing ?
                    <div className="login-wrapper authModal">
                        <div className="authHeading">
                            <h2>Login</h2>
                        </div>
                        <div className="authForm">
                            <form>
                                <div className="inputGroup">
                                    <label htmlFor="">Email</label>
                                    <input type="text" />
                                </div>
                                <div className="inputGroup">
                                    <label htmlFor="">Password</label>
                                    <input type="text" />
                                </div>
                                <div className="buttonGroup">
                                    <input type="submit" value="Log in" />
                                    <button onClick={() => setLoginTabShowing(false)}>Sign Up</button>
                                </div>
                            </form>
                        </div>
                    </div> :
                    <div className="register-wrapper authModal">
                        <div className="authHeading">
                            <h2>Sign Up</h2>
                        </div>
                        <div className="authForm">
                            <form>
                                <div className="inputGroup">
                                    <label htmlFor="">First Name</label>
                                    <input type="text" />
                                </div>
                                <div className="inputGroup">
                                    <label htmlFor="">Last Name</label>
                                    <input type="text" />
                                </div>
                                <div className="inputGroup">
                                    <label htmlFor="">Email</label>
                                    <input type="text" />
                                </div>
                                <div className="inputGroup">
                                    <label htmlFor="">Password</label>
                                    <input type="text" />
                                </div>
                                <div className="inputGroup">
                                    <label htmlFor="">Organization</label>
                                    <input type="text" />
                                </div>
                                <div className="buttonGroup">
                                    <input type="submit" value="Sign Up" />
                                    <button onClick={() => setLoginTabShowing(true)}>Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                }
                <div className="guestLink">
                    <button>or continue as guest</button>
                </div>
            </div>
        </div>
    )
}
