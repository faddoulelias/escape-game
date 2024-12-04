import React from 'react'
import './styles/WindowLogin.css'
import ErrorPage from '../components/ErrorPage'
import SuccessPage from '../components/SuccessPage'


export type WindowLoginUser = {
    id: string,
    username: string,
    password: string,
    passwordHint: string,
    profilePicture: string,
    isLogged: boolean
}

interface WindowLoginProps {
    user: WindowLoginUser | null,
    onSuccess: (user: WindowLoginUser) => void
    type: 'success' | 'error' | 'normal'
}

export default function WindowLogin(props: WindowLoginProps) {
    const [password, setPassword] = React.useState('')

    const checkPassword = () => {
        if (props.user && password === props.user.password) {
            if (props.onSuccess) props.onSuccess(props.user)
        }
    }

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
        message={`Unable to connect to user '${props.user.username}'`}
    />;

    return (
        <div className="window-login-container">
            < div className="window-login-form" >
                <div className="window-login-form-icon"
                    style={{
                        backgroundImage: `url(${props.user.profilePicture})`,
                        backgroundSize: 'cover'
                    }}
                >
                </div>
                <h1 className="window-login-form-title">
                    {props.user.id}
                </h1>
                <div className="window-login-form-input-div">
                    <input
                        className="window-login-form-input"
                        type="password"
                        placeholder="Password"
                        autoComplete="one-time-code"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') checkPassword()
                        }}
                    />
                    <button
                        className="window-login-form-button"
                        onClick={checkPassword}
                    >
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
