import React from 'react'
import styles from './footer.module.css'

function Footer():JSX.Element {
  const date = new Date();

  return (
    <footer className={styles.footer}>
      <p>&copy; {date.getFullYear()} CN MOTORS</p>
    </footer>
  )
}

export default Footer