import React, {useEffect, useState} from 'react';
import styles from './AuthorsDetailsScreen.module.scss';
import MainLoyalty from "../../components/layout/mainLoyalty";
import {connect} from "react-redux";
import Button from "../../components/UI/button";
import {useHistory, useParams} from "react-router-dom";

const AuthorsDetailsScreen = ({authors}) => {
  const [author, setAuthor] = useState();
  const history = useHistory();
  const params = useParams();

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
      <MainLoyalty title={'Про автора'} isLoading={false}>

        <div className="table-responsive my-4">
          <table className="table table-bordered table-hover">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
            </tr>
            </thead>
            <tbody>
              {
                author ?
                <tr className={styles.tr}>
                  <th scope="row"> </th>
                  <td>{author.first_name}</td>
                  <td>{author.last_name}</td>
                </tr>
                  : <p>Author not Found</p>
              }

            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-end">
          <div className="ml-3">
            <Button view={'btn-secondary'} onClick={() => history.goBack()}>Назад</Button>
          </div>
          <div className="ml-3">
            <Button onClick={() => history.push(`/author-edit/${params.author_id}`)}>Изменить</Button>
          </div>
        </div>

      </MainLoyalty>
    </div>
  )
}

const mapStateToProps = state => ({
  authors: state.authors.authorsLists
})

export default connect(mapStateToProps, null)(AuthorsDetailsScreen)


