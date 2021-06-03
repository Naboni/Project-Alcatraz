import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import './index.css';
import App from './App';

import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/styles/tailwind.css";

ReactDOM.render (
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.getElementById('root')
);
