import "./styles/Main.css"
import Desktop from './generics/desktop/Desktop'
import NetworkMap from './generics/apps/NetworkMap'
import WindowLogin, { WindowLoginUser } from "./generics/apps/WindowLogin"
import Graph from "../logic/Graph"
import React from "react"


export default function Main() {
    const [selectedUser, setSelectedUser] = React.useState<WindowLoginUser | undefined>(undefined);

    const users: WindowLoginUser[] = [
        {
            name: 'Douze', username: 'Yann Douze', password: 'lpwan',
            passwordHint: 'Réseau à faible puissance et faible portée, utilisé pour connecter des appareils intelligents.'
        },
        {
            name: 'Selami', username: 'Yamine Selami', password: 'stuffing',
            passwordHint: 'Technique utilisée pour garantir que les données ne sont pas corrompues dans un bus de communication, par l\'ajout de bits supplémentaires.'
        },
        {
            name: 'Tauzin', username: 'Philippe Tauzin', password: 'solde',
            passwordHint: 'Saison des __ a maltes en fevrier'
        },
        {
            name: 'Darga', username: 'Anouna Darga', password: 'nvic',
            passwordHint: 'Ce contrôleur dispose d\'un composant essentiel pour gérer les interruptions, connu sous le nom de contrôleur d\'interruption vecteur.'
        },
        {
            name: 'Pecheux', username: 'Francois Pecheux', password: 'join',
            passwordHint: 'Ce mot-clé SQL permet de combiner des données provenant de plusieurs tables, en établissant une relation basée sur des colonnes partagées.'
        },
        {
            name: 'Bovo', username: 'Nicolas Bovo', password: 'routh-hurwitz',
            passwordHint: 'Nom d\'une méthode qui aide à analyser la stabilité des systèmes dynamiques.'
        },
        {
            name: 'Marchetti', username: 'Marchetti', password: 'implements',
            passwordHint: 'Mot-clé utilisé pour indiquer qu\'une classe ou une méthode suit une interface spécifiée.'
        },
        {
            name: 'Morot', username: 'Cathy Morot', password: 'loulous',
            passwordHint: 'Salut mes ___!'
        },
        {
            name: 'Sammier', username: 'Pierre-Henry Sammier', password: 'oscillateur',
            passwordHint: 'Dispositif qui change des signaux électriques en variations continues.'
        },
        {
            name: 'Base de données', username: 'Base de données', password: 'password',
            passwordHint: ''
        },
        {
            name: 'Bras', username: 'Francis Bras', password: 'mutex',
            passwordHint: 'Un mécanisme utilisé pour assurer l\'accès à des ressources partagées dans un environnement multitâche.'
        },
    ]

    const graph: Graph = new Graph([
        { title: 'Douze', position: { x: 265, y: 229 }, active: false },
        { title: 'Selami', position: { x: 780, y: 81 }, active: false },
        { title: 'Tauzin', position: { x: 1135, y: 122 }, active: false },
        { title: 'Darga', position: { x: 635, y: 500 }, active: false },
        { title: 'Pecheux', position: { x: 1620, y: 354 }, active: false },
        { title: 'Bovo', position: { x: 921, y: 614 }, active: false },
        { title: 'Marchetti', position: { x: 1378, y: 595 }, active: false },
        { title: 'Morot', position: { x: 280, y: 960 }, active: true },
        { title: 'Sammier', position: { x: 1606, y: 865 }, active: false },
        { title: 'Base de données', position: { x: 1158, y: 372 }, active: false },
        { title: 'Bras', position: { x: 1558, y: 1072 }, active: false }
    ], []);

    graph.addEdgeByTitles('Douze', 'Darga');
    graph.addEdgeByTitles('Douze', 'Selami');
    graph.addEdgeByTitles('Douze', 'Morot');
    graph.addEdgeByTitles('Morot', 'Bovo');
    graph.addEdgeByTitles('Morot', 'Bras');
    graph.addEdgeByTitles('Morot', 'Sammier');
    graph.addEdgeByTitles('Pecheux', 'Marchetti');
    graph.addEdgeByTitles('Pecheux', 'Base de données');
    graph.addEdgeByTitles('Marchetti', 'Sammier');
    graph.addEdgeByTitles('Bovo', 'Marchetti');
    graph.addEdgeByTitles('Bovo', 'Base de données');
    graph.addEdgeByTitles('Bras', 'Sammier');
    graph.addEdgeByTitles('Darga', 'Tauzin');
    graph.addEdgeByTitles('Selami', 'Tauzin');
    graph.addEdgeByTitles('Tauzin', 'Pecheux');

    const [graphState, setGraphState] = React.useState<Graph>(graph);


    return (
        <Desktop
            apps={
                [
                    {
                        name: 'Network Map', icon: require('./styles/icons/Network.svg').default,
                        component:
                            < NetworkMap graph={graph}
                                onNodeClick={(node) => setSelectedUser(users.find(u => u.name === node.title))}
                            />
                    },
                    {
                        name: 'Login', icon: require('./styles/icons/RemoteDesktop.svg').default,
                        component: <WindowLogin user={selectedUser}
                            type={selectedUser ? 'normal' : 'error'}
                        />
                    }
                ]
            }
        />
    )
}
