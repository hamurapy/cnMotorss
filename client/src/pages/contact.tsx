import React from 'react'
import Layout from '@/app/layout'
import ContactPage from '@/components/screens/contact/ContactPage'

function Contact():JSX.Element {
  return (
    <Layout title={'Контакты'} description={''} keywords={''}>
    <ContactPage/>
    </Layout>
  )
}

export default Contact