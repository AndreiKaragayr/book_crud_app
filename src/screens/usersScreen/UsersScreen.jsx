import React, {useEffect} from 'react';
import styles from './UsersScreen.module.scss';
import CardUser from "../../components/cardUser";
import Button from "../../components/UI/button";
import {connect} from "react-redux";
import {deleteUser, getUsers} from "../../store/authors/action";
import {useHistory} from "react-router-dom";
import MainLoyalty from "../../components/layout/mainLoyalty";
import {CREATE_USER_PATH} from "../../routes/Routes";

const UsersScreen = ({getUsers, deleteUser, users, loading}) => {
  const history = useHistory();

  const handleDelete = (id) => deleteUser(id)

  useEffect(() => {
    getUsers()
  }, [getUsers]);

  return (
    <div className={styles.root}>
      <MainLoyalty title={null} isLoading={loading}>

        <div className={styles.head}>
          <h1 className={styles.title}>Пользователи</h1>
          <Button onClick={() => history.push(CREATE_USER_PATH)}>Добавить Пользователя</Button>
        </div>

        <div className={styles.row}>
          {
            users && users.length ? users.map(user => {
              return(
                <div className={styles.col} key={user.id}>
                  <CardUser
                    id={user.id}
                    name={user.first_name + (user.first_name && ' ') + user.last_name}
                    job={user.job}
                    date={user.birth_date}
                    gender={user.gender}
                    is_active={user.is_active}
                    deleteUser={handleDelete}
                  />
                </div>
              )
            }) : <div className={styles.col} ><p className={styles.text}>Users not found.</p></div>
          }
        </div>
      </MainLoyalty>

    </div>
  )
}

const mapStateToProps = state => {
  return {
    users: state.users.usersList,
    loading: state.users.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => dispatch(getUsers()),
    deleteUser: (id) => dispatch(deleteUser(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersScreen)


