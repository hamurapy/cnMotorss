import React from 'react'
import styles from './account.module.css'
import FormAddCar from './FormAddCar';

function AccountPage():JSX.Element {
  return (
    <div className={styles.contentBlock}>
      <h1>Личный кабинет</h1>
      <FormAddCar/>
    </div>
  )
}

export default AccountPage