import { useRouter } from 'next/router.js';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function NavBar() {
    const router = useRouter();

    const moveSignIn = () => {
        router.push("/")
    }
    const moveSignUp = () => {
        router.push("/")
    }
    const moveHome = () => {
        router.push("/")
    }

    return (
        <>
            <Navbar collapseOnSelect bg="white">
                <Container>
                    <Nav.Link onClick={moveHome}><img src='img/defalut_logo.png' height={60}></img></Nav.Link>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            <Nav.Link onClick={moveSignUp}>Sign-Up</Nav.Link>
                            <Nav.Link eventKey={2} onClick={moveSignIn}>Sign-In</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar >
        </>
    );
}