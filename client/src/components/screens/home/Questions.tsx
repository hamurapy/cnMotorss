import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import styles from './home.module.css'

function Questions():JSX.Element {
  return (
    <section>
      <h2>Появились вопросы? Звоните не откладывая!</h2>
      <div className={styles.phone}>
            <Image
					    src="/phone-red.svg"
					    width={40}
              height={40}
					    alt="Продажа авто с пробегом"
					    draggable={false}
				    />
            <Link href="tel: +79215555578">+7 (921) 555-55-78</Link>
          </div>
    </section>
  )
}

export default Questions