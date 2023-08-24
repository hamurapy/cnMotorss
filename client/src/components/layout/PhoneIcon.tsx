import React from 'react'
import styles from './Header/menu.module.css'

function PhoneIcon():JSX.Element {
  return (
<svg className={styles.phoneIconSvg} version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
	<path className={styles.phoneIcon} d="M390.7,353.3c-120.3,69.5,63.2,413.6,194.9,337.6l122.1,211.4c-55.6,32.1-102.5,52.3-166.9,15.5
	C362,815.6,165.2,474.9,170.8,271.7c1.9-70.6,43.6-98.3,97.9-129.7C292,182.4,367.3,312.8,390.7,353.3L390.7,353.3z M441.1,347.6
	c-13,7.5-29.7,3.1-37.3-10l-115-199.3c-7.5-13-3.1-29.7,10-37.3l60.5-34.9c13-7.5,29.7-3.1,37.3,10l115.1,199.3
	c7.5,13,3.1,29.7-10,37.2L441.1,347.6z M755.5,892.1c-13,7.5-29.7,3.1-37.3-10l-115-199.3c-7.5-13-3.1-29.7,10-37.3l60.5-34.9
	c13-7.5,29.7-3.1,37.3,10l115.1,199.3c7.5,13,3.1,29.7-10,37.3L755.5,892.1z"/>
</svg>
  )
}

export default PhoneIcon