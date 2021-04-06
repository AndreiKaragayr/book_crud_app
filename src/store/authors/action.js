import * as api from '../../api/services/authors.api';
import {AUTHORS} from "./type";

export const addAuthor = (first_name='', last_name='') => async (dispatch) => {
  await dispatch({type: AUTHORS.ADD.REQUEST})
  await api.addAuthor(first_name, last_name)
    .then((res) => {
      console.log('RES: ', res)
      alert('Пользователь Добавлен')
      dispatch({
        type: AUTHORS.ADD.SUCCESS,
        payload: {first_name, last_name},
      });
    })
    .then(() => {
      return dispatch(getAuthors()) // refresh ID in redux (because in firebase ID === key)
    })
    .catch(err => {
      console.error('err: ', err)
      return dispatch({
        type: AUTHORS.ADD.FAILURE,
        payload: err,
      });
    });
}

export const getAuthors = () => async (dispatch) => {
  await dispatch({type: AUTHORS.GET.REQUEST})
  await api.getAuthor()
    .then((res) => {
      console.log('RES: ', res)
      return dispatch({
        type: AUTHORS.GET.SUCCESS,
        payload: res,
      })
    })
    .catch(err => {
      console.error('err: ', err)
      return dispatch({
        type: AUTHORS.GET.FAILURE,
        payload: err,
      });
    });
}

export const updateAuthor = (id='', first_name='', last_name='') => async (dispatch) => {
  await dispatch({type: AUTHORS.UPDATE.REQUEST})
  await api.updateAuthor(id, first_name, last_name)
    .then((res) => {
      console.log('RES: ', res)
      alert('Пользователь изменен')
      return dispatch({
        type: AUTHORS.UPDATE.SUCCESS,
        payload: {id, first_name, last_name}
      });
    })
    .catch(err => {
      console.error('err: ', err)
      return dispatch({
        type: AUTHORS.UPDATE.FAILURE,
        payload: err,
      });
    });
}

export const deleteAuthor = (id='') => async (dispatch) => {
  await dispatch({type: AUTHORS.DELETE.REQUEST})

  const isDelete = window.confirm("Вы Действительно хотите удалить Автора ?")

  if (isDelete) {
    await api.deleteAuthor(id)
      .then((res) => {
        console.log('RES: ', res)
        return dispatch({
          type: AUTHORS.DELETE.SUCCESS,
          payload: id
        })
      })
      .catch(err => {
        console.error('err: ', err)
        return dispatch({
          type: AUTHORS.DELETE.FAILURE,
          payload: err,
        });
      })
  }
}




/*

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
}*/
