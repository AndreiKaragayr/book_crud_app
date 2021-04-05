import React from 'react';
import styles from './AuthorsScreen.module.scss';
import MainLoyalty from "../../components/mainLoyalty";

const AuthorsScreen = () => {
  return (
    <div className={styles.root}>
      <MainLoyalty title={'Authors Screen'} isLoading={false}>

      </MainLoyalty>
    </div>
  )
}

export default AuthorsScreen


