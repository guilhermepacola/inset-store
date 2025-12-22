import Footer from "../Footer/Footer"
import Header from "../Header/Header"

function Layout({ children, onSearch }) {
    return (
       <div className="flex flex-col h-screen overflow-hidden">    
            <Header onSearch={onSearch} />
            <div className="flex-1 overflow-hidden">
                {children}
            </div>
        <Footer />
        </div>
    )
}

export default Layout