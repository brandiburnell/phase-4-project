import React from "react";
import "../components/styles/BookCard.css"
import { useNavigate } from "react-router-dom";

function BookCard({ title, author, image_url, reviews, id }) {
    const navigate = useNavigate();

    function emojiFromRating(rating) {
        let emoji = "⭐";
        let emojis = "";

        for (let i = 0; i < rating; i++) {
            emojis += emoji;
        }

        return emojis;
    }

    function getAvgRating(reviews) {
        let ratings = []
        if (reviews) {
            if (reviews.length > 0) {
                ratings = reviews.map((review) => {
                    return review.rating;
                })
                const avgRating = Math.round(ratings.reduce((a,b) => a + b) / ratings.length);
                return avgRating;
            }
            return null;
        }
        else {
            return null;
        }
    }


    return (
        <div className="book-card" onClick={() => navigate(`/books/${id}`) }>
            <h3 className="title">{title}</h3>
            <img
                src={image_url}
                alt={`a picture of the cover of ${title}`}
                className="book-image"
            />
            <p className="author">by: {author}</p>
            <p>{getAvgRating(reviews) === null? '☆☆☆☆☆' : emojiFromRating(getAvgRating(reviews))}</p>
        </div>
    )
}

export default BookCard;