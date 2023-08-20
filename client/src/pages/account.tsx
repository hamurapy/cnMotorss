import React from 'react'
import Layout from '@/app/layout'
import AccountPage from '@/components/screens/account/AccountPage'

function Account():JSX.Element {
  return (
    <Layout title={'Личный кабинет'} description={''} keywords={''}>
    <AccountPage/>
    </Layout>
  )
}

export default Account