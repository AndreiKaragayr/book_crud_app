import React from 'react';
import styles from './Button.module.scss';

const Button = ({
                  view='primary',
                  type='button',
                  children,
                  disabled=false,
                  onClick=()=>''}
                  ) => {
  let classes = []

  if(view && view === 'btn-secondary') {
    classes.push('btn-secondary')
  }
  else if (view && view === 'btn-danger'){
    classes.push('btn-danger')
  }
  else if (view && view === 'btn-success'){
    classes.push('btn-success')
  }
  else {
    classes.push('btn-primary')
  }

  return (
    <button type={type} className={`btn ${classes.join(' ')} ${styles.root}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

export default Button;