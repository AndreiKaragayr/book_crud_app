import React from 'react';
import styles from './Button.module.scss';

const Button = ({type='primary', isSubmit=true, children, disabled=false, onClick=()=>''}) => {
  let classes = []

  if(type && type === 'outline') {
    classes.push(styles.outline)
  }
  else if (type && type === 'red'){
    classes.push(styles.red)
  }
  else if (type && type === 'green'){
    classes.push(styles.green)
  }
  else {
    classes.push(styles.primary)
  }

  return (
    <button type={isSubmit ? 'submit' : 'button'} className={`${styles.root} ${classes.join(' ')} `} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button;