import React, { useState } from 'react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="login-wrapper authModal">
            {/*<div className="authHeading">
                <h2>Log In</h2>
            </div>*/}
            <form className="authForm">
                <div className="inputGroup required">
                    <input type="email" value={email} required />
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>Email</label>
                </div>
                <div className="inputGroup required">
                    <input type="password" value={password} required />
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>Password</label>
                </div>
                <div className="buttonGroup">
                    <input type="submit" value="Log in" />
                </div>
            </form>
        </div>
    )
}
