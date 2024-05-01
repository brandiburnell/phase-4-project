import React from "react";
import "../components/styles/BookCard.css"
function BookCard({ title, author, image_url, rating }) {

    return (
        <div className="book-card">
            <h3 className="title">{title}</h3>
            <img
                src={image_url}
                alt={`a picture of the cover of ${title}`}
                className="book-image"
            />
            <p>by: {author}</p>
            {/* add emojis in later here */}
            <p>{rating}/5 stars on yelp</p>
        </div>
    )
}

export default BookCard;