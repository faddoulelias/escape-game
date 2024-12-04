export type Position = {
    x: number
    y: number
}

export type Node = {
    id: string
    position: Position
    active: boolean
}

export type Edge = {
    source: Node
    target: Node
}


interface GraphJSON {
    nodes: Node[]
    edgesDefinition: {
        from: string
        to: string
    }[]
}


export default class Graph {
    private nodes: Node[]
    private edges: Edge[]

    constructor(nodes: Node[], edges: Edge[]) {
        this.nodes = nodes
        this.edges = edges
    }

    static fromJSON(json: GraphJSON) {
        const graph = new Graph([], []);
        graph.nodes = json.nodes
        graph.edges = json.edgesDefinition.map(({ from, to }) => {
            const source = graph.getNodeById(from);
            const target = graph.getNodeById(to);
            if (!source || !target) {
                throw new Error('Node not found');
            }
            return { source, target }
        });
        return graph
    }

    static fromGraph(graph: Graph) {
        return new Graph([...graph.nodes], [...graph.edges])
    }

    addNode(node: Node) {
        this.nodes.push(node)
    }

    addEdge(edge: Edge) {
        this.edges.push(edge)
    }

    addEdgeByNodes(source: Node, target: Node) {
        this.addEdge({ source, target })
    }

    addEdgeByIds(sourceId: string, targetId: string) {
        const source = this.getNodeById(sourceId)
        const target = this.getNodeById(targetId)
        if (!source || !target) {
            throw new Error('Node not found')
        }
        this.addEdge({ source, target });
    }

    getAttachedEdges(node: Node) {
        return this.edges.filter(edge => edge.source === node || edge.target === node)
    }

    getNodeById(id: string) {
        return this.nodes.find(node => node.id === id)
    }

    isPathOpen(edge: Edge) {
        return edge.source.active || edge.target.active
    }

    isReachable(node: Node) {
        return this.getAttachedEdges(node).some(edge => this.isPathOpen(edge))
    }

    removeNode(node: Node) {
        this.nodes = this.nodes.filter(n => n !== node)
        this.edges = this.edges.filter(edge => edge.source !== node && edge.target !== node)
    }

    removeEdge(edge: Edge) {
        this.edges = this.edges.filter(e => e !== edge)
    }

    getNodes() {
        return this.nodes
    }

    getEdges() {
        return this.edges
    }
}