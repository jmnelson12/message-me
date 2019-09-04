import React, { useState } from 'react';

export default function Register() {
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        email: '',
        password: '',
        organization: ""
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
        <div className="register-wrapper authModal">
            <div className="message-wrapper">
                <p className={"message " + message.type}>{message.text}</p>
            </div>
            <form className="authForm">
                <div className="input-half-wrapper">
                    <div className="inputGroup required">
                        <input
                            type="text"
                            name="firstName"
                            value={values.firstName}
                            onChange={handleInputChange}
                            required
                        />
                        <span class="highlight"></span>
                        <span class="bar"></span>
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
                        <span class="highlight"></span>
                        <span class="bar"></span>
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
                    <span class="highlight"></span>
                    <span class="bar"></span>
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
                        <span class="highlight"></span>
                        <span class="bar"></span>
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
                        <span class="highlight"></span>
                        <span class="bar"></span>
                        <label>Organization</label>
                    </div>
                </div>
                <div className="buttonGroup">
                    <input type="submit" value="Sign Up" />
                </div>
            </form>
        </div>
    )
}
