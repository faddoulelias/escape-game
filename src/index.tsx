import ReactDOM from 'react-dom/client';
import Main from './components/Main';
import './styles/index.css';
import { StrictMode } from 'react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <Main />
  </StrictMode>
);
