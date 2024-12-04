import "./styles/Main.css"
import Desktop from './generics/desktop/Desktop'
import NetworkMap from './generics/apps/NetworkMap'
import WindowLogin, { WindowLoginUser } from "./generics/apps/WindowLogin"
import Graph from "../logic/Graph"
import React, { StrictMode } from "react"
import graphJson from "./data/graph.json"
import usersJson from "./data/users.json"

const parseUsers = (json: any) => {
  return json.map((user: any) => {
    return {
      id: user.id,
      username: user.username,
      password: user.password,
      passwordHint: user.passwordHint,
      profilePicture: require(`../components/data/${user.profilePicture}`)
    };
  });
}

export default function Main() {
  const [selectedUser, setSelectedUser] = React.useState<WindowLoginUser | null>(null);
  const [users, setUsers] = React.useState<WindowLoginUser[]>(parseUsers(usersJson));
  const [graph, setGraph] = React.useState<Graph>(Graph.fromJSON(graphJson));

  const getType = (user: WindowLoginUser | null) => {
    const node = user ? graph.getNodeById(user.id) : null;
    if (!node) return 'error';
    if (!graph.isReachable(node)) return 'error';
    if (node.active) return 'success';
    else return 'normal';
  }

  const logUser = (user: WindowLoginUser) => {
    const node = graph.getNodeById(user.id);
    if (node) {
      node.active = true;
    }
    setGraph(Graph.fromGraph(graph));
  }

  const apps = [
    {
      name: 'Network Map', icon: require('./styles/icons/Network.svg').default,
      component:
        < NetworkMap graph={graph}
          onNodeClick={(node) => {
            const user = users.find(user => user.id === node.id);
            setSelectedUser(user ?? null);
          }}
        />
    },
    {
      name: 'Login', icon: require('./styles/icons/RemoteDesktop.svg').default,
      component:
        <WindowLogin
          key={selectedUser?.username}
          user={selectedUser}
          type={getType(selectedUser)} onSuccess={
            (user) => {
              logUser(user);
              setSelectedUser(user);
            }
          } />
    }
  ];

  return (
    <Desktop apps={apps} />
  )
}
