import React from 'react'
import About from '@/components/screens/about/About'
import Layout from '@/app/layout'

function AboutUs():JSX.Element {
  return (
    <Layout title={'О нас'} description={''} keywords={''}>
    <About/>
    </Layout>
  )
}

export default AboutUs