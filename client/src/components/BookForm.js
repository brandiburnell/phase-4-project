import React, { useState, useEffect } from "react";
import "../components/styles/BookForm.css"
import { useOutletContext, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

function BookForm() {
    const [books, setBooks] = useOutletContext();
    const [refreshPage, setRefreshPage] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // setBooks([...books]);
        if (refreshPage) {
            navigate('/');
        }
    }, [refreshPage]);

    const formSchema = yup.object().shape({
        title: yup.string().required("must enter a book title"),
        author: yup.string().required("must enter an author"),
        yearPublished: yup.number().positive().integer()
                        .required("must enter a year published")
                        .typeError("please enter an integer")
                        .min(1500, "year published must be greater than 1500")
                        .max(2024, "year published must be less than 2024"),
        summary: yup.string().required("must enter a book summary"),
        imageUrl: yup.string().required("must enter an image url").url("image url must be a valid url")
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
            fetch('http://localhost:8000/books', {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(values, null, 2),
            })
                .then((res) => {
                    if (res.status == 201) {
                        formik.resetForm();
                        setRefreshPage(!refreshPage);
                    }
                });
        }
    });

    return (
        <div className="book-form-container">
            <h2 className="page-title">add a new book using the form below</h2>
            <form id="add-book-form" className="book-form" onSubmit={formik.handleSubmit}>
                <label className="form-box">title:</label>
                <input
                    id="title"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
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
                >
                </input>
                <p className="error-tag">{formik.errors.imageUrl}</p>
                <br />
                <button type="submit" className="submit-button">add book</button>
            </form>
        </div>
    );
}

export default BookForm;