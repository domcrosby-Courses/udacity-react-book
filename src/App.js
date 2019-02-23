import React from 'react';
import { Route } from 'react-router-dom';
import ListBooks from './screens/ListBooks';
import SearchBooks from './screens/SearchBooks';
import * as BooksAPI from './data/BooksAPI';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState(() => ({
        books
      }));
    });
  }

  updateBook = (book, status) => {
    BooksAPI.update(book, status);
    const updatedBook = book;
    updatedBook.shelf = status;
    this.setState(currentState => {
      return { books: [...currentState.books.filter(bk => bk.id !== book.id), updatedBook] };
    });
  };

  render() {
    const { books } = this.state;
    return (
      <div className="app">
        <Route
          path="/search"
          render={() => (
            // Renders the search page
            <SearchBooks books={books} onBookChange={this.updateBook} />
          )}
        />
        <Route
          exact
          path="/"
          render={() => (
            // Renders the home page
            <ListBooks books={books} onBookChange={this.updateBook} />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
