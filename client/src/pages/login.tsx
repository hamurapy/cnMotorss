import Layout from '@/app/layout'
import Authorization from '@/components/screens/auth/LoginPage'
import React from 'react'

function Login():JSX.Element {
  return (
      <Layout title={'Вход'} description={''} keywords={''}>
        <Authorization/>
      </Layout>
  )
}

export default Login