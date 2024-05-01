import App from "./components/App";
import AllBooks from "./components/AllBooks";

const routes = [
    {
        path:"/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <AllBooks />
            }
        ]
    }
];

export default routes;