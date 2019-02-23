import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../data/BooksAPI';
import BooksGrid from '../components/BooksGrid';

/**
 * User can search for books and add to a shelf
 * Current shelf status is displayed
 * @version 1.0.0
 */
class SearchBooks extends Component {
  static propTypes = {
    /** list of books the user has read, currently reading, wishlisted */
    books: PropTypes.array.isRequired,
    /** updates the status of a book object given a status string */
    onBookChange: PropTypes.func.isRequired
  };

  state = {
    /** Query used in search, updates searchBooks as well as searchBox */
    query: '',
    /** List of books returned from the query */
    searchBooks: [],
    noSearch: true
  };

  updateQuery = query => {
    this.setState(() => ({ query }));
    if (query !== '') {
      BooksAPI.search(query).then(searchBooks => {
        if (query === this.state.query && searchBooks.length) {
          this.setState(() => ({
            noSearch: false,
            searchBooks: searchBooks.map(book => {
              const bk = this.props.books.find(b => b.id === book.id);
              if (bk) {
                book.shelf = bk.shelf;
              } else {
                book.shelf = 'none';
              }
              return book;
            })
          }));
        } else if (query === this.state.query && !searchBooks.length) {
          this.setState(() => ({
            searchBooks: [],
            noSearch: false
          }));
        }
      });
    } else {
      this.setState(() => ({
        searchBooks: [],
        noSearch: true
      }));
    }
  };

  render() {
    const { query, searchBooks, noSearch } = this.state;
    const { onBookChange } = this.props;
    let gridDisplay;

    if (noSearch) {
      gridDisplay = <p>please enter search term</p>;
    } else if (searchBooks.length) {
      gridDisplay = <BooksGrid onBookChange={onBookChange} filteredBooks={searchBooks} />;
    } else {
      gridDisplay = <p>no results</p>;
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Back
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">{gridDisplay}</div>
      </div>
    );
  }
}

export default SearchBooks;
