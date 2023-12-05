import React from 'react';
import ReactDOM from 'react-dom/client';
//import App from './App.tsx';
//import Home from './Home.tsx';
import './index.css';
import { router } from "./router/router.tsx"
import { RouterProvider} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router}/>   
)
