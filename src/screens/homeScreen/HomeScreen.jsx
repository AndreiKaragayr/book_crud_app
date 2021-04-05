import React from 'react';
import styles from './HomeScreen.module.scss';
import MainLoyalty from "../../components/mainLoyalty";

const HomeScreen = () => {
  return (
    <div className={styles.root}>
      <MainLoyalty title={'Home Page'} isLoading={false}>

      </MainLoyalty>
    </div>
  )
}

export default HomeScreen


