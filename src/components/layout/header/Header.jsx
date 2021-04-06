import React from 'react';
import styles from './Header.module.scss';
import {NavLink, useLocation} from 'react-router-dom';
import {AUTHORS_PATH, BOOKS_PATH, HOME_PATH} from "../../../routes/Routes";
import LogoSVG from "../../iconsSVG/LogoSVG";

const Header = () => {
  const location = useLocation();
  return (

    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <NavLink to={HOME_PATH} className={`navbar-brand ${styles.brand}`} ><LogoSVG /></NavLink>
        <button className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"/>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to={HOME_PATH}
                       className="nav-link active"
                       aria-current="page"
                       activeClassName={`${location.pathname === '/' ? 'active' : ''}`}
              >Главная</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={AUTHORS_PATH} className="nav-link" activeClassName="active">Авторы</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={BOOKS_PATH} className="nav-link" activeClassName="active">Книги</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header;