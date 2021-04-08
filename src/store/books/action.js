import * as api from '../../api/services/books.api';
import {BOOKS} from "./type";

export const addBook = (image='', title='', author_id='', created_at='', year=0) => async (dispatch) => {
  await dispatch({type: BOOKS.ADD.REQUEST})
  await api.addBook(image, title, author_id, created_at, year)
    .then((res) => {
      console.log('RES: ', res)
      dispatch({
        type: BOOKS.ADD.SUCCESS,
        payload: {image, title, author_id, created_at, year},
      });
    })
    .then(() => {
      return dispatch(getBooks()) // refresh ID in redux (because in firebase ID === key)
    })
    .catch(err => {
      console.error('err: ', err)
      return dispatch({
        type: BOOKS.ADD.FAILURE,
        payload: err,
      });
    });
}

export const getBooks = () => async (dispatch) => {
  await dispatch({type: BOOKS.GET.REQUEST})
  await api.getBooks()
    .then((res) => {
      console.log('RES: ', res)
      return dispatch({
        type: BOOKS.GET.SUCCESS,
        payload: res,
      })
    })
    .catch(err => {
      console.error('err: ', err)
      return dispatch({
        type: BOOKS.GET.FAILURE,
        payload: err,
      });
    });
}

export const updateBook = (id='', image='', title='', author_id='', year='') => async (dispatch) => {
  await dispatch({type: BOOKS.UPDATE.REQUEST})
  await api.updateBook(id, image, title, author_id, year)
    .then((res) => {
      console.log('RES: ', res)
      return dispatch({
        type: BOOKS.UPDATE.SUCCESS,
        payload: {id, image, title, author_id, year}
      });
    })
    .catch(err => {
      console.error('err: ', err)
      return dispatch({
        type: BOOKS.UPDATE.FAILURE,
        payload: err,
      });
    });
}

export const deleteBook = (id='') => async (dispatch) => {
  await dispatch({type: BOOKS.DELETE.REQUEST})

  const isDelete = window.confirm("Вы Действительно хотите удалить Книгу ?")

  if (isDelete) {
    await api.deleteBook(id)
      .then((res) => {
        console.log('RES: ', res)
        return dispatch({
          type: BOOKS.DELETE.SUCCESS,
          payload: id
        })
      })
      .catch(err => {
        console.error('err: ', err)
        return dispatch({
          type: BOOKS.DELETE.FAILURE,
          payload: err,
        });
      })
  }
}
