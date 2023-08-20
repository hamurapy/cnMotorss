import React from 'react'
import Image from 'next/image';
import styles from '@/components/screens/contact/contact.module.css'

function About():JSX.Element {
  return (
    <div className={styles.contentBlock}>
    <h1>О нас</h1>
      <div className={styles.twoColumn}>
        <div className={styles.side}>
          <Image
					    src="/about.jpg"
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
          <h3 className={styles.aboutTitle}>Продажа Авто с пробегом</h3>
          <p className={styles.sideText}>Всем клиентам мы предлагаем купить авто с пробегом на самых привлекательных условиях. Представленные в автоцентрах кроссоверы, седаны, коммерческий транспорт прекрасно адаптированы под российские условия эксплуатации и имеют прозрачную историю.</p>
          <p className={styles.sideText}>Компетентные менеджеры ознакомят со всеми транспортными средствами, которые вас заинтересовали и имеются в наличии. Какие бы вы ни ставили перед собой цели – покупка авто с пробегом станет для вас выгодным вложением средств.</p>
        </div>
      </div>
    </div>
  )
}

export default About