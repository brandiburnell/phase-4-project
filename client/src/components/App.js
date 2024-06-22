import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./NavBar";

function App() {
  // have all books pop in
  const [books, setBooks] = useState([]);
  const location = useLocation();

  // add useEffect for books
  useEffect(() => {
    fetch('http://localhost:8000/books')
      .then(r => r.json())
      .then(books => setBooks(books));
  }, [location.key]);

  return (
    <div className="body">
      <NavBar />
      <Outlet context={[books, setBooks]} />
    </div>
  );
}

export default App;
