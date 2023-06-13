import React, { useState } from "react";
import { useRouter } from 'next/router.js';
import { Bell, PersonCircle } from 'react-bootstrap-icons';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NoticeModal from "../NoticeModal/NoticeModal"
import { Dropdown } from 'react-bootstrap';

import { NotificationOutlined } from '@ant-design/icons';
import { Badge, Space } from 'antd';

export default function NavBar() {
    const router = useRouter();
    const moveHome = () => {
        router.push("/")
    }
    // modal 버튼 클릭 유무 저장 state
    const [noticeModalOpen, setNoticeModalOpen] = useState(false);
    // modal 버튼 클릭 유무 설정 함수
    const clickNoticeModal = () => {
        setNoticeModalOpen(!noticeModalOpen)
    }

    return (
        <div>
            <Navbar collapseOnSelect bg="white">
                <Container>
                    <Nav.Link onClick={moveHome}><img src='img/defalut_logo.png' height={60}></img></Nav.Link>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav style={{ cursor: "pointer" }} >
                            {/* 알림이 있으면 state로 핸들링하여 Badge 조건부 렌더링 */}
                            <Badge dot><Bell size="24" onClick={clickNoticeModal} /></Badge>
                        </Nav>
                        {/* 모달 영역입니다. 네비게이션 컴포넌트를 무시하기 위해 portal을 사용해 새로 구현해야할듯 합니다. */}
                        <Dropdown style={{ cursor: "pointer", marginLeft: '20px' }} >
                            <Dropdown.Toggle id="dropdown-basic" as={PersonCircle} size={24} />
                            <Dropdown.Menu align="end" >
                                <Dropdown.Item onClick={moveHome}>마이페이지</Dropdown.Item>
                                <Dropdown.Item onClick={moveHome}>로그아웃</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Navbar.Collapse>

                </Container>
            </Navbar >
            {/* {noticeModalOpen && <NoticeModal clickModal={clickNoticeModal} />} */}
            {/* {noticeModalOpen && (
                <NoticeModal
                    clickNoticeModal={() => setNoticeModalOpen(!noticeModalOpen)} />
            )} */}
        </div>

    );
}