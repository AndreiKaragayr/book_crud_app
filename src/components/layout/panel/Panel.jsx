import React from 'react';
import styles from './Panel.module.scss';

const Panel = ({children, title}) => {
  return (
    <div className={styles.root}>
      {
        title && <h2 className={styles.title}>{title}</h2>
      }

      {children}
    </div>
  )
}

export default Panel;