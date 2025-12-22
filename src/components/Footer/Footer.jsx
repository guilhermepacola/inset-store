import Container from "../Container/Container"
function Footer(){
    return(
        <footer className="">
            <Container className={`flex py-2 flex-col md:flex-row items-center gap-4 justify-evenly  `}>
                <p>
                    @2025 E-Commerce Solutions. All rights reserved
                </p>
                <img src="./src/assets/payment-footer.png" alt="" className={`w-3xs object-cover`}   />
            </Container>
        </footer>
    )
}

export default Footer;