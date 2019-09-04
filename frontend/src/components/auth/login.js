import React, { useState } from 'react';

export default function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [message, setMessage] = useState({
        type: "",
        text: ""
    });

    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
    }

    return (
        <div className="login-wrapper authModal">
            <div className="message-wrapper">
                <p className={"message " + message.type}>{message.text}</p>
            </div>
            <form className="authForm">
                <div className="inputGroup required">
                    <input
                        type="text"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                        required
                    />
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>Email</label>
                </div>
                <div className="inputGroup required">
                    <input
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleInputChange}
                        required />
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
