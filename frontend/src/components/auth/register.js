import React, { useState } from 'react';
import UserConsumer from "../../context/user";
import { register } from "../../api/user";

export default function Register({ setMessage, setLoginTabShowing }) {
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        organization: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value });
    }

    const handleRegister = (e, ctx) => {
        e.preventDefault();
        setIsLoading(true);

        register(values).then(res => {
            const { success, message, errors } = res.data;

            if (success) {
                setMessage({
                    type: "success",
                    text: message
                });
                setLoginTabShowing(true);
            } else {
                setMessage({
                    type: "error",
                    text: errors[0]
                });
            }

            setIsLoading(false);
        });
    }

    return (
        <div className="register-wrapper authModal">
            <UserConsumer>
                {ctx => (
                    <form
                        className="authForm"
                        onSubmit={e => handleRegister(e, ctx)}
                    >
                        <div className="input-half-wrapper">
                            <div className="inputGroup required">
                                <input
                                    type="text"
                                    name="firstName"
                                    value={values.firstName}
                                    onChange={handleInputChange}
                                    autoFocus
                                    required
                                />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>First Name</label>
                            </div>
                            <div className="inputGroup required">
                                <input
                                    type="text"
                                    name="lastName"
                                    value={values.lastName}
                                    onChange={handleInputChange}
                                    required
                                />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>Last Name</label>
                            </div>
                        </div>
                        <div className="inputGroup required">
                            <input
                                type="text"
                                name="email"
                                value={values.email}
                                onChange={handleInputChange}
                                required
                            />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label>Email</label>
                        </div>
                        <div className="input-half-wrapper">
                            <div className="inputGroup required">
                                <input
                                    type="password"
                                    name="password"
                                    value={values.password}
                                    onChange={handleInputChange}
                                    required
                                />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>Password</label>
                            </div>
                            <div className="inputGroup">
                                <input
                                    type="text"
                                    name="organization"
                                    value={values.organization}
                                    onChange={handleInputChange}
                                    required
                                />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>Organization</label>
                            </div>
                        </div>
                        <div className="buttonGroup">
                            <input
                                type="submit"
                                value={isLoading ? "Processing..." : "Sign Up"}
                            />
                        </div>
                    </form>
                )}
            </UserConsumer>
        </div>
    )
}
