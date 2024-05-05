import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

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
    <div className="body">
      <NavBar />
      <Outlet context={[books, setBooks]} />
    </div>
  );
}

export default App;
