
import App from "./App.jsx";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "./home.jsx";
import { ContextUserProvider } from "./contextUser.jsx";
const router=createBrowserRouter([
  {
    path:"/",
    element:<ContextUserProvider><App /></ContextUserProvider>,
    children:[
        { path: '/', element: <Navigate to="/home" replace /> },
        {
            path:"/home",
            element:<Home />,
        },
    ]}
])
export default router;
