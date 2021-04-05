import React from 'react';
import styles from './MainLoyalty.module.scss';
import Header from "../header";

const MainLoyalty = ({isLoading = true, title = '', ...props}) => {
  return (
    <>
      <Header />
      <main className={styles.container}>
        {title ? <h1 className={styles.title}>{title}</h1> : null}
        {
          isLoading ?
            <div className={styles.loading}>Loading...</div>
            :
            props.children
        }
      </main>
      </>
  )
}

export default MainLoyalty;