import React, { useState } from "react";
import { useRouter } from 'next/router.js';
import { Bell, PersonCircle } from 'react-bootstrap-icons';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Badge, Popconfirm, Dropdown } from 'antd';


export default function NavBar() {
    const router = useRouter();
    const moveHome = () => {
        router.push("/")
    }

    const items = [
        {
            key: '1',
            label: (
                <div onClick={moveHome}>
                    마이페이지
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <div onClick={moveHome}>
                    로그아웃
                </div>
            ),
        },];

    return (
        <div>
            <Navbar collapseOnSelect bg="white">
                <Container>
                    <Nav.Link onClick={moveHome}><img src='img/defalut_logo.png' height={60}></img></Nav.Link>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav style={{ cursor: "pointer" }} >
                            {/* 알림이 있으면 state로 핸들링하여 Badge 조건부 렌더링 */}
                            <Popconfirm
                                placement="bottom"
                                title={'크롤링 완료!'}
                            >
                                <Badge dot><Bell size="24" /></Badge>
                            </Popconfirm>
                        </Nav>
                        <Dropdown
                            menu={{
                                items,
                            }}
                            placement="bottomRight" //여기 보고 적절히 수정
                            trigger={['click']}
                            arrow={{
                                pointAtCenter: true,
                            }}>
                            <a onClick={(e) => e.preventDefault()}>
                                <PersonCircle size="24" style={{ cursor: "pointer", marginLeft: '20px' }} />
                            </a>
                        </Dropdown>

                        {/* <Dropdown style={{ cursor: "pointer", marginLeft: '20px' }} >
                            <Dropdown.Toggle id="dropdown-basic" as={PersonCircle} size={24} />
                            <Dropdown.Menu align="end" >
                                <Dropdown.Item onClick={moveHome}>마이페이지</Dropdown.Item>
                                <Dropdown.Item onClick={moveHome}>로그아웃</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown> */}
                    </Navbar.Collapse>

                </Container>
            </Navbar >

        </div >

    );
}