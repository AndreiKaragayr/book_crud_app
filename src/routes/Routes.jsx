import React from 'react';
import {Route, Switch} from 'react-router-dom';
import HomeScreen from "../screens/homeScreen/HomeScreen";
import BooksScreen from "../screens/booksScreen";
import AuthorsScreen from "../screens/authorsScreen";
import AuthorsDetailsScreen from "../screens/authorsDetailsScreen/AuthorsDetailsScreen";
import AuthorsEditScreen from "../screens/authorsEditScreen/AuthorsEditScreen";
import BookDetailScreen from "../screens/bookDetailScreen";
import BookEditScreen from "../screens/bookEditScreen";
// Paths
export const HOME_PATH = `/`;
// AUTHOR PATH
export const AUTHORS_PATH = `/authors`;
export const AUTHORS_DETAILS_PATH = `/author-details/:author_id?`;
export const AUTHORS_EDIT_PATH = `/author-edit/:author_id?`;
// BOOKS PATH
export const BOOKS_PATH = `/books`;
export const BOOKS_DETAILS_PATH = `/book-details/:book_id?`;
export const BOOKS_EDIT_PATH = `/book-edit/:book_id?`;

const Routes = props => {
  return (
    <Switch>
      <Route exact path={HOME_PATH}><HomeScreen /></Route>
      {/*AUTHOR PATH*/}
      <Route path={AUTHORS_PATH}><AuthorsScreen/></Route>
      <Route path={AUTHORS_DETAILS_PATH}><AuthorsDetailsScreen /></Route>
      <Route path={AUTHORS_EDIT_PATH}><AuthorsEditScreen /></Route>
      {/*BOOKS PATH*/}
      <Route path={BOOKS_PATH}><BooksScreen/></Route>
      <Route path={BOOKS_DETAILS_PATH}><BookDetailScreen/></Route>
      <Route path={BOOKS_EDIT_PATH}><BookEditScreen/></Route>

      <Route><h1>Error 404. Page not found =\ </h1></Route>
    </Switch>
  )
}

export default Routes;