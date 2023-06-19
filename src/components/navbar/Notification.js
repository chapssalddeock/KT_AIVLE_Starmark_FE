
import React, { useState } from "react";
import { useRouter } from 'next/router.js';
import { Bell, PersonCircle } from 'react-bootstrap-icons';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Badge, Popconfirm, Dropdown } from 'antd';




export default function Notification() {

    const router = useRouter();

    const moveMyPage = () => {
        router.push("/mypage")
    }


    const items = [
        {
            key: '1',
            label: (
                <div onClick={moveMyPage}>
                    마이페이지
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <div onClick={moveMyPage}>
                    로그아웃
                </div>
            ),
        },];



    return (
        <>
            <Nav style={{ cursor: "pointer" }} >
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
        </>)





}