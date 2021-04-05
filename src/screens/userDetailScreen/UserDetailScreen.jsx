import React, {useEffect, useState} from 'react';
import styles from './UserDetailScreen.module.scss';
import {connect} from "react-redux";
import {useParams, useHistory} from "react-router-dom"
import {deleteUser, getUserById} from "../../store/users/action";
import MainLoyalty from "../../components/mainLoyalty";
import ReadOnlyUserForm from "../../components/forms/readOnlyUserForm/ReadOnlyUserForm";

const UserDetailScreen = ({getUserById, deleteUser, user_detail, loading}) => {
  const params = useParams()
  const history = useHistory()

  const handleDelete = () => {
    deleteUser(params.user_id)
    setTimeout(() => {
      history.goBack()
    }, 1000)
  }

  useEffect(() => {
    if(params.user_id) {
      return getUserById(params.user_id)
    }
  }, [params.user_id, getUserById]);

  return (
    <div className={styles.root}>
      <MainLoyalty title={'User Detail'} isLoading={loading}>
        {
          user_detail ?
            <ReadOnlyUserForm
              first_name={user_detail.first_name}
              last_name={user_detail.last_name}
              birth_date={user_detail.birth_date}
              biography={user_detail.biography}
              gender={user_detail.gender}
              job={user_detail.job}
              is_active={user_detail.is_active}
              handleDelete={handleDelete}
            />
            : <div>Loading ...</div>
        }
      </MainLoyalty>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user_detail: state.users.user_detail,
    loading: state.users.loading,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUserById: (id) => dispatch(getUserById(id)),
    deleteUser: (id) => dispatch(deleteUser(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailScreen)


