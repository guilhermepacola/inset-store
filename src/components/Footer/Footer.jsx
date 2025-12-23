import Container from "../Container/Container"
function Footer() {
    return (
        <footer className="g-gray-50 border-t border-gray-100 py-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] md:py-6">
            <Container className={`flex flex-col md:flex-row items-center gap-4 justify-evenly  `}>
                <p>
                    @2025 E-Commerce Solutions. All rights reserved
                </p>
                <img src="./payment-footer.png" alt="" className={`w-3xs object-cover`} />
            </Container>
        </footer>
    )
}

export default Footer;