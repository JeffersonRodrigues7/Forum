import { Navbar, Nav, Container } from "react-bootstrap";
import { NavbarLoginForm } from "./NavbarLoginForm";
import { NavbarRegisterForm } from "./NavbarRegisterForm";

import "../../styles/NavbarComp.css";

function NavbarComp() {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Fórum</Navbar.Brand>

                    <Nav>
                        <NavbarLoginForm />
                        <NavbarRegisterForm />
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default NavbarComp;
