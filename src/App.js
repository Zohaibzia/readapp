import React, { useState, useEffect } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import BookSearch from "./component/BookSearch";
import BookList from "./component/BookList";
import * as BooksAPI from "./Api/BooksAPI";

const BooksApp = () => {
  const [books, setbooks] = useState([]);
  const [searchedBooks, setsearchedBooks] = useState([]);

  const [query, setquery] = useState("");
  useEffect(() => {
    BooksAPI.getAll().then((books) => {
      setbooks(books);
    });
  }, []);
  console.log(query);
  const changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((response) => {
      book.shelf = shelf;
      setbooks(books.filter((b) => b.id !== book.id).concat([book]));
    });
  };
  const submitQuery = (query, searchedBooks) => {
    if (query !== "") {
      setquery(query);

      BooksAPI.search(query, 100)
        .then((searchedBooks) => {
          if (searchedBooks.error) {
            setsearchedBooks([]);
          } else {
            // eslint-disable-next-line array-callback-return
            searchedBooks.map((filteredBooks) => {
              let bookOnShelf = books.find((b) => b.id === filteredBooks.id);

              if (bookOnShelf) {
                filteredBooks.shelf = bookOnShelf.shelf;
              } else {
                filteredBooks.shelf = "none";
              }
            });
            setsearchedBooks(searchedBooks);
          }
        })
        .catch((e) => {
          setsearchedBooks([]);
        });
    }
  };
  return (
    <div className="app">
      <Route
        exact
        path="/"
        render={({ history }) => (
          <BookList books={books} changeShelf={changeShelf} />
        )}
      />

      <Route
        exact
        path="/search"
        render={({ history }) => (
          <BookSearch
            searchedBooks={searchedBooks}
            changeShelf={changeShelf}
            submitQuery={submitQuery}
          />
        )}
      />
    </div>
  );
};

export default BooksApp;
