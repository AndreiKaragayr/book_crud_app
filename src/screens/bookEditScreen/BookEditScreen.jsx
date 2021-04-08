import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import styles from './BookEditScreen.module.scss';
import MainLoyalty from "../../components/layout/mainLoyalty";
import {connect} from "react-redux";
import EditBooksForm from "../../components/forms/editBooksForm/EditBooksForm";
import {getAuthors} from "../../store/authors/action";
import {getBooks, updateBook} from "../../store/books/action";

const BookEditScreen = ({isLoading, books, authors, getBooks, getAuthors, updateBook}) => {
  const [book, setBook] = useState(null);
  const params = useParams()

  const handleSubmit = (image, title, author_id, year) => {
    updateBook(params.book_id, image, title, author_id, year)
    setBook({id: params.book_id, image, title, author_id, year})
  }

  useEffect(() => {
    if(params.book_id){
      getBooks()
      getAuthors()
    }
  }, [getBooks, getAuthors, params.book_id])

  useEffect(() => {
    if(params.book_id && books && books.length) {
      books.find(b => {
        if(b.id === params.book_id) {
          return setBook(b)
        } else {
          return false
        }
      })
    }
  }, [params.book_id, updateBook])

  return (
    <div className={styles.root}>
      <MainLoyalty title={'Book Edit'} isLoading={isLoading}>

        <EditBooksForm
          book={book}
          handleSubmit={handleSubmit}
          authorsOptions={authors}
          isLoading={isLoading}
        />

      </MainLoyalty>
    </div>
  )
}

const mapStateToProps = state => ({
  books: state.books.booksLists,
  authors: state.authors.authorsLists,
  isLoading: state.books.loading,
})

const mapDispatchToProps = dispatch => ({
  getBooks: () => dispatch(getBooks()),
  getAuthors: () => dispatch(getAuthors()),
  updateBook: (id, image, title, author_id, year) => dispatch(updateBook(id, image, title, author_id, year)),
})

export default connect(mapStateToProps, mapDispatchToProps)(BookEditScreen)


