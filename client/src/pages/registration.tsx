import Layout from '@/app/layout'
import RegistrationPage from '@/components/screens/auth/RegistrationPage'
import React from 'react'

function Registration():JSX.Element {
  return (
      <Layout title={'Регистрация'} description={''} keywords={''}>
        <RegistrationPage/>
      </Layout>
  )
}

export default Registration