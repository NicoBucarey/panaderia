import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

function MainLayout({children}) {
    return(
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 pt-16 pb-32 md:pt-20 md:pb-0">
                {children}
            </main>
            <Footer />
        </div>
    )
}
export default MainLayout