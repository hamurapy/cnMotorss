import React from 'react'
import Image from 'next/image'
import styles from '@/components/screens/auth/auth.module.css'
import Layout from '@/app/layout'

function serverError():JSX.Element {
  return (
    <Layout title={'Ошибка 500'} description={''} keywords={''}>
    <div className={styles.contentBlock}>
      <h1>Ошибка 500</h1>
      <div className={styles.adminBlock}>
      <Image
				src="/favicon.png"
				alt="Продажа авто с пробегом"
				draggable={false}
        width={100}
        height={100}
			/>
      <p>Server-side error occurred</p>
      </div>
    </div>
    </Layout>
  )
}

export default serverError