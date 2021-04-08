import React, {useEffect, useState} from 'react';
import styles from './BookDetailScreen.module.scss';
import MainLoyalty from "../../components/layout/mainLoyalty";
import {useHistory, useParams} from "react-router-dom";
import {getAuthors} from "../../store/authors/action";
import {getBooks} from "../../store/books/action";
import {connect} from "react-redux";
import Button from "../../components/UI/button";
import EmptyImageSVG from "../../components/iconsSVG/EmptyImageSVG";

const BookDetailScreen = ({authors, books, getAuthors, getBooks}) => {
  const [book, setBook] = useState();
  const history = useHistory();
  const params = useParams();

  const getNameAuthorById = (id='', name='first_name') => {
    let author = null
    if( authors && authors.length ){
      author = authors.find(a => id === a.id)
      switch(name){
        case 'first_name':
          return author.first_name
        case 'last_name':
          return author.last_name
        default:
          return 'Not found author'
      }
    } else return 'Not found author'
  }

  useEffect(() => {
    getAuthors();
    getBooks();
  },[getAuthors, getBooks])

  useEffect(() => {
    if(params.book_id && books) {
      books.length && books.find(a => {
        if(a.id === params.book_id) {
          return setBook(a)
        } else {
          return false
        }
      })
    }
  }, [params.book_id])

  return (
    <div className={styles.root}>
      <MainLoyalty title={'Book Detail'} isLoading={false}>
        <div className="table-responsive my-4">
          <table className="table table-bordered table-hover">
            <thead>
            <tr>
              <th scope="col" className={styles.th}>#</th>
              <th scope="col" className={styles.th}>Обложка книги</th>
              <th scope="col" className={styles.th}>Название книги</th>
              <th scope="col" className={styles.th}>Фамилия автора</th>
              <th scope="col" className={styles.th}>Имя автора</th>
              <th scope="col" className={styles.th}>Первая публикаци</th>
            </tr>
            </thead>
            <tbody>

            {
              book ?
                <tr className={styles.tr}>
                  <th scope="row"> </th>
                  <td className={styles.td}>{
                    book.image ?
                      <div className={styles.image}><img src={book.image} alt={"avatar"} /></div>
                      : <div className={styles.image}><EmptyImageSVG /></div>
                  }</td>
                  <td className={styles.td}>{book.title}</td>
                  <td className={styles.td}>{getNameAuthorById(book.author_id, 'first_name')}</td>
                  <td className={styles.td}>{getNameAuthorById(book.author_id, 'last_name')}</td>
                  <td className={styles.td}>{book.year}</td>
                </tr>
                :
                <tr className={styles.tr}>
                  <th scope="row"> </th>
                  <td colSpan="5" className={styles.td}>
                    Book not Found
                  </td>
                </tr>
            }

            </tbody>
          </table>

          <div className="d-flex justify-content-end">
            <div className="ml-3">
              <Button view={'btn-secondary'} onClick={() => history.goBack()}>Назад</Button>
            </div>
            <div className="ml-3">
              <Button onClick={() => history.push(`/book-edit/${params.book_id}`)}>Изменить</Button>
            </div>
          </div>
        </div>
      </MainLoyalty>
    </div>
  )
}

const mapStateToProps = state => ({
  authors: state.authors.authorsLists,
  books: state.books.booksLists,
})

const mapDispatchToProps = dispatch => ({
  getAuthors: () => dispatch(getAuthors()),
  getBooks: () => dispatch(getBooks()),
})

export default connect(mapStateToProps, mapDispatchToProps)(BookDetailScreen)


