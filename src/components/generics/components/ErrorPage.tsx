import React from 'react'
import './styles/ErrorPage.css'
import 'bootstrap-icons/font/bootstrap-icons.css'


interface ErrorPageProps {
    title: string
    message: string
}

export default function ErrorPage(
    props: ErrorPageProps
) {
    return (
        <div className='error-page-container'>
            <div className='error-section'>
                <h1 className='error-title'>
                    <i className="bi bi-exclamation-triangle-fill"></i>
                    {props.title}
                </h1>
                <p className='error-message'>
                    {props.message}
                </p>
            </div>
        </div>
    )
}
