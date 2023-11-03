import Fly from "../pages/fly/Fly";
import Hotel from "../pages/hotel/Hotel";
import Oplevelser from "../pages/oplevelser/Oplevelser";
import Home from "../pages/Home/Home";
import App from "../App";
// installere fra react-router-dom
// installere fra react-router
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "home", element: <Home /> },
      { path: "fly", element: <Fly /> },
      { path: "hotel", element: <Hotel /> },
      { path: "oplevelser", element: <Oplevelser /> },
    ],
  },
]);
