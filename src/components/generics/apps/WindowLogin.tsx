import React from 'react'
import './styles/WindowLogin.css'
import ErrorPage from '../components/ErrorPage'
import SuccessPage from '../components/SuccessPage'


export type WindowLoginUser = {
    name: string,
    username: string
    password: string
    passwordHint: string
}

interface WindowLoginProps {
    user?: WindowLoginUser
    type?: 'success' | 'error' | 'normal'
}

export default function WindowLogin(props: WindowLoginProps) {
    if (!props.user) return <ErrorPage
        title="No user provided"
        message="Please provide a user to the Window"
    />;
    if (props.type === 'success') return <SuccessPage
        title="Success"
        message={"User \"" + props.user.username + "\" successfully logged in"}
    />;
    if (props.type === 'error') return <ErrorPage
        title="Error"
        message="Unable to connect to the server"
    />;

    return (
        <div className="window-login-container">
            < div className="window-login-form" >
                <img
                    className="window-login-form-icon"
                    src="https://cdn-icons-png.flaticon.com/512/1077/1077012.png"
                    alt="login"
                />
                <h1 className="window-login-form-title">
                    {props.user.name}
                </h1>
                <div className="window-login-form-input-div">
                    <input
                        className="window-login-form-input"
                        type="password"
                        placeholder="Password"
                        autoComplete="one-time-code"
                    />
                    <button className="window-login-form-button">
                        {"🡢"}
                    </button>
                </div>
                <p className="window-login-form-password-hint">
                    Password hint : {props.user.passwordHint}
                </p>
            </div >
        </div >
    )
}
