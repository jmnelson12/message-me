import React, { useState } from 'react';

export default function Register() {
    const [firstName, setFirstName] = useState('Jacob');
    const [lastName, setLastName] = useState('Nelson');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [organization, setOrganization] = useState('');

    return (
        <div className="register-wrapper authModal">
            {/*<div className="authHeading">
                <h2>Sign Up</h2>
            </div>*/}
            <form className="authForm">
                <div className="input-half-wrapper">
                    <div className="inputGroup required">
                        <input type="text" value={firstName} required />
                        <span class="highlight"></span>
                        <span class="bar"></span>
                        <label>First Name</label>
                    </div>
                    <div className="inputGroup required">
                        <input type="text" value={lastName} required />
                        <span class="highlight"></span>
                        <span class="bar"></span>
                        <label>Last Name</label>
                    </div>
                </div>
                <div className="inputGroup required">
                    <input type="email" value={email} required />
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>Email</label>
                </div>
                <div className="input-half-wrapper">
                    <div className="inputGroup required">
                        <input type="password" value={password} required />
                        <span class="highlight"></span>
                        <span class="bar"></span>
                        <label>Password</label>
                    </div>
                    <div className="inputGroup">
                        <input type="text" value={organization} required />
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
