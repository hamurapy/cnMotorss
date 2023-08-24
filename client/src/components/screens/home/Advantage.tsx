import React from 'react'
import Image from 'next/image'
import styles from './home.module.css'
import RobotIcon from './icons/RobotIcon'
import Price from './icons/PriceIcon'
import CarIcon from './icons/CarIcon'
import ScrewIcon from './icons/ScrewIcon'

function Advantage():JSX.Element{
  return (
    <section>
      <h2>Наши преимущества</h2>
      <div className={styles.advantage}>
        <div className={styles.advantageItem}>
          <RobotIcon/>
          <p>Помощь в выборе авто согласно вашим требованиям и бюджету</p>
        </div>
        <div className={styles.advantageItem}>
          <Price/>
          <p>Доступные цены на подержанные авто и условия покупки</p>
        </div>
        <div className={styles.advantageItem}>
          <CarIcon/>
          <p>Прохождение тест-драйва в удобное для вас время</p>
        </div>
        <div className={styles.advantageItem}>
          <ScrewIcon/>
          <p>Ремонт, гарантийное и постгарантийное обслуживание</p>
        </div>
      </div>
    </section>
  )
}

export default Advantage