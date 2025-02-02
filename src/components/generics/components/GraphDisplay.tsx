import React from 'react'
import "./styles/Graph.css"
import Graph, { Node, Edge } from '../../../logic/Graph'


interface GraphProps {
    graph: Graph
    onNodeClick?: (node: Node) => void
}

type NodeItem = {
    isHovered: boolean,
    node: Node
}

export default function GraphDisplay(props: GraphProps) {
    const [nodeMap, setNodeMap] = React.useState<NodeItem[]>(props.graph.getNodes().map(node => ({ isHovered: false, node: node })));

    const containerRef = React.useRef<HTMLDivElement>(null);

    const setHovered = (index: number, isHovered: boolean) => {
        setNodeMap(nodeMap.map((item, i) => i === index ? { isHovered, node: item.node } : item))
    }

    const getNodeColor = (node: Node) => {
        if (node.active) return '#2e2';
        if (props.graph.isReachable(node)) return '#f90';
        return '#922';
    }

    return (
        <svg className='graph' viewBox="0 0 1920 1080">
            {props.graph.getEdges().map((edge, index) => (
                <line
                    key={index}
                    x1={edge.source.position.x}
                    y1={edge.source.position.y}
                    x2={edge.target.position.x}
                    y2={edge.target.position.y}
                    stroke={props.graph.isPathOpen(edge) ? '#000' : '#888'}
                    strokeWidth={props.graph.isPathOpen(edge) ? 10 : 8}
                    strokeDasharray={props.graph.isPathOpen(edge) ? '0' : '20 20'}
                />
            ))}
            {nodeMap.map((nodeItem, index) => (
                <g
                    key={index}
                >
                    <circle
                        cx={nodeItem.node.position.x}
                        cy={nodeItem.node.position.y}
                        onMouseEnter={() => setHovered(index, true)}
                        onMouseLeave={() => setHovered(index, false)}
                        r={nodeItem.isHovered ? 40 : 20}
                        fill={getNodeColor(nodeItem.node)}
                        stroke='black'
                        strokeWidth={5}
                        onClick={() => { if (props.onNodeClick) props.onNodeClick(nodeItem.node) }}
                    />
                    <text
                        x={nodeItem.node.position.x + (nodeItem.isHovered ? 40 : 20)}
                        y={nodeItem.node.position.y - (nodeItem.isHovered ? 40 : 20)}
                        fill="black"
                        fontSize={nodeItem.isHovered ? '4em' : '3em'}
                        fontWeight={700}
                        stroke='white'
                        strokeWidth={1}
                    >{nodeItem.node.id}</text>
                </g>
            ))}
        </svg>
    )
}