import React, { useState } from "react";
import { useRouter } from 'next/router.js';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Notification from "./Notification";


const HiddenJoin = [
    "/join",
]


export default function NavBar() {
    const router = useRouter();
    const isOpenJoin = HiddenJoin.includes(router.asPath)


    const moveHome = () => {
        router.push("/")
    }

    const moveSocial = () => {
        router.push("/social")
    }

    const moveService = () => {
        router.push("/service")
    }

    return (
        <div>
            <Navbar collapseOnSelect bg="white">
                <Nav.Link onClick={moveHome} style={{ marginLeft: 20 }}><img src='img/defalut_logo.png' height={60}></img></Nav.Link>

                <Navbar.Collapse className="justify-content-end" style={{ marginRight: 50 }}>
                    {!isOpenJoin && <Nav.Link style={{ marginRight: 15 }} onClick={moveSocial}>SOCIAL</Nav.Link>}
                    {!isOpenJoin && <Nav.Link style={{ marginRight: 30 }} onClick={moveService}>SERVICE</Nav.Link>}
                    {!isOpenJoin && <Notification />}
                </Navbar.Collapse>
            </Navbar >

        </div >

    );
}