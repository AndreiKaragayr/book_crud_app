import React from 'react';
import styles from './HomeScreen.module.scss';
import MainLoyalty from "../../components/layout/mainLoyalty";

import wr_Image from '../../assets/img/wr.jpg'
import lb_Image from '../../assets/img/lb.jpg'
import {NavLink} from "react-router-dom";
import {AUTHORS_PATH, BOOKS_PATH} from "../../routes/Routes";

const HomeScreen = () => {
  return (
    <div className={styles.root}>
      <MainLoyalty title={'Главная'} isLoading={false}>

        <div className="row">
          <div className="col-12 col-md-3">
            <div className={`card ${styles.item}`}>
              <NavLink to={AUTHORS_PATH} className={styles.link}/>
              <img src={wr_Image} className="card-img-top" alt="писатели" />
                <div className="card-body">
                  <p className="card-text">Писатели</p>
                </div>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className={`card ${styles.item}`}>
              <NavLink to={BOOKS_PATH} className={styles.link}/>
              <img src={lb_Image} className="card-img-top" alt="библиотека" />
              <div className="card-body">
                <p className="card-text">Книги</p>
              </div>
            </div>
          </div>
        </div>
      </MainLoyalty>
    </div>
  )
}

export default HomeScreen


