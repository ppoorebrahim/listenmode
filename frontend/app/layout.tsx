import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import { AudioPlayerProvider } from "@/components/AudioPlayerProvider"
import Providers from "./providers"
import LayoutStructure from "./components/LayoutStructure"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "ListenMode",
  description: "A podcast platform",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        <Providers>
          <AudioPlayerProvider>
            <Navbar />
            <LayoutStructure>
              {children}
            </LayoutStructure>
          </AudioPlayerProvider>
        </Providers>
      </body>
    </html>
  )
}