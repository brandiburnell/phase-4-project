import React, { useState, useEffect } from "react";
import "../components/styles/BookForm.css"
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

function UpdateBookForm() {
    const params = useParams();
    const bookId = params.bookID;
    const navigate = useNavigate();
    const [book, setBook] = useState({});

    // fetch to get inital values
    useEffect(() => {
        fetch(`http://localhost:5555/books/${bookId}`)
            .then(r => r.json())
            .then(book => setBook(book))
            .catch(error => console.error(error));
        
    }, []);

    const formSchema = yup.object().shape({
        title: yup.string(),
        author: yup.string(),
        yearPublished: yup.number().positive().integer()
                        .typeError("please enter an integer")
                        .min(1500, "year published must be greater than 1500")
                        .max(2024, "year published must be less than 2024"),
        summary: yup.string(),
        imageUrl: yup.string().url("image url must be a valid url")
    });

    const formik = useFormik({
        initialValues: {
            title: "",
            author: "",
            yearPublished: "",
            summary: "",
            imageUrl: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch('http://localhost:5555/books', {
                method: "PATCH",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(values, null, 2),
            })
                .then((res) => {
                    if (res.status == 200) {
                        console.log(res.json);
                        formik.resetForm();
                    }
                });
        }
    });

    return (
        <div className="book-form-container">
            <h2 className="page-title">update {book.title} using the form below</h2>
            <h3 style={{textAlign: "center"}}>leave fields blank that you wish to remain unchanged</h3>
            <form id="add-book-form" className="book-form" onSubmit={formik.handleSubmit}>
                <label className="form-box">title:</label>
                <input
                    id="title"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    placeholder={book.title}
                >
                </input>
                <p className="error-tag">{formik.errors.title}</p>
                <br/>
                <label className="form-box">author:</ label>
                <input
                    id="author"
                    name="author"
                    value={formik.values.author}
                    onChange={formik.handleChange}
                    placeholder={book.author}
                >
                </input>
                <p className="error-tag">{formik.errors.author}</p>
                <br />
                <label className="form-box">year published:</label>
                <input
                    id="yearPublihed"
                    name="yearPublished"
                    value={formik.values.yearPublished}
                    onChange={formik.handleChange}
                    type="number"
                    placeholder={book.year_published}
                >
                </input>
                <p className="error-tag">{formik.errors.yearPublished}</p>
                <br />
                <label className="form-box">summary:</label>
                <input 
                    id="summary"
                    name="summary"
                    value={formik.values.summary}
                    onChange={formik.handleChange}
                    placeholder={book.summary}
                >
                </input>
                <p className="error-tag">{formik.errors.summary}</p>
                <br />
                <label className="form-box">book cover image:</label>
                <input
                    id="imageUrl"
                    name="imageUrl"
                    value={formik.values.imageUrl}
                    onChange={formik.handleChange}
                    placeholder={book.image_url}
                >
                </input>
                <p className="error-tag">{formik.errors.imageUrl}</p>
                <br />
                <button type="submit" className="submit-button">update book</button>
            </form>
        </div>
    );
}

export default UpdateBookForm;