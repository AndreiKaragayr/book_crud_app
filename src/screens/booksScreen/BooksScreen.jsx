import React, {useEffect} from 'react';
import styles from './BooksScreen.module.scss';
import MainLoyalty from "../../components/layout/mainLoyalty";
import AddBookForm from "../../components/forms/addBookForm/AddBookForm";
import {connect} from "react-redux";
import {getAuthors} from "../../store/authors/action";
import {addBook, deleteBook, getBooks} from "../../store/books/action";
import {NavLink} from "react-router-dom";
import ViewSVG from "../../components/iconsSVG/ViewSVG";
import EditSVG from "../../components/iconsSVG/EditSVG";
import DeleteSVG from "../../components/iconsSVG/DeleteSVG";
import Panel from "../../components/layout/panel";

const BooksScreen = ({isLoading, authors, books, getAuthors, getBooks, addBook, deleteBook}) => {

  const handleSubmit = (image, title, author_id, created_at, year) => {
    const day = created_at.getDay()
    const month = created_at.getMonth() + 1
    const fullYear = created_at.getFullYear()
    const fullCreated_at = `${day}/${month}/${fullYear}`

    addBook(image, title, author_id, fullCreated_at, year)
  }

  const handleDelete = id => deleteBook(id)

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
    getAuthors()
    getBooks()
  }, [getAuthors, getBooks])

  return (
    <div className={styles.root}>
      <MainLoyalty title={'Библиотека'} isLoading={isLoading}>

        <div className="mb-4">
          <Panel title={'Добавить книгу'}>
            <AddBookForm handleSubmit={handleSubmit} authorsOptions={authors} isLoading={isLoading} />
          </Panel>
        </div>

        <Panel>
          <div className="table-responsive my-4">
            <table className="table table-bordered table-hover">
              <thead>
              <tr>
                <th scope="col" className={styles.th}>#</th>
                <th scope="col" className={styles.th}>Название книги</th>
                <th scope="col" className={styles.th}>Фамилия автора</th>
                <th scope="col" className={styles.th}>Имя автора</th>
                <th scope="col" className={styles.th}>Первая публикаци</th>
                <th scope="col" className={`${styles.action} ${styles.th}`}>Action</th>
              </tr>
              </thead>
              <tbody>

              {
                books && books.length ? books.map((a, index) => {
                    return (
                      <tr className={styles.tr} key={a.id}>
                        <th scope="row">
                          {++index}
                        </th>
                        <td className={styles.td}>{a.title}</td>
                        <td className={styles.td}>{getNameAuthorById(a.author_id, 'first_name')}</td>
                        <td className={styles.td}>{getNameAuthorById(a.author_id, 'last_name')}</td>
                        <td className={styles.td}>{a.year}</td>
                        <td className={styles.td}>
                          <div className={styles.controls}>
                            <NavLink to={`/book-details/${a.id}`} className={styles.link}><ViewSVG /></NavLink>
                            <NavLink to={`/book-edit/${a.id}`} className={styles.link}><EditSVG /></NavLink>
                            <div className={styles.link} onClick={() => handleDelete(a.id)}><DeleteSVG /></div>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                  :
                  <tr className={styles.tr}>
                    <th scope="row"> </th>
                    <td colSpan="3" className={styles.td}>
                      Книги не найдены
                    </td>
                  </tr>
              }

              </tbody>
            </table>
          </div>
        </Panel>

      </MainLoyalty>
    </div>
  )
}

const mapStateToProps = state => ({
  authors: state.authors.authorsLists,
  books: state.books.booksLists,
  isLoading: state.books.loading
})

const mapDispatchToProps = dispatch => ({
  getAuthors: () => dispatch(getAuthors()),
  getBooks: () => dispatch(getBooks()),
  deleteBook: (id) => dispatch(deleteBook(id)),
  addBook: (image, title, author_id, created_at, year) => dispatch(addBook(image, title, author_id, created_at, year))
})

export default connect(mapStateToProps, mapDispatchToProps)(BooksScreen)

