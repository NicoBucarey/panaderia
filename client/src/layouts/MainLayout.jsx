import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { ENABLE_WHATSAPP } from "../config/features"

function MainLayout({children}) {
    return(
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className={`flex-1 pt-16 md:pt-20 ${ENABLE_WHATSAPP ? "pb-32 md:pb-0" : "pb-0"}`}>
                {children}
            </main>
            <Footer />
        </div>
    )
}
export default MainLayout