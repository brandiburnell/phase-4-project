import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

function App() {
  // have all huts pop in
  const [books, setBooks] = useState(['book']);

  // add useEffect for books
  useEffect(() => {
    fetch('http://localhost:5555/books')
      .then(r => r.json())
      .then(books => setBooks(books));
  }, []);

  return (
    <body className="body">
      <h1>bookshelf</h1>
      <Outlet context={[books, setBooks]} />
    </body>
  );
}

export default App;
