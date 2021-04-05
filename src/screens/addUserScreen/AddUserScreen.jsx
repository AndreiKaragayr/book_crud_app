import React from 'react';
import styles from './AddUserScreen.module.scss';
import MainLoyalty from "../../components/mainLoyalty";
import AddUserForm from "../../components/forms/addUserForm/AddUserForm";
import {addUser} from "../../store/users/action";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import {USERS_PATH} from "../../routes/Routes";
import moment from "moment";

const AddUserScreen = ({addUser, loading}) => {
  const history = useHistory();

  const handleSubmit = async (first_name, last_name, birth_date, biography, gender, job, is_active) => {

    const day = moment(birth_date).date()
    const month = moment(birth_date).month()
    const year = moment(birth_date).year()
    const date = `${year}-${month+1}-${day}`

    await addUser(first_name, last_name, date, biography, gender, job, is_active )
    await history.push(USERS_PATH)
  }

  return (
    <div className={styles.root}>
      <MainLoyalty title={'Создать Пользователя'} isLoading={false}>
        <AddUserForm handleSubmit={handleSubmit} isLoading={loading} />
      </MainLoyalty>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    loading: state.users.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addUser: (first_name, last_name, birth_day, biography, gender, job, is_active) => dispatch(addUser(first_name, last_name, birth_day, biography, gender, job, is_active))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddUserScreen)


