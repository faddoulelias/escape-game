export type Position = {
    x: number
    y: number
}

export type Node = {
    title: string
    position: Position
    active: boolean
}

export type Edge = {
    source: Node
    target: Node
}

export default class Graph {
    private nodes: Node[]
    private edges: Edge[]

    constructor(nodes: Node[], edges: Edge[]) {
        this.nodes = nodes
        this.edges = edges
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

    addEdgeByTitles(sourceTitle: string, targetTitle: string) {
        const source = this.getNodeByTitle(sourceTitle)
        const target = this.getNodeByTitle(targetTitle)
        if (!source || !target) {
            throw new Error('Node not found')
        }
        this.addEdge({ source, target });
    }

    getNodeByTitle(title: string) {
        return this.nodes.find(node => node.title === title)
    }

    activateNode(title: string) {
        const node = this.getNodeByTitle(title)
        if (!node) {
            throw new Error('Node not found')
        }
        node.active = true
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