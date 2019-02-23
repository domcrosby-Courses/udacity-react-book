import React from 'react';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { Route } from 'react-router-dom';

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
    book.shelf = status;
    this.setState(currentState => {
      return { books: [...currentState.books.filter(bk => bk.id !== book.id), book] };
    });
  };
  render() {
    return (
      <div className="app">
        <Route
          path="/search"
          render={() => (
            // Renders the search page
            <SearchBooks books={this.state.books} onBookChange={this.updateBook} />
          )}
        />
        <Route
          exact
          path="/"
          render={() => (
            // Renders the home page
            <ListBooks books={this.state.books} onBookChange={this.updateBook} />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
