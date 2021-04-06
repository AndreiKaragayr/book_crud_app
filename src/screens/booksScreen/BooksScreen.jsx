import React from 'react';
import styles from './BooksScreen.module.scss';
import MainLoyalty from "../../components/layout/mainLoyalty";

const BooksScreen = () => {
  return (
    <div className={styles.root}>
      <MainLoyalty title={'Books Screen'} isLoading={false}>

      </MainLoyalty>
    </div>
  )
}

export default BooksScreen


