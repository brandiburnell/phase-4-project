import { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import './styles/BookDetails.css'

function BookDetails() {
    const [book, setBook] = useState({});
    const params = useParams();
    const bookId = params.id;

    useEffect(() => {
        fetch(`http://localhost:5555/books/${bookId}`)
            .then(r => r.json())
            .then(book => setBook(book))
            .catch(error => console.error(error));
    }, [bookId])

    if (!book.title) {
        return <h1>loading...</h1>;
    };

    function emojiFromRating(rating) {
        let emoji = "⭐";
        let emojis = "";

        for (let i = 0; i < rating; i++) {
            emojis += emoji;
        }

        return emojis;
    }

    console.log(book.reviews);
    const bookReviews = book.reviews.map(review => {
        return (
            <div key={review.id} className="review">
                <p>{emojiFromRating(review.rating)}</p>
                <p style={{fontWeight: "bold"}}>{review.subject}</p>
                <p>{review.description}</p>
            </div>
        )
    });
    console.log(bookReviews);

    return (
        <div className="book-details-container">
            <h2>book details</h2>
            <div className="book">
                <div className="book-details">
                    <img
                        className="book-detail-image"
                        src={book.image_url}
                        alt={`a picture of the cover of ${book.title}`}
                        style={{width: "40%", height: "30em", objectFit: "cover", padding: "5%", borderRadius: "80px"}}
                    >
                    </img>
                    <div className="book-attributes"> 
                        <p className="attribute-label">title: </p>
                        <p className="book-attribute">{book.title}</p>
                        <p className="attribute-label">author: </p>
                        <p className="book-attribute">{book.author}</p>
                        <p className="attribute-label">year published: </p>
                        <p className="book-attribute">{book.year_published}</p>
                        <p className="attribute-label">book summary: </p>
                        <p className="book-attribute">{book.summary}</p>
                    </div>
                </div>
                <div className="review-container">
                    <div className="review-heading">
                        <h2>reviews</h2>
                        <button className="add-review">add a review</button>
                    </div>
                    {bookReviews}
                </div>
            </div>
        </div>
    );
}

export default BookDetails;