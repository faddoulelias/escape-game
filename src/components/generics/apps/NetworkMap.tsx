import React from 'react'
import GraphDisplay from '../components/GraphDisplay'
import './styles/NetworkMap.css'
import Graph, { Edge, Node } from '../../../logic/Graph'

export type relais = 'Douze' | 'Selami' | 'Tauzin' |
    'Darga' | 'Pecheux' | 'Bovo' |
    'Marchetti' | 'Morot' | 'Sammier' |
    'Base de données' | 'Bras';

export interface NetworkMapProps {
    onNodeClick?: (node: Node) => void;
    graph: Graph;
}

export default function NetworkMap(props: NetworkMapProps) {
    return (
        <div className='graph-div'>
            <GraphDisplay graph={props.graph} onNodeClick={props.onNodeClick} />
        </div>
    )
}
