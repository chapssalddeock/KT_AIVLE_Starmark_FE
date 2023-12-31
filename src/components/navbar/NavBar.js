import { useRouter } from 'next/router.js';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';




export default function NavBar({ onSignIn }) {
    const router = useRouter();

    const moveSignIn = () => {
        router.push("/")
    }
    const moveSignUp = () => {
        router.push("/join")
    }
    const moveHome = () => {
        router.push("/")
    }

    return (
        <>
            <Navbar collapseOnSelect bg="white" style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)' }}>
                <Nav.Link onClick={moveHome} style={{ marginLeft: 20 }} > <img src='img/defalut_logo.png' height={60}></img></Nav.Link>
                <Navbar.Collapse className="justify-content-end" style={{ marginRight: 50 }}>
                    <Nav>
                        <Nav.Link onClick={moveSignUp}>Sign-Up</Nav.Link>
                        <Nav.Link eventKey={2} onClick={onSignIn}>Sign-In</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar >
        </>
    );
}