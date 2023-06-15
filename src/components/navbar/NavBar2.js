import React, { useState } from "react";
import { useRouter } from 'next/router.js';
import { Bell, PersonCircle } from 'react-bootstrap-icons';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Badge, Popconfirm, Dropdown } from 'antd';
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



    return (
        <div>
            <Navbar collapseOnSelect bg="white">
                <Container>
                    <Nav.Link onClick={moveHome}><img src='img/defalut_logo.png' height={60}></img></Nav.Link>
                    <Navbar.Collapse className="justify-content-end">
                        {!isOpenJoin && <Notification />}
                    </Navbar.Collapse>
                </Container>
            </Navbar >

        </div >

    );
}