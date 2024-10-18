import React from 'react'
import './styles/Taskbar.css'
import { Process } from './Desktop'

interface TaskbarProps {
    processes: Process[]
    onAppClick?: (app: Process) => void
}

export default function Taskbar(props: TaskbarProps) {
    return (
        <div className="taskbar">
            <div className="taskbar-app">
                <img src={require("./styles/icons/Windows.svg").default} alt={"Windows"} />
            </div>

            {props.processes.map((process, index) => (
                <div key={index}
                    className={"taskbar-app" + (process.isActive ? " active" : "")}
                    onClick={() => props.onAppClick ? props.onAppClick(process) : null}
                >
                    <img src={process.app.icon} alt={process.app.name} />
                    <hr className={"taskbar-app-line" + (process.hasFocus ? " active" : "")} />
                </div>
            ))
            }
        </div >
    )
}
