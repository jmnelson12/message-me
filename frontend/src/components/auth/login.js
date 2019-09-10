import React, { useState } from 'react';
import UserConsumer from "../../context/user";
import { login } from "../../api/user";
import { setInStorage, token_key } from "../../lib/storage";

export default function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [message, setMessage] = useState({
        type: "",
        text: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
    }

    const handleLogin = (e, ctx) => {
        e.preventDefault();
        setIsLoading(true);

        login(values).then(res => {
            const { success, message, errors, payload } = res.data;

            if (success) {
                ctx.setUserLoggedIn(true);
                ctx.setUserData(payload.userData);
                setInStorage(token_key, payload.token);
            } else {
                setMessage({
                    type: "error",
                    text: errors[0] || message
                });
                setIsLoading(false);
            }
        });
    }

    return (
        <div className="login-wrapper authModal">
            <div className="message-wrapper">
                <p className={"message " + message.type}>{message.text}</p>
            </div>
            <UserConsumer>
                {ctx => (
                    <form className="authForm" onSubmit={e => handleLogin(e, ctx)}>
                        <div className="inputGroup required">
                            <input
                                type="text"
                                name="email"
                                value={values.email}
                                onChange={handleInputChange}
                                autoFocus
                                required
                            />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label>Email</label>
                        </div>
                        <div className="inputGroup required">
                            <input
                                type="password"
                                name="password"
                                value={values.password}
                                onChange={handleInputChange}
                                required />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label>Password</label>
                        </div>
                        <div className="buttonGroup">
                            <input
                                type="submit"
                                value={isLoading ? "Logging In..." : "Log In"}
                            />
                        </div>
                    </form>
                )}
            </UserConsumer>
        </div>
    )
}
