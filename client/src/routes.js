import App from "./components/App";
import AllBooks from "./components/AllBooks";
import BookForm from "./components/BookForm";

const routes = [
    {
        path:"/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <AllBooks />
            },
            {
                path: "/newbook",
                element: <BookForm />
            }
        ]
    }
];

export default routes;