import React from 'react'
import './styles/SuccessPage.css'
import 'bootstrap-icons/font/bootstrap-icons.css'


interface SuccessPageProps {
    title: string
    message: string
}

export default function SuccessPage(
    props: SuccessPageProps
) {
    return (
        <div className='success-page-container'>
            <div className='success-section'>
                <h1 className='success-title'>
                    <i className="bi bi-check-circle-fill"></i>
                    {props.title}
                </h1>
                <p className='success-message'>
                    {props.message}
                </p>
            </div>
        </div>
    )
}
