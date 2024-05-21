import App from "./components/App";
import AllBooks from "./components/AllBooks";
import BookForm from "./components/BookForm";
import BookDetails from "./components/BookDetails";
import ReviewForm from "./components/ReviewForm";

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
            },
            {
                path: "/books/:id",
                element: <BookDetails />
            },
            {
                path: "/newreview/:bookID",
                element: <ReviewForm />
            }
        ]
    }
];

export default routes;