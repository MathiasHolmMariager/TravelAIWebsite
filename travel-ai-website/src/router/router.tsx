import Fly from "../pages/fly/Fly";
import Hotel from "../pages/hotel/Hotel";
import Oplevelser from "../pages/oplevelser/Oplevelser";
import Home from "../pages/Home/Home";
import App from "../App";
import Persons from "../pages/persons/Persons";
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
      { path: "accommodation", element: <Hotel /> },
      { path: "Interrest", element: <Persons /> },
      { path: "experiences", element: <Oplevelser /> },
    ],
  },
]);
