import React, { useState } from 'react';
import { register } from "../../api/user";
import { setMouseStyle, MS_WAIT, MS_DEFAULT } from "../../lib/utils";

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

    const handleRegister = e => {
        e.preventDefault();
        setIsLoading(true);
        setMouseStyle(MS_WAIT);

        register(values).then(res => {
            const { success, message, errors } = res.data;
            setIsLoading(false);
            setMouseStyle(MS_DEFAULT);

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
        });
    }

    return (
        <div className="register-wrapper authModal">
            <form
                className="authForm"
                onSubmit={handleRegister}
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
                        value={isLoading ? "Creating Account..." : "Sign Up"}
                    />
                </div>
            </form>
        </div>
    )
}
