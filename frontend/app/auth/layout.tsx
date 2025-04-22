import { Inter } from "next/font/google"
import "../globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Login | Listenmode",
  description: "Sign in or Sign up to Listenmode",
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.className} bg-black text-white min-h-screen`}>
      {children}
    </div>
  )
}
