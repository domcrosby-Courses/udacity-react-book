import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BooksGrid from './BooksGrid';

class BookShelf extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    filteredBooks: PropTypes.array.isRequired,
    onBookChange: PropTypes.func.isRequired
  };

  render() {
    const { title, filteredBooks, onBookChange } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <BooksGrid onBookChange={onBookChange} filteredBooks={filteredBooks} />
        </div>
      </div>
    );
  }
}

export default BookShelf;
