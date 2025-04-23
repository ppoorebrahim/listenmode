import { Inter } from "next/font/google"
import "../../globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Login | Listenmode",
  description: "Sign in or Sign up to Listenmode",
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.className} bg-black text-white min-h-screen flex flex-col items-center`}>
      <main className="w-full max-w-md flex-1 px-4 pt-8 pb-[15.5rem]">
        {children}
      </main>
    </div>
  )
}
