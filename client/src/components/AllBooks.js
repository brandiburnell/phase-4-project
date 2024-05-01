import React from "react";
import BookCard from "./BookCard";
import { Outlet, useOutletContext } from "react-router-dom";

function AllBooks() {
    const [books, setBooks] = useOutletContext();

    const booksToDisplay = books.map((book) => {
        return (
            <BookCard
                title={book.title}
                author={book.author}
                image_url={book.image_url}
                rating={book.rating}
            />
        );
    });

    return (
        <div>
            <h1>books</h1>
            {booksToDisplay}
        </div>
    );
}

export default AllBooks;