import { useRouter } from 'next/router.js';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';



export default function NavBar() {
    const router = useRouter();

    const moveSignIn = () => {
        router.push("/login")
    }
    const moveSignUp = () => {
        router.push("/register")
    }
    const moveHome = () => {
        router.push("/")
    }

    return (
        <>
            <div style={{ border: "solid 1px black" }}>
                <Navbar>
                    <Container>
                        <img src='C:\Users\User\Desktop\StarMark_front\bigproject\public\img\check.png' width={60} height={60} onClick={moveHome}></img>
                        <Navbar.Brand onClick={moveHome}>  네비게이션 바 영역 </Navbar.Brand>
                        <Nav>
                            <Nav.Link onClick={moveSignIn}>Sign in</Nav.Link>
                            <Nav.Link eventKey={2} onClick={moveSignUp}>Sign up</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar >
            </div>
        </>
    );
}