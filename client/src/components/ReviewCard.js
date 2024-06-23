import React, {useEffect, useState} from "react";

function ReviewCard({ bookId, description, rating, subject, userId }) {
    const [user, setUser] = useState({});

    useEffect(() => {
        fetch(`/users/${userId}`)
            .then(r => r.json())
            .then(user => setUser(user))
            .catch(error => console.error(error));
    //eslint-disable-next-line
    }, [])

    function emojiFromRating(rating) {
        let emoji = "⭐";
        let emojis = "";

        for (let i = 0; i < rating; i++) {
            emojis += emoji;
        }

        return emojis;
    }

    return (
        <div className="review">
            <p>{emojiFromRating(rating)}</p>
            <p style={{fontWeight: "bold"}}>{subject}</p>
            <p style={{fontStyle: "italic"}}>by: {user.username}</p>
            <p>{description}</p>
         </div>
    );
}

export default ReviewCard;