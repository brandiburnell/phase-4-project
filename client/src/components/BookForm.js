import React, { useState, useEffect } from "react";
import "../components/styles/BookForm.css"
import { useOutletContext } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

function BookForm() {
    // const [title, setTitle] = useState("");
    // const [author, setAuthor] = useState("");
    // const [year, setYear] = useState("");
    // const [summary, setSummary] = useState("");
    // const [url, setUrl] = useState("");
    const [books, setBooks] = useOutletContext();
    const [refreshPage, setRefreshPage] = useState(false);

    useEffect(() => {
        fetch('http://localhost:5555/books')
            .then((r) => r.json())
            .then(books => {
                setBooks([...books]);
            });
    }, [refreshPage]);

    const formSchema = yup.object().shape({
        // title: yup.string().required("Must enter a book title"),
        // author: yup.string().required("Must enter an author"),
        // yearPublished: yup.number().positive().integer()
        //                 .required("Must enter a year published")
        //                 .typeError("Please enter an integer")
        //                 .min(2000),
        // summary: yup.string().required("Must enter a book summary"),
        // image_url: yup.string().required("Must enter an image url")
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
            console.log(values);
            fetch('http://localhost:5555/books', {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(values, null, 2),
            })
                .then((res) => {
                    console.log(res.status);
                    if (res.status == 201) {
                      setRefreshPage(!refreshPage);
                    }
                });
        }
    });

    return (
        <div className="book-form-container">
            <h2 className="page-title">add a new book using the form below</h2>
            <form className="book-form" onSubmit={formik.handleSubmit}>
                <label className="form-box">title:</label>
                <input
                    id="title"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                >
                </input>
                <br/>
                <label className="form-box">author:</ label>
                <input
                    id="author"
                    name="author"
                    value={formik.values.author}
                    onChange={formik.handleChange}
                >
                </input>
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
                <br />
                <label className="form-box">summary:</label>
                <input 
                    id="summary"
                    name="summary"
                    value={formik.values.summary}
                    onChange={formik.handleChange}
                >
                </input>
                <br />
                <label className="form-box">book cover image:</label>
                <input
                    id="imageUrl"
                    name="imageUrl"
                    value={formik.values.imageUrl}
                    onChange={formik.handleChange}
                >
                </input>
                <br />
                <button type="submit" className="submit-button">add book</button>
            </form>
        </div>
    );
}

export default BookForm;