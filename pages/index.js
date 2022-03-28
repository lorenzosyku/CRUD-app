import Head from 'next/head'
import AddBooks from '../components/AddBooks'
import DisplayBooks from '../components/DisplayBooks'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Navbar from '../components/Navbar'

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Header />
      <DisplayBooks />
      <AddBooks />
      <Footer />
    </div>
  )
}
