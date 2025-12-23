import Container from "../Container/Container"
function Footer(){
    return(
        <footer className="bg-gray-50 ">
            <Container className={`flex flex-col md:flex-row items-center gap-4 justify-evenly mb-5 `}>
                <p>
                    @2025 E-Commerce Solutions. All rights reserved
                </p>
                <img src="./payment-footer.png" alt="" className={`w-3xs object-cover`}   />
            </Container>
        </footer>
    )
}

export default Footer;