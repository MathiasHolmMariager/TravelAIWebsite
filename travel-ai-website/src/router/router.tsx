import Fly from "../pages/fly/Fly";
import Oplevelser from "../pages/oplevelser/Oplevelser";
import Home from "../pages/Home/Home";
import App from "../App";
import Persons from "../pages/persons/Persons";
import Overview from "../pages/overview/Overview";
import Accom from "../pages/accom/Accom";
// installere fra react-router-dom
// installere fra react-router
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "flight", element: <Fly /> },
      { path: "accommodation", element: <Accom /> },
      { path: "Interrest", element: <Persons /> },
      { path: "experiences", element: <Oplevelser /> },
      { path: "overview", element: <Overview /> },

    ],
  },
]);
