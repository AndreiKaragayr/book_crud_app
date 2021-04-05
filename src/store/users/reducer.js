import {USERS} from "./type";

const defaultState = {
  usersList: null,
  user_detail: null,
  loading: true,
  error: ''
};

export const UsersReducer = ( state = defaultState, action ) => {
  const { type } = action;
  switch( type ) {
    case USERS.GET.REQUEST :
      return {
        ...state,
        loading: true
      }
    case USERS.GET.SUCCESS :
      return {
        ...state,
        loading: false,
        usersList: action.payload,
        error: ''
      }
    case USERS.GET.FAILURE :
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case USERS.GET_USER.REQUEST :
      return {
        ...state,
        loading: true
      }
    case USERS.GET_USER.SUCCESS :
      return {
        ...state,
        loading: false,
        user_detail: action.payload,
        error: ''
      }
    case USERS.GET_USER.FAILURE :
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case USERS.UPDATE_USER.REQUEST :
      return {
        ...state,
        loading: true
      }
    case USERS.UPDATE_USER.SUCCESS :
      return {
        ...state,
        loading: false,
        user_detail: action.payload,
        error: ''
      }
    case USERS.UPDATE_USER.FAILURE :
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case USERS.DELETE_USER.REQUEST :
      return {
        ...state,
        loading: true
      }
    case USERS.DELETE_USER.SUCCESS :
      return {
        ...state,
        loading: false,
        usersList: state.usersList.filter(u => u.id !== action.payload),
        error: ''
      }
    case USERS.DELETE_USER.FAILURE :
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default :
      return state
  }

}