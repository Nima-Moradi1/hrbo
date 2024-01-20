import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import Navbar from './components/navbar/Navbar'
import RegisterModal from './components/modals/RegisterModal'
import ToasterProvider from './providers/ToasterProvider'
import LoginModal from './components/modals/LoginModal'
import getCurrentUser from './actions/getCurrentUser'
import RentModal from './components/modals/RentModal'
const font = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hrbo',
  description: 'Hrbo, a house rental by owner for everyone',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
// for getting the current user (because this file is server side)
const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider/>
        <RentModal/>
        <LoginModal/>
        <RegisterModal/>
        <Navbar currentUser = {currentUser}/>
        {children}
        </body>
    </html>
  )
}
