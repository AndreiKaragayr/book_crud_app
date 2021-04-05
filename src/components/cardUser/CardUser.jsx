import React from 'react';
import styles from './CardUser.module.scss';
import Button from "../UI/button";
import {useHistory} from "react-router-dom";
import {NavLink} from "react-router-dom";

const CardUser = ({id, name = '', job = '', is_active, date = null, gender = '', deleteUser=()=>''}) => {
  const history = useHistory();
  return (
    <div className={styles.root}>
      <p className={styles.title}>{name}</p>
      <p className={styles.text}><b>Job:</b> {job}</p>
      <p className={styles.text}><b>Gender:</b> {gender}</p>
      <p className={styles.text}><b>Active:</b> {is_active ? 'Yes' : 'No'}</p>
      <p className={styles.text}><b>Birth date:</b> {date}</p>
      <div className={styles.control}>
        <div className={styles.col}>
          <Button type={'outline'} onClick={() => history.push(`/edit-user/${id}`)}>Изменить</Button>
        </div>
        <div className={styles.col}>
          <Button type={'red'} onClick={() => deleteUser(id)}>Удалить</Button>
        </div>
      </div>
      <NavLink to={`/user/${id}`} className={styles.link}/>
    </div>
  )
}

export default CardUser;