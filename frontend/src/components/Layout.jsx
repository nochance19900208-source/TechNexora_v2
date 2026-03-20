import Header from './Header'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop.jsx'

export default function Layout({ children }) {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </>
  )
}
