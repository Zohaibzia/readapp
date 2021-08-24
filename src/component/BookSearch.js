import React, { useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";

import Book from "./Book";

const BookSearch = ({ searchedBooks, submitQuery, changeShelf }) => {
  const [query, setquery] = useState("");
  const updateQuery = (query) => {
    setquery(query);
  };
  return (
    <div>
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>

          <form
            className="search-books-input-wrapper"
            onChange={(event) => submitQuery(event.target.value)}
          >
            <input
              type="text"
              placeholder="search Book"
              value={query}
              onChange={(event) => updateQuery(event.target.value)}
            />
          </form>
        </div>
        <div className="search-books-results">
          <ol className="books-grid"></ol>
        </div>
      </div>

      <div className="bookshelf">
        <div className="bookshelf-books">
          <ol className="books-grid">
            {searchedBooks.map((book) => (
              <Book key={book.id} book={book} changeShelf={changeShelf} />
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default BookSearch;
