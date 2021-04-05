import React, {useEffect} from 'react';
import styles from './UserEditlScreen.module.scss';
import {connect} from "react-redux";
import {useParams} from "react-router-dom"
import {getUserById, updateUser} from "../../store/users/action";
import MainLoyalty from "../../components/mainLoyalty";
import EditUserForm from "../../components/forms/editUserForm/EditUserForm";
import moment from "moment";

const UserEditlScreen = ({updateUser, getUserById, user_detail, loading}) => {
  const params = useParams()

  const handleSubmit = (first_name, last_name, birth_date, biography, gender, job, is_active) => {
    const id = params.user_id;

    const day = moment(birth_date).date()
    const month = moment(birth_date).month()
    const year = moment(birth_date).year()
    const date = `${year}-${month+1}-${day}`

    updateUser(id, first_name, last_name, date, biography, gender, job, is_active)
  }

  useEffect(() => {
    getUserById(params.user_id)
  }, [params.user_id, getUserById, updateUser]);

  return (
    <div className={styles.root}>
      <MainLoyalty title={'User Detail'} isLoading={loading}>
        {
          user_detail ?
            <EditUserForm
              first_name={user_detail.first_name}
              last_name={user_detail.last_name}
              birth_date={user_detail.birth_date}
              biography={user_detail.biography}
              gender={user_detail.gender}
              job={user_detail.job}
              is_active={user_detail.is_active}
              handleSubmit={handleSubmit}
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
    updateUser: (id, first_name, last_name, birth_date, biography, gender, job, is_active) => dispatch(updateUser(id, first_name, last_name, birth_date, biography, gender, job, is_active)),
    getUserById: (id) => dispatch(getUserById(id))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserEditlScreen)


