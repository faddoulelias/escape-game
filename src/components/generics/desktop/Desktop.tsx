import React from 'react'
import './styles/Desktop.css'
import Window from './Window'
import Taskbar from './Taskbar'

export type App = {
    name: string,
    icon: string,
    component: React.ReactNode
}

export type Process = {
    app: App,
    priority: number,
    hasFocus: boolean,
    isMinimized: boolean
    isRunning: boolean
}

interface DesktopProps {
    apps: App[]
}

function initProcess(app: App, index: number): Process {
    return {
        app, priority: index, hasFocus: false,
        isMinimized: false, isRunning: false
    };
}

function getProcessIndex(processes: Process[], app: App) {
    return processes.findIndex(p => p.app === app);
}

export default function Desktop(props: DesktopProps) {
    const [processes, setProcesses] = React.useState<Array<Process>>(
        props.apps.map(initProcess)
    );

    React.useEffect(() => {
        setProcesses(processes.map(
            p => ({
                ...p, app: props.apps[getProcessIndex(processes, p.app)]
            })
        ));
    }, [props.apps]);

    const getMaxPriority = () => {
        return Math.max(...processes.map(p => p.priority));
    }

    const focus = (process: Process | null) => {
        if (!process) return;
        const updatedProcesses = processes.map(p => {
            if (p.app === process.app) {
                return {
                    ...p,
                    isMinimized: false, isRunning: true,
                    priority: getMaxPriority() + 1, hasFocus: true
                };
            }
            return { ...p, hasFocus: false };
        });
        setProcesses(updatedProcesses);
    }

    const minimize = (process: Process) => {
        const updatedProcesses = processes.map(p => {
            if (p.app === process.app) {
                return {
                    ...p, isMinimized: true,
                    hasFocus: false, priority: 0
                };
            }
            return p;
        });
        setProcesses(updatedProcesses);
    }

    const close = (process: Process) => {
        const updatedProcesses = processes.map(p => {
            if (p.app === process.app) {
                return { ...p, isRunning: false, hasFocus: false, priority: 0 };
            }
            return p;
        });
        setProcesses(updatedProcesses);
    }

    const onTaskbarClick = (process: Process) => {
        if (process.isRunning) {
            if (process.isMinimized) {
                focus(process);
            } else {
                minimize(process);
            }
        } else {
            focus(process);
        }
    }

    return (
        <div className="desktop">
            <div className='processes-div'>
                {processes.map((process, index) =>
                    (process.isRunning) ?
                        <Window
                            key={index} title={process.app.name} icon={process.app.icon}
                            hasFocus={process.hasFocus} zIndex={process.priority}
                            onFocus={() => focus(process)}
                            onMinimize={() => minimize(process)}
                            isMinimized={process.isMinimized}
                            onClose={() => close(process)}
                        >
                            {process.app.component}
                        </Window>
                        : null
                )}
            </div>
            <Taskbar
                processes={processes}
                onAppClick={(process) => onTaskbarClick(process)}
            />
        </div >
    )
}
