import * as api from '../../api/services/users.api';
import {USERS} from "./type";

export const getUsers = () => async (dispatch) => {
  await dispatch({type: USERS.GET.REQUEST})
  await api.getUsers()
    .then((res) => {
      console.log('RES: ', res)
      return dispatch({
        type: USERS.GET.SUCCESS,
        payload: res,
      })
    })
    .catch(err => {
      console.error('err: ', err)
      return dispatch({
        type: USERS.GET.FAILURE,
        payload: err,
      });
    });
}

export const getUserById = (id) => async (dispatch) => {
  await dispatch({type: USERS.GET_USER.REQUEST})
  await api.getUserById(id)
    .then((res) => {
      console.log('RES: ', res)
      return dispatch({
        type: USERS.GET_USER.SUCCESS,
        payload: res,
      })
    })
    .catch(err => {
      console.error('err: ', err)
      return dispatch({
        type: USERS.GET_USER.FAILURE,
        payload: err,
      });
    });
}

export const addUser = (first_name, last_name, birth_date, biography, gender, job, is_active) => async (dispatch) => {
  await dispatch({type: USERS.ADD_USER.REQUEST})
  await api.addUser(first_name, last_name, birth_date, biography, gender, job, is_active)
    .then((res) => {
      console.log('RES: ', res)
      alert('Пользователь Добавлен')
      return dispatch({
        type: USERS.ADD_USER.SUCCESS,
        payload: {first_name, last_name, birth_date, biography, gender, job, is_active},
      });
    })
    .catch(err => {
      console.error('err: ', err)
      return dispatch({
        type: USERS.ADD_USER.FAILURE,
        payload: err,
      });
    });
}

export const updateUser = (id, first_name, last_name, birth_date, biography, gender, job, is_active) => async (dispatch) => {
  await dispatch({type: USERS.UPDATE_USER.REQUEST})
  await api.updateUser(id, first_name, last_name, birth_date, biography, gender, job, is_active)
    .then((res) => {
      console.log('RES: ', res)
      alert('Пользователь изменен')
      return dispatch({
        type: USERS.UPDATE_USER.SUCCESS,
        payload: {first_name, last_name, birth_date, biography, gender, job, is_active}
      });
    })
    .catch(err => {
      console.error('err: ', err)
      return dispatch({
        type: USERS.UPDATE_USER.FAILURE,
        payload: err,
      });
    });
}

export const deleteUser = (id) => async (dispatch) => {
  await dispatch({type: USERS.DELETE_USER.REQUEST})

  const isDelete = window.confirm("Вы Действительно хотите удалить Пользователя ?")

  if(isDelete){
    await api.deleteUser(id)
      .then((res) => {
        console.log('RES: ', res)
        return dispatch({
          type: USERS.DELETE_USER.SUCCESS,
          payload: id
        })
      })
      .catch(err => {
        console.error('err: ', err)
        return dispatch({
          type: USERS.DELETE_USER.FAILURE,
          payload: err,
        });
      })
  }
}