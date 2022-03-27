import Head from 'next/head'
import AddBooks from '../components/AddBooks'
import DisplayBooks from '../components/DisplayBooks'
import Footer from '../components/Footer'
import Header from '../components/Header'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <DisplayBooks />
      <AddBooks />
      <Footer />
    </div>
  )
}
