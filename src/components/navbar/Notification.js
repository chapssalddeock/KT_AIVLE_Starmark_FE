
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router.js';
import { Bell, PersonCircle } from 'react-bootstrap-icons';
import { Badge, Dropdown, Menu } from 'antd';
import axios from 'axios';



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


    // 여기서부턴 알림 설정
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg4NTQyMzU4LCJpYXQiOjE2ODcyNDYzNTgsImp0aSI6ImI2YTU0OWJkOWQxYTQzMWFhNDE3NmFmMmFmMjVjYjQ2IiwidXNlcl9pZCI6MiwidXNlcm5hbWUiOiJcdWQxNGNcdWMyYTRcdWQyYjgwMyJ9.cTZokEPKCxNTo6S-BXdv2pRakGRlnIBqzWAGHQKI6Nk',
                    },
                };

                const response = await axios.get('http://kt-aivle.iptime.org:40170/api/notice/', config);
                if (response.status === 200) {
                    const data = response.data;
                    setNotifications(data);
                    const unreadNotifications = data.filter((notification) => !notification.is_read);
                    setUnreadCount(unreadNotifications.length);
                } else {
                    console.log(response.status);
                }
            } catch (error) {
                console.error('Failed to fetch notifications:', error);
            }
        };

        const interval = setInterval(fetchNotifications, 60000);

        fetchNotifications();

        return () => {
            clearInterval(interval);
        };
    }, []);


    const notificationItems = notifications.map((notification) => ({
        key: String(notification.id),
        label: (<div>{notification.content}</div>),
    }));
    console.log("내가 하고픈 부분", notificationItems); // 확인용
    console.log("원조", items); // 확인용


    return (
        <>
            <Dropdown
                menu={{ notificationItems, }}
                placement="bottomRight" //여기 보고 적절히 수정
                trigger={['click']}
                arrow={{
                    pointAtCenter: true,
                }}>
                <a onClick={(e) => e.preventDefault()}>
                    <Badge dot>
                        <Bell size="24" style={{ cursor: "pointer", marginLeft: '20px' }} />
                    </Badge>
                </a>
            </Dropdown>
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

            // {/* <Nav style={{ cursor: "pointer" }} >
            //     <Popconfirm
            //         placement="bottom"
            //         title={'크롤링 완료!'}
            //     >
            //         <Badge dot><Bell size="24" /></Badge>
            //     </Popconfirm>
            // </Nav> */}