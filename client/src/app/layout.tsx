import './globals.css'
import { Inter } from 'next/font/google'
import Navigation from '@/components/layout/Header/Navigation'
import Footer from '@/components/layout/Footer/Footer'
import Meta from '@/components/seo/Meta'

const inter = Inter({ subsets: ['latin'] })

export default function Layout({
  children, title, description, keywords
}: {
  children: React.ReactNode, title:string, description:string, keywords:string
}) {
  return (
    <>
    <Meta title={title} description={description} keywords={title}/>
    <div className="wrapper">
      <Navigation/>  
      <div className="content">  
        {children}
      </div>  
      <Footer/>
    </div>
    </>
  )
}