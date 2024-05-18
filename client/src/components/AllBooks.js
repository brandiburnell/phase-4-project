import React from "react";
import BookCard from "./BookCard";
import { Outlet, useOutletContext } from "react-router-dom";
import "../components/styles/AllBooks.css"

function AllBooks() {
    const [books, setBooks] = useOutletContext();

    const booksToDisplay = books.map((book) => {
        return (
            <BookCard
                title={book.title}
                author={book.author}
                image_url={book.image_url}
                reviews={book.reviews}
                key={book.id}
                id={book.id}
            />
        );
    });

    return (
        <div className="book-container">
            {booksToDisplay}
        </div>
    );
}

export default AllBooks;