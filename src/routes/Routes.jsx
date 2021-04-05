import React from 'react';
import {Route, Switch} from 'react-router-dom';
import HomeScreen from "../screens/homeScreen/HomeScreen";
import BooksScreen from "../screens/booksScreen";
import AuthorsScreen from "../screens/authorsScreen";
// Paths
export const HOME_PATH = `/`;
export const AUTHORS_PATH = `/authors`;
export const BOOKS_PATH = `/books`;

const Routes = props => {
  return (
    <Switch>
      <Route exact path={HOME_PATH}><HomeScreen /></Route>
      <Route path={AUTHORS_PATH}><AuthorsScreen/></Route>
      <Route path={BOOKS_PATH}><BooksScreen/></Route>

      <Route><h1>Error 404. Page not found =\ </h1></Route>
    </Switch>
  )
}

export default Routes;