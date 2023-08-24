import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import styles from './contact.module.css'
import PhoneIcon from '@/components/layout/PhoneIcon';

function ContactPage():JSX.Element {
  return (
  <div className={styles.contentBlock}>
    <h1>Контакты</h1>
      <div className={styles.twoColumn}>
        <div className={styles.side}>
          <Image
					    src="/contact.jpg"
					    alt="Продажа авто с пробегом"
					    draggable={false}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }}
              priority={true}
				    />
        </div>
        <div className={styles.side}>
          <p>Если у Вас есть вопросы, свяжитесь с нами по форме обратной  связи, или по телефону</p>
        <form>
        <input type='text' placeholder='Ваше Имя'/>
        <input type='text' placeholder='Ваш E-mail'/>
        <input type='text' placeholder='Ваш телефон'/>
        <textarea placeholder='Ваше сообщениие'/>
        <button>Отправить</button>
        </form>
          <div className={styles.phone}>
            <PhoneIcon/>
            <Link className={styles.phoneLink} href="tel: +79215555578">+7 (921) 555-55-78</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage