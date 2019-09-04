import "../../styles/Auth.css";
import React, { useState, Suspense } from 'react';
const Login = React.lazy(() => import('./login'));
const Register = React.lazy(() => import('./register'));

export default function Auth() {
    const [loginTabShowing, setLoginTabShowing] = useState(true);

    return (
        <div className="authPage">
            <div className="authWrapper">
                <Suspense fallback={<h1>LOADING...</h1>}>
                    {loginTabShowing ? <Login /> : <Register />}
                </Suspense>
                <div className="buttonGroup switch">
                    {loginTabShowing ?
                        (
                            <>
                                <p>Don't have an account?</p>
                                <button onClick={() => setLoginTabShowing(false)}>Sign Up</button>
                            </>
                        ) : (
                            <>
                                <p>Already have an account?</p>
                                <button onClick={() => setLoginTabShowing(true)}>Log in</button>
                            </>
                        )
                    }
                </div>
                <div className="guestLink">
                    <button>Continue as guest</button>
                </div>
            </div>
        </div>
    )
}
