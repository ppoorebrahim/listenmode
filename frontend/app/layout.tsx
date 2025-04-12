import { Inter } from 'next/font/google'
import "./globals.css"
import Navbar from "@/components/navbar"
import Sidebar from "@/components/sidebar"
import MobileNavbar from "@/components/mobile-navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "ListenMode",
  description: "A podcast platform",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <div className="flex flex-1">
            <Sidebar />
            <main className="mt-16 w-full md:ml-16 lg:ml-64">{children}</main>
          </div>
          <MobileNavbar />
        </div>
      </body>
    </html>
  )
}