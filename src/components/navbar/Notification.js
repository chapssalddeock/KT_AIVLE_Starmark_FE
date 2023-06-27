import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { Bell, PersonCircle } from 'react-bootstrap-icons';
import { Badge, Dropdown, Menu } from 'antd';
import axios from 'axios';

export default function Notification() {
    const router = useRouter();
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [store, setStore] = useState([]);

    const moveMyPage = () => {
        router.push("/mypage");
    };

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
        },
    ];

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
                    const storeData = data.map((notification) => ({
                        key: String(notification.id),
                        label: notification.content,
                    }));
                    setStore(storeData);
                } else {
                    console.log(response.status);
                }
            } catch (error) {
                console.error('알림을 불러오는 데 실패했습니다:', error);
            }
        };

        const interval = setInterval(fetchNotifications, 60000);

        fetchNotifications();

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <>
            <Dropdown
                overlay={
                    <Menu>
                        {store.map((item) => (
                            //이 부분 onClick 상황 맞게 수정
                            <Menu.Item key={item.key} onClick={moveMyPage}>
                                {item.label}
                            </Menu.Item>
                        ))}
                    </Menu>
                }
                placement="bottomRight"
                trigger={['click']}
                arrow={{
                    pointAtCenter: true,
                }}
            >
                <a onClick={(e) => e.preventDefault()}>
                    <Badge dot={unreadCount > 0}>
                        <Bell size="24" style={{ cursor: "pointer", marginLeft: '20px' }} />
                    </Badge>
                </a>
            </Dropdown>
            <Dropdown
                overlay={
                    <Menu>
                        {items.map((item) => (
                            <Menu.Item key={item.key} onClick={item.label.props.onClick}>
                                {item.label}
                            </Menu.Item>
                        ))}
                    </Menu>
                }
                placement="bottomRight"
                trigger={['click']}
                arrow={{
                    pointAtCenter: true,
                }}
            >
                <a onClick={(e) => e.preventDefault()}>
                    <PersonCircle size="24" style={{ cursor: "pointer", marginLeft: '20px' }} />
                </a>
            </Dropdown>
        </>
    );
}






// import React, { useState, useEffect } from "react";
// import { useRouter } from 'next/router.js';
// import { Bell, PersonCircle } from 'react-bootstrap-icons';
// import { Badge, Dropdown, Menu } from 'antd';
// import axios from 'axios';



// export default function Notification() {

//     const router = useRouter();

//     const moveMyPage = () => {
//         router.push("/mypage")
//     }


//     const items = [
//         {
//             key: '1',
//             label: (
//                 <div onClick={moveMyPage}>
//                     마이페이지
//                 </div>
//             ),
//         },
//         {
//             key: '2',
//             label: (
//                 <div onClick={moveMyPage}>
//                     로그아웃
//                 </div>
//             ),
//         },];


//     // 여기서부턴 알림 설정
//     const [notifications, setNotifications] = useState([]);
//     const [tmp, setTmp] = useState('') // 데이터 저장할 부분

//     useEffect(() => {
//         const fetchNotifications = async () => {
//             try {
//                 const config = {
//                     headers: {
//                         Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg4NTQyMzU4LCJpYXQiOjE2ODcyNDYzNTgsImp0aSI6ImI2YTU0OWJkOWQxYTQzMWFhNDE3NmFmMmFmMjVjYjQ2IiwidXNlcl9pZCI6MiwidXNlcm5hbWUiOiJcdWQxNGNcdWMyYTRcdWQyYjgwMyJ9.cTZokEPKCxNTo6S-BXdv2pRakGRlnIBqzWAGHQKI6Nk',
//                     },
//                 };

//                 const response = await axios.get('http://kt-aivle.iptime.org:40170/api/notice/', config);
//                 if (response.status === 200) {
//                     const data = response.data;
//                     setNotifications(data);
//                     const unreadNotifications = data.filter((notification) => !notification.is_read);
//                     setUnreadCount(unreadNotifications.length);
//                 } else {
//                     console.log(response.status);
//                 }
//             } catch (error) {
//                 console.error('Failed to fetch notifications:', error);
//             }
//         };

//         const interval = setInterval(fetchNotifications, 60000);

//         fetchNotifications();

//         return () => {
//             clearInterval(interval);
//         };
//     }, []);




//     return (
//         <>

//             {
//                 notifications.map((notification) => {
//                     const { id, content } = notification
//                     console.log(id, content)
//                     setTmp({ key: String(id), label: content })
//                     store.push(setTmp)
//                 })
//             }
//             <Dropdown
//                 menu={{ store, }}
//                 placement="bottomRight" //여기 보고 적절히 수정
//                 trigger={['click']}
//                 arrow={{
//                     pointAtCenter: true,
//                 }}>
//                 <a onClick={(e) => e.preventDefault()}>
//                     <Badge dot>
//                         <Bell size="24" style={{ cursor: "pointer", marginLeft: '20px' }} />
//                     </Badge>
//                 </a>
//             </Dropdown>
//             <Dropdown
//                 menu={{
//                     items,
//                 }}
//                 placement="bottomRight" //여기 보고 적절히 수정
//                 trigger={['click']}
//                 arrow={{
//                     pointAtCenter: true,
//                 }}>
//                 <a onClick={(e) => e.preventDefault()}>
//                     <PersonCircle size="24" style={{ cursor: "pointer", marginLeft: '20px' }} />
//                 </a>
//             </Dropdown>
//         </>)
// }

