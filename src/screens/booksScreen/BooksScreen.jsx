import React from 'react';
import styles from './BooksScreen.module.scss';
import MainLoyalty from "../../components/mainLoyalty";

const BooksScreen = () => {
  return (
    <div className={styles.root}>
      <MainLoyalty title={'Authors Screen'} isLoading={false}>

      </MainLoyalty>
    </div>
  )
}

export default BooksScreen


