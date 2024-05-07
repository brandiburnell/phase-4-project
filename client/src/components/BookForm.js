import React, { useState } from "react";
import "../components/styles/BookForm.css"
import { useOutletContext } from "react-router-dom";

function BookForm() {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [year, setYear] = useState("");
    const [summary, setSummary] = useState("");
    const [url, setUrl] = useState("");
    const [books, setBooks] = useOutletContext();

    function handleSubmit(e) {
        e.preventDefault();
        const formData = {
            title: title,
            author: author,
            year_published: year,
            summary: summary,
            image_url: url
        };
        console.log(formData);
        fetch('http://localhost:5555/books', {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(formData),
        })
            .then(r => r.json())
            .then(newBook => setBooks([...books, newBook]))
            .catch(error => console.error(error));
            alert("new book added :)")
    }

    return (
        <div className="book-form-container">
            <h2 className="page-title">add a new book using the form below</h2>
            <form className="book-form" onSubmit={handleSubmit}>
                <label className="form-box">title:</label>
                <input
                    id="title-input"
                    type="text"
                    value={title}
                    required="required"
                    onChange={(e) => setTitle(e.target.value)}
                >
                </input>
                <br/>
                <label className="form-box">author:</ label>
                <input
                    id="author-input"
                    type="text"
                    value={author}
                    required="required"
                    onChange={(e) => setAuthor(e.target.value)}
                >
                </input>
                <br />
                <label className="form-box">year published:</label>
                <input
                    id="year-input"
                    type="text"
                    value={year}
                    required="required"
                    onChange={(e) => setYear(e.target.value)}
                >
                </input>
                <br />
                <label className="form-box">summary:</label>
                <input 
                    id="summary-input"
                    type="text"
                    value={summary}
                    required="required"
                    onChange={(e) => setSummary(e.target.value)}
                >
                </input>
                <br />
                <label className="form-box">book cover image:</label>
                <input
                    id="url-input"
                    type="text"
                    value={url}
                    required="required"
                    onChange={(e) => setUrl(e.target.value)}
                >
                </input>
                <br />
                <button className="submit-button">add book</button>
            </form>
        </div>
    );
}

export default BookForm;