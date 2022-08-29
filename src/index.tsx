import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StoreProvider } from './components/context/context'

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
    <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
