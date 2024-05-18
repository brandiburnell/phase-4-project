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

    return (
        <div className="book-details-container">
            <h2>book details</h2>
            <div className="book-details">
                <img
                    className="book-detail-image"
                    src={book.image_url}
                    alt={`a picture of the cover of ${book.title}`}
                    style={{width: "40%", height: "30em", objectFit: "cover", padding: "5%", borderRadius: "3em"}}
                >
                </img>
                <div className="book-attributes"> 
                    <p className="book-attribute">{book.title}</p>
                    <p className="book-attribute">{book.author}</p>
                    <p className="book-attribute">{book.year_published}</p>
                    <p className="book-attribute">{book.summary}</p>
                </div>
            </div>
        </div>
    );
}

export default BookDetails;