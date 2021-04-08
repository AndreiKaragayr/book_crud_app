import {BOOKS} from "./type";

const defaultState = {
  booksLists: null,
  loading: true,
  error: ''
};

export const BooksReducer = ( state = defaultState, action ) => {
  const { type } = action;
  switch( type ) {
    case BOOKS.ADD.REQUEST :
      return {
        ...state,
        loading: true
      }
    case BOOKS.ADD.SUCCESS :
      return {
        ...state,
        loading: false,
        booksLists: state.booksLists ? [...state.booksLists, {id: new Date(), ...action.payload}] : [{id: new Date(), ...action.payload}],
        error: ''
      }
    case BOOKS.ADD.FAILURE :
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case BOOKS.GET.REQUEST :
      return {
        ...state,
        loading: true
      }
    case BOOKS.GET.SUCCESS :
      return {
        ...state,
        loading: false,
        booksLists: Object.keys(action.payload).map(key => ({...action.payload[key], id: key})),
        error: ''
      }
    case BOOKS.GET.FAILURE :
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case BOOKS.UPDATE.REQUEST :
      return {
        ...state,
        loading: true
      }
    case BOOKS.UPDATE.SUCCESS :
      return {
        ...state,
        loading: false,
        booksLists: state.booksLists.map(b => {
          if(b.id === action.payload.id){
            return {
              ...b,
              image: action.payload.image,
              title: action.payload.title,
              author_id: action.payload.author_id,
              year: action.payload.year,
            }
          }
          return b
        }),
        error: ''
      }
    case BOOKS.UPDATE.FAILURE :
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case BOOKS.DELETE.REQUEST :
      return {
        ...state,
        loading: true
      }
    case BOOKS.DELETE.SUCCESS :
      return {
        ...state,
        loading: false,
        booksLists: state.booksLists.filter(b => b.id !== action.payload),
        error: ''
      }
    case BOOKS.DELETE.FAILURE :
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default :
      return state
  }
}