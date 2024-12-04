import React from 'react'
import './styles/Window.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

type WindowInformation = {
    x: number,
    y: number,
    width?: number,
    height?: number
}

enum ResizeDirection {
    NONE,
    BOTTOM,
    LEFT,
    RIGHT,
    BOTTOM_LEFT,
    BOTTOM_RIGHT
}

interface WindowProps {
    title: string,
    children: React.ReactNode,
    icon: string,
    hasFocus: boolean,
    isMinimized: boolean,
    zIndex: number,
    onFocus: () => void
    onMinimize: () => void
    onClose: () => void
}

function getCursor(direction: ResizeDirection) {
    switch (direction) {
        case ResizeDirection.BOTTOM:
            return 'ns-resize';
        case ResizeDirection.RIGHT:
            return 'ew-resize';
        case ResizeDirection.BOTTOM_RIGHT:
            return 'nwse-resize';
        default:
            return 'default';
    }
}

export default function Window(props: WindowProps): JSX.Element {
    const [windowInfo, setWindowInfo] = React.useState<WindowInformation>({ x: 0, y: 0, width: 400, height: 300 });
    const [startPosition, setStartPosition] = React.useState<WindowInformation>({ x: 0, y: 0 });
    const [isMoving, setIsMoving] = React.useState<boolean>(false);
    const [isResizing, setIsResizing] = React.useState<boolean>(false);
    const [canResize, setCanResize] = React.useState<ResizeDirection>(ResizeDirection.NONE);
    const [mousePosition, setMousePosition] = React.useState<{ x: number, y: number }>({ x: 0, y: 0 });
    const [isMaximized, setIsMaximized] = React.useState<boolean>(false);

    const reference = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (!reference.current) return;
        setWindowInfo({
            x: reference.current.offsetLeft,
            y: reference.current.offsetTop,
            width: reference.current.offsetWidth,
            height: reference.current.offsetHeight
        });
        const handleMove = (e: MouseEvent) => { setMousePosition({ x: e.clientX, y: e.clientY }); }
        const handleMouseUp = () => { setIsMoving(false); setIsResizing(false); }
        window.addEventListener('mousemove', handleMove);
        window.addEventListener('mouseup', handleMouseUp);
    }, []);

    React.useEffect(() => {
        if (isMoving) {
            setWindowInfo({
                x: mousePosition.x - startPosition.x,
                y: mousePosition.y - startPosition.y,
                width: windowInfo.width,
                height: windowInfo.height
            });
        }

        if (isResizing) {
            switch (canResize) {
                case ResizeDirection.BOTTOM:
                    setWindowInfo({
                        x: windowInfo.x,
                        y: windowInfo.y,
                        width: windowInfo.width,
                        height: mousePosition.y - windowInfo.y
                    });
                    break;
                case ResizeDirection.RIGHT:
                    setWindowInfo({
                        x: windowInfo.x,
                        y: windowInfo.y,
                        width: mousePosition.x - windowInfo.x,
                        height: windowInfo.height
                    });
                    break;
                case ResizeDirection.BOTTOM_RIGHT:
                    setWindowInfo({
                        x: windowInfo.x,
                        y: windowInfo.y,
                        width: mousePosition.x - windowInfo.x,
                        height: mousePosition.y - windowInfo.y
                    });
                    break;
            }
        } else {
            setCanResize(checkResize());
        }
    }, [mousePosition]);

    const toStyle = (info: WindowInformation) => {
        if (!isMaximized) return {
            left: info.x,
            top: info.y,
            width: info.width,
            height: info.height
        }
    }

    const startMove = (e: React.MouseEvent<HTMLDivElement>) => {
        setStartPosition({
            x: e.nativeEvent.offsetX,
            y: e.nativeEvent.offsetY
        })
        setIsMoving(true);
    }

    const stopMove = () => {
        setIsMoving(false);
    }

    const checkResize = () => {
        const nativeX = mousePosition.x - windowInfo.x;
        const nativeY = mousePosition.y - windowInfo.y;
        const isRightBorder: boolean = nativeX > (windowInfo.width ?? 0) - 10 && nativeX < (windowInfo.width ?? 0) + 10;
        const isBottomBorder: boolean = nativeY > (windowInfo.height ?? 0) - 10 && nativeY < (windowInfo.height ?? 0) + 10;

        if (isRightBorder && isBottomBorder) return ResizeDirection.BOTTOM_RIGHT;
        if (isRightBorder) return ResizeDirection.RIGHT;
        if (isBottomBorder) return ResizeDirection.BOTTOM;
        return ResizeDirection.NONE;
    }

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (canResize !== ResizeDirection.NONE) {
            setIsResizing(true);
        }
    }

    const handleMouseUp = () => {
        setIsResizing(false);
    }

    return (
        <div
            className={"window"
                + (props.isMinimized ? " hidden" : "")
                + (isMaximized ? " maximized" : "")
            }
            style={{
                ...toStyle(windowInfo),
                cursor: canResize ? getCursor(canResize) : 'default',
                userSelect: isMoving || isResizing ? 'none' : 'auto',
                zIndex: props.zIndex ?? 0
            }}
            onMouseDown={handleMouseDown}
            ref={reference}
        >
            < div
                className="title-bar"
                onMouseDown={(e) => {
                    if (props.onFocus) props.onFocus();
                    startMove(e);
                }}
                style={{
                    cursor: isMoving ? 'move' : 'pointer',
                    backgroundColor: props.hasFocus ? '#333' : '#555'
                }}
            >
                <h1 className="title-bar-text">
                    <img
                        src={props.icon}
                        alt={props.title}
                        className="title-bar-icon"
                    />
                    {props.title}
                </h1>
                <div className="title-bar-controls">
                    <button
                        className="title-bar-controls-button"
                        aria-label="Minimize"
                        onClick={props.onMinimize}
                    >
                        &#128469;&#xFE0E;
                    </button>
                    <button
                        className="title-bar-controls-button"
                        aria-label="Maximize"
                        onClick={() => setIsMaximized(!isMaximized)}
                    >
                        &#128470;&#xFE0E;
                    </button>
                    <button
                        className="title-bar-controls-button close-button"
                        aria-label="Close"
                        onClick={props.onClose}
                    >
                        &#128473;&#xFE0E;
                    </button>
                </div>
            </div >
            <div className="window-body">
                {props.children}
            </div>
        </div >
    )
}