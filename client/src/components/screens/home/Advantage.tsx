import React from 'react'
import Image from 'next/image'
import styles from './home.module.css'


function Advantage():JSX.Element{
  return (
    <section>
      <h2>Наши преимущества</h2>
      <div className={styles.advantage}>
        <div className={styles.advantageItem}>
          <Image
			      src="/help-robot.svg"
			      alt="Продажа авто с пробегом"
			      draggable={false}
            width={50}
            height={50}
		      />
          <p>Помощь в выборе авто согласно вашим требованиям и бюджету</p>
        </div>
        <div className={styles.advantageItem}>
          <Image
			       src="/price.svg"
			      alt="Продажа авто с пробегом"
			      draggable={false}
            width={50}
            height={50}
		      />
          <p>Доступные цены на подержанные авто и условия покупки</p>
        </div>
        <div className={styles.advantageItem}>
          <Image
			       src="/car.svg"
			      alt="Продажа авто с пробегом"
			      draggable={false}
            width={50}
            height={50}
		      />
          <p>Прохождение тест-драйва в удобное для вас время</p>
        </div>
        <div className={styles.advantageItem}>
          <Image
			       src="/screwdriver.svg"
			      alt="Продажа авто с пробегом"
			      draggable={false}
            width={50}
            height={50}
		      />
          <p>Ремонт, гарантийное и постгарантийное обслуживание</p>
        </div>
      </div>
    </section>
  )
}

export default Advantage