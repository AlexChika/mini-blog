import Banner from "../../components/Banner"
import Header from "../../components/Header"
import "../../styles/globals.css"
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className="bg-white">
      <head />
      <body className="bg-[rgb(253,253,253)] max-w-7xl mx-auto">
        <Header />
        <Banner />
        {children}
      </body>
    </html>
  )
}
