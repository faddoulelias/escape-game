import React from 'react'
import './styles/Desktop.css'
import Window from './Window'
import Taskbar from './Taskbar'

type App = {
    name: string,
    icon: string,
    component: React.ReactNode
}

export type Process = {
    app: App,
    priority: number,
    hasFocus: boolean,
    isMinimized: boolean
    isActive: boolean
}

interface DesktopProps {
    apps: App[]
}

export default function Desktop(props: DesktopProps) {
    const [processes, setProcesses] = React.useState<Array<Process>>(
        props.apps.map((app, i) => ({
            app, priority: i, hasFocus: false,
            isMinimized: false, isActive: false
        }))
    );

    const onFocus = (process: Process | null) => {
        if (!process) return;

        const max = Math.max(...processes.map(p => p.priority));
        const current = processes.find(p => p.app === process.app);
        if (!current) return;
        const updatedProcesses = processes.map(p => {
            if (p.app === process.app) {
                return { ...p, priority: max + 1, hasFocus: true, isActive: true };
            }
            return { ...p, hasFocus: false, isActive: false };
        });
        setProcesses(updatedProcesses);
    }


    return (
        <div className="desktop">
            {processes.map((process, index) => (
                <Window key={index} title={process.app.name} icon={process.app.icon} hasFocus={process.hasFocus} zIndex={process.priority} onFocus={() => onFocus(process)}>
                    {process.app.component}
                </Window>
            ))}
            <Taskbar
                processes={processes}
                onAppClick={(process) => onFocus(process)}
            />
        </div >
    )
}
