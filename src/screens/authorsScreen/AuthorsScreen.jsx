import React, {useEffect} from 'react';
import styles from './AuthorsScreen.module.scss';
import MainLoyalty from "../../components/layout/mainLoyalty";
import AddAuthorForm from "../../components/forms/addAuthorForm/AddAuthorForm";
import {addAuthor, deleteAuthor, getAuthors} from "../../store/authors/action";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import ViewSVG from "../../components/iconsSVG/ViewSVG";
import EditSVG from "../../components/iconsSVG/EditSVG";
import DeleteSVG from "../../components/iconsSVG/DeleteSVG";
import Panel from "../../components/layout/panel";

const AuthorsScreen = ({isLoading, getAuthors, deleteAuthor, addAuthor, authors}) => {
  const handleSubmit = (first_name, last_name) => addAuthor(first_name, last_name)
  const handleDelete = (id) => {
    return deleteAuthor(id)
  }

  useEffect(() => {
    getAuthors()
  }, [getAuthors])

  return (
    <div className={styles.root}>
      <MainLoyalty title={'Авторы'} isLoading={isLoading}>

        <div className="mb-4">
          <Panel title={'Добавить автора'}>
            <AddAuthorForm handleSubmit={handleSubmit} isLoading={isLoading}/>
          </Panel>
        </div>

        <Panel>
          <div className="table-responsive my-4">
            <table className="table table-bordered table-hover">
              <thead>
              <tr>
                <th scope="col" className={styles.th}>#</th>
                <th scope="col" className={styles.th}>First</th>
                <th scope="col" className={styles.th}>Last</th>
                <th scope="col" className={`${styles.action} ${styles.th}`}>Action</th>
              </tr>
              </thead>
              <tbody>

              {
                authors && authors.length ? authors.map((a, index) => {
                    return (
                      <tr className={styles.tr} key={a.id}>
                        <th scope="row" className={styles.th}>
                          {++index}
                        </th>
                        <td className={styles.td}>{a.first_name}</td>
                        <td className={styles.td}>{a.last_name}</td>
                        <td className={styles.td}>
                          <div className={styles.controls}>
                            <NavLink to={`/author-details/${a.id}`} className={styles.link}><ViewSVG /></NavLink>
                            <NavLink to={`/author-edit/${a.id}`} className={styles.link}><EditSVG /></NavLink>
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
                      Авторы не найдены
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
  isLoading: state.authors.loading
})

const mapDispatchToProps = dispatch => ({
  getAuthors: () => dispatch(getAuthors()),
  deleteAuthor: (id) => dispatch(deleteAuthor(id)),
  addAuthor: (first_name, last_name) => dispatch(addAuthor(first_name, last_name))
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsScreen)


