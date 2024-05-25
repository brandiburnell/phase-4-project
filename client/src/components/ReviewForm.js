import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

function ReviewForm () {
    const params = useParams();
    const bookId = params.bookID;
    // const [refreshPage, setRefreshPage] = useState(false);
    const navigate = useNavigate();

    // useEffect(() => {
    //     // reset form??
    // }, [refreshPage]);

    const formSchema = yup.object().shape({
        description: yup.string().required("must enter a review body"),
        rating: yup.number().positive().integer()
                        .required("must enter a rating")
                        .typeError("please enter an integer")
                        .min(1, "year published must be greater than 0")
                        .max(5, "year published must be less or equal to 5"),
        subject: yup.string().required("must enter a review title"),
        username: yup.string().required("must enter a username")
    });

    const formik = useFormik({
        initialValues: {
            description: "",
            rating: "",
            subject: "",
            username: "",
            bookId: parseInt(bookId)
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            console.log(values);
            fetch('http://localhost:5555/reviews', {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(values, null, 2),
            })
                .then((res) => {
                    if (res.status === 201) {
                    //   setRefreshPage(!refreshPage);
                      formik.resetForm();
                      navigate(`/books/${bookId}`)
                      // mavigate back to book page 
                      // add user to review
                    }
                });
        }
    });

    return (
        <div className="review-form-container">
            <h2 className="page-title">add a review using the form below</h2>
            <form id="add-review-form" className="book-form" onSubmit={formik.handleSubmit}>
                <label className="form-box">username:</label>
                <input
                    id="username"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                >
                </input>
                <p className="error-tag">{formik.errors.username}</p>
                <br/>
                <label className="form-box">rating:</ label>
                <input
                    id="rating"
                    name="rating"
                    value={formik.values.rating}
                    onChange={formik.handleChange}
                    type="number"
                >
                </input>
                <p className="error-tag">{formik.errors.rating}</p>
                <br />
                <label className="form-box">review title:</label>
                <input
                    id="subject"
                    name="subject"
                    value={formik.values.subject}
                    onChange={formik.handleChange}
                >
                </input>
                <p className="error-tag">{formik.errors.subject}</p>
                <br />
                <label className="form-box">review:</label>
                <input 
                    id="description"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                >
                </input>
                <p className="error-tag">{formik.errors.description}</p>
                <br />
                <button type="submit" className="submit-button">submit review</button>
            </form>
        </div>
    );
}

export default ReviewForm;