import {AUTHORS} from "./type";

const defaultState = {
  authorsLists: null,
  loading: true,
  error: ''
};

export const AuthorsReducer = ( state = defaultState, action ) => {
  const { type } = action;
  switch( type ) {
    case AUTHORS.ADD.REQUEST :
      return {
        ...state,
        loading: true
      }
    case AUTHORS.ADD.SUCCESS :
      return {
        ...state,
        loading: false,
        authorsLists: [...state.authorsLists, {id: new Date(), ...action.payload}],
        error: ''
      }
    case AUTHORS.ADD.FAILURE :
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case AUTHORS.GET.REQUEST :
      return {
        ...state,
        loading: true
      }
    case AUTHORS.GET.SUCCESS :
      return {
        ...state,
        loading: false,
        authorsLists: Object.keys(action.payload).map(key => ({...action.payload[key], id: key})),
        error: ''
      }
    case AUTHORS.GET.FAILURE :
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case AUTHORS.UPDATE.REQUEST :
      return {
        ...state,
        loading: true
      }
    case AUTHORS.UPDATE.SUCCESS :
      return {
        ...state,
        loading: false,
        authorsLists: state.authorsLists.map(a => {
          if(a.id === action.payload.id){
            return {
              ...a,
              first_name: action.payload.first_name,
              last_name: action.payload.last_name
            }
          }
          return a
        }),
        error: ''
      }
    case AUTHORS.UPDATE.FAILURE :
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case AUTHORS.DELETE.REQUEST :
      return {
        ...state,
        loading: true
      }
    case AUTHORS.DELETE.SUCCESS :
      return {
        ...state,
        loading: false,
        authorsLists: state.authorsLists.filter(a => a.id !== action.payload),
        error: ''
      }
    case AUTHORS.DELETE.FAILURE :
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default :
      return state
  }
}