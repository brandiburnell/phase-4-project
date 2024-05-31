import { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import './styles/BookDetails.css'
import { useNavigate, useOutletContext } from "react-router-dom";
import ReviewCard from "./ReviewCard";

function BookDetails() {
    const [book, setBook] = useState({});
    const params = useParams();
    const bookId = params.id;
    const navigate = useNavigate();
    const [books, setBooks] = useOutletContext();
    const [refreshPage, setRefreshPage] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:5555/books/${bookId}`)
            .then(r => r.json())
            .then(book => setBook(book))
            .catch(error => console.error(error));
    }, [])

    useEffect(() => {
        if (refreshPage) {
            navigate('/');
        }
    }, [refreshPage])

    function handleDelete() {
        if (window.confirm("are you sure you want to delete this book?")) {
            fetch(`http://localhost:5555/books/${bookId}`, {
                method: "DELETE",
            })
                .then(() => {
                    const newBooks = books.filter((book) => book.id !== bookId);
                    setBooks(newBooks); 
                    window.alert(`${book.title} has been removed from the library`)
                    setRefreshPage(!refreshPage);
                });
        }
    }

    function handleChange() {
        console.log('be changed');
    }

    if (!book.title) {
        return <h1>loading...</h1>;
    };

    const bookReviews = book.reviews.map(review => {
        return (
            <ReviewCard
                bookId={bookId}
                description={review.description}
                rating={review.rating}
                subject={review.subject}
                userId={review.user_id}
                key={review.id}
            />
        );
    });

    return (
        <div className="book-details-container">
            <h2>book details</h2>
            <div className="book">
                <div className="book-details">
                    <img
                        className="book-detail-image"
                        src={book.image_url}
                        alt={`a picture of the cover of ${book.title}`}
                        style={{width: "500px", height: "500px", objectFit: "cover", padding: "5%", borderRadius: "80px"}}
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
                        <p className="attribute-label">book actions: </p>
                        <button className="delete-button" onClick={handleChange} style={{backgroundColor: '#140029', marginBottom: '10px'}}>update book</button>
                        <button className="delete-button" onClick={handleDelete}>delete book</button>
                    </div>
                </div>
                <div className="review-container">
                    <div className="review-heading">
                        <h2>reviews</h2>
                        <button className="add-review" onClick={() => navigate(`/newreview/${bookId}`)}>add a review</button>
                    </div>
                    {bookReviews.length === 0? <div className="review" style={{justifyItems: "center"}}>no reviews yet</div> : bookReviews}
                </div>
            </div>
        </div>
    );
}

export default BookDetails;