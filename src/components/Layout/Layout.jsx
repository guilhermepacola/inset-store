import { Toaster } from "react-hot-toast"
import Footer from "../Footer/Footer"
import Header from "../Header/Header"

function Layout({ children, onSearch }) {
    return (
        <>
            <Header onSearch={(value) => onSearch(value)} />
            {children}
            <Footer />
            <Toaster position="botom-right" reverseOrder={false} gutter={8} containerClassName="" toastOptions={{
                style: {
                    backgroundColor: "back",
                    color: "white"
                },
            }} />
        </>
    )
}

export default Layout