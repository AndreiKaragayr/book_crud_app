import * as api from '../../api/services/authors.api';
import {AUTHORS} from "./type";

export const addAuthor = (first_name='', last_name='') => async (dispatch) => {
  await dispatch({type: AUTHORS.ADD.REQUEST})
  await api.addAuthor(first_name, last_name)
    .then((res) => {
      console.log('RES: ', res)
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
