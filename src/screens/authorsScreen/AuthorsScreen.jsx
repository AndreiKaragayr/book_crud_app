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

const AuthorsScreen = ({getAuthors, deleteAuthor, addAuthor, authors}) => {

  const handleSubmit = (first_name, last_name) => addAuthor(first_name, last_name)
  const handleDelete = (id) => {
    return deleteAuthor(id)
  }

  useEffect(() => {
    getAuthors()

  }, [getAuthors])

  console.log('authors: ', authors && authors)

  return (
    <div className={styles.root}>
      <MainLoyalty title={'Authors Screen'} isLoading={false}>
        <AddAuthorForm handleSubmit={handleSubmit} isLoading={false}/>

        <div className="table-responsive my-4">
          <table className="table table-bordered table-hover">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col" className={styles.action}>Action</th>
            </tr>
            </thead>
            <tbody>

            {
              authors && authors.length ? authors.map((a, index) => {
                return (
                  <tr className={styles.tr} key={a.id}>
                    <th scope="row">
                      {++index}
                    </th>
                    <td>{a.first_name}</td>
                    <td>{a.last_name}</td>
                    <th>
                      <div className={styles.controls}>
                        <NavLink to={`/author-details/${a.id}`} className={styles.link}><ViewSVG /></NavLink>
                        <NavLink to={`/author-edit/${a.id}`} className={styles.link}><EditSVG /></NavLink>
                        <div className={styles.link} onClick={() => handleDelete(a.id)}><DeleteSVG /></div>
                      </div>
                    </th>
                  </tr>
                )
              })
                :
                  <tr className={styles.tr}>
                    <th scope="row"> </th>
                    <td colSpan="3">
                      Authors not Found
                    </td>
                  </tr>
            }

            </tbody>
          </table>
        </div>

      </MainLoyalty>
    </div>
  )
}

const mapStateToProps = state => ({
  authors: state.authors.authorsLists
})

const mapDispatchToProps = dispatch => ({
  getAuthors: () => dispatch(getAuthors()),
  deleteAuthor: (id) => dispatch(deleteAuthor(id)),
  addAuthor: (first_name, last_name) => dispatch(addAuthor(first_name, last_name))
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsScreen)


