import React, {useEffect, useState} from 'react';
import styles from './AuthorsEditScreen.module.scss';
import MainLoyalty from "../../components/layout/mainLoyalty";
import {connect} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import EditAuthorForm from "../../components/forms/editAuthorForm/EditAuthorForm";
import {updateAuthor} from "../../store/authors/action";
import {AUTHORS_PATH} from "../../routes/Routes";


const AuthorsEditScreen = ({authors, updateAuthor}) => {
  const [author, setAuthor] = useState();
  const params = useParams();
  const history = useHistory();

  const handleSubmit = (first_name, last_name) => {
    updateAuthor(params.author_id, first_name, last_name)
    // await setTimeout(() => {history.push(AUTHORS_PATH)}, 1000)
  }

  useEffect(() => {
    if(params.author_id && authors) {
      authors.length && authors.find(a => {
        if(a.id === params.author_id) {
          return setAuthor(a)
        } else {
          return false
        }
      })
    }
  }, [authors, params.author_id])

  return (
    <div className={styles.root}>
      <MainLoyalty title={'Редактировать автора'} isLoading={false}>

        {
          author ?
          <EditAuthorForm author={author} handleSubmit={handleSubmit}  />
            : <p>Author not Found</p>
        }

      </MainLoyalty>
    </div>
  )
}

const mapStateToProps = state => ({
  authors: state.authors.authorsLists
})

const mapDispatchToProps = dispatch => ({
  updateAuthor: (id, first_name, last_name) => dispatch(updateAuthor(id, first_name, last_name))
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsEditScreen)


