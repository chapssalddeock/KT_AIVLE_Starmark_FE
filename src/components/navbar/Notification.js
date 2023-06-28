import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { Bell, PersonCircle } from 'react-bootstrap-icons';
import { Badge, Dropdown } from 'antd';
import usePUT from '../../AuthCommunicate/PUT';
import useGET from '../../AuthCommunicate/GET';

export default function Notification() {
    const router = useRouter();
    const [notifications, setNotifications] = useState([]);
    const [isBellClickable, setIsBellClickable] = useState(true);
    const [isDropdownDisabled, setIsDropdownDisabled] = useState(false);
    const [isDotVisible, setIsDotVisible] = useState(true);
    const { fetchData : putFetchData, data: putData, error: putError } = usePUT();
    const { fetchData : getFetchData, data: getData, error: getError } = useGET();

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

    // 알림 전체 읽기
    const handleReadAllNotifications = async () => {
        const data = { msg_id: '0' }; // 전송할 데이터 객체
        await putFetchData('/notice/', data);   
    };

    useEffect(() => {
        if (putData) {
            setIsBellClickable(false); // 벨 아이콘 클릭 비활성화
            setIsDropdownDisabled(true); // 드롭다운 클릭 비활성화
            setIsDotVisible(false); // 도트 숨김
            setNotifications([]);
        } else if (putError) {
            console.log(putError);
        }
    }, [putData, putError]);

    useEffect(() => {
        const fetchNotifications = async () => {
            await getFetchData('/notice/');
        };

        const interval = setInterval(fetchNotifications, 60000);
        fetchNotifications();

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        if (getData) {
            console.log(getData);

            if (getData.length === 0) {
                setIsBellClickable(false); // 벨 아이콘 클릭 비활성화
                setIsDropdownDisabled(true); // 드롭다운 클릭 비활성화
                setIsDotVisible(false); // 도트 숨김
            } else {
                setIsBellClickable(true); // 벨 아이콘 클릭 활성화
                setIsDropdownDisabled(false); // 드롭다운 클릭 활성화
                setIsDotVisible(true); // 도트 표시

                const storeData = getData.map((notification) => ({
                    key: String(notification.id),
                    label: (
                        <div onClick={moveMyPage}>
                            {notification.content}
                        </div>
                    ),
                }));
                setNotifications(storeData);
            }

        } else if (getError) {
            console.log(getError);
        }
    }, [getData, getError]);


    return (
        <>
            <Dropdown
                menu={{ items: notifications }}
                onClick={handleReadAllNotifications}
                placement="bottomRight"
                trigger={['click']}
                arrow={{ pointAtCenter: true }}
                disabled={isDropdownDisabled} // 드롭다운 비활성화 여부
            >
                <a onClick={(e) => e.preventDefault()}>
                    <div>
                        <Badge dot={isDotVisible}>
                            <Bell size="24" style={{ cursor: isBellClickable ? "pointer" : "default", marginLeft: '20px' }} />
                        </Badge>
                    </div>
                </a>
            </Dropdown>
            <Dropdown
                menu={{ items }}
                placement="bottomRight"
                trigger={['click']}
                arrow={{ pointAtCenter: true }}
            >
                <a onClick={(e) => e.preventDefault()}>
                    <PersonCircle size="24" style={{ cursor: "pointer", marginLeft: '20px' }} />
                </a>
            </Dropdown>
        </>
    );
}



// import React, { useState, useEffect } from "react";
// import { useRouter } from 'next/router';
// import { Bell, PersonCircle } from 'react-bootstrap-icons';
// import { Badge, Dropdown } from 'antd';
// import axios from 'axios';

// export default function Notification() {
//     const router = useRouter();
//     const [notifications, setNotifications] = useState([]);
//     const [isBellClickable, setIsBellClickable] = useState(true);
//     const [isDropdownDisabled, setIsDropdownDisabled] = useState(false);
//     const [isDotVisible, setIsDotVisible] = useState(true);

//     const moveMyPage = () => {
//         router.push("/mypage");
//     };

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
//         },
//     ];

//     // 알림 전체 읽기
//     const handleReadAllNotifications = async () => {
//         try {
//             const data = { msg_id: '0' }; // 전송할 데이터 객체
//             const config = {
//                 headers: {
//                     Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg4NTQ2MDEyLCJpYXQiOjE2ODcyNTAwMTIsImp0aSI6IjYxNmFkNDdiYzYxODQ0ODdiZmUwOGVmOWI0YTdkMjEzIiwidXNlcl9pZCI6MiwidXNlcm5hbWUiOiJcdWQxNGNcdWMyYTRcdWQyYjgwMyJ9.b7B0bXuErh5znc32FkAEln2MbX3k8bouqYX0nnjb3TM',
//                     'Content-Type': 'application/json',
//                 },
//             }

//             const response = await axios.put('http://kt-aivle.iptime.org:40170/api/notice/', data, config);

//             if (response.status === 200) {
//                 setIsBellClickable(false); // 벨 아이콘 클릭 비활성화
//                 setIsDropdownDisabled(true); // 드롭다운 클릭 비활성화
//                 setIsDotVisible(false); // 도트 숨김
//                 setNotifications([]);
//             } else {
//                 console.log(response.status);
//             }
//         } catch (error) {
//             console.error('알림 전체 읽기 처리 실패', error);
//         }
//     };

//     useEffect(() => {
//         const fetchNotifications = async () => {
//             try {
//                 const config = {
//                     headers: {
//                         Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg4NTQ2MDEyLCJpYXQiOjE2ODcyNTAwMTIsImp0aSI6IjYxNmFkNDdiYzYxODQ0ODdiZmUwOGVmOWI0YTdkMjEzIiwidXNlcl9pZCI6MiwidXNlcm5hbWUiOiJcdWQxNGNcdWMyYTRcdWQyYjgwMyJ9.b7B0bXuErh5znc32FkAEln2MbX3k8bouqYX0nnjb3TM',
//                     },
//                 };

//                 const response = await axios.get('http://kt-aivle.iptime.org:40170/api/notice/', config);
//                 if (response.status === 200) {
//                     setIsBellClickable(true); // 벨 아이콘 클릭 활성화
//                     const data = response.data;

//                     console.log(data) // 데이터 확인용
//                     const storeData = data.map((notification) => ({
//                         key: String(notification.id),
//                         label: (
//                             <div onClick={moveMyPage}>
//                                 {notification.content}
//                             </div>
//                         ),
//                     }));
//                     setNotifications(storeData);
//                 } else {
//                     console.log(response.status);
//                 }
//             } catch (error) {
//                 console.error('알림을 불러오는데 실패했습니다:', error);
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
//             <Dropdown
//                 menu={{ items: notifications }}
//                 onClick={handleReadAllNotifications}
//                 placement="bottomRight"
//                 trigger={['click']}
//                 arrow={{ pointAtCenter: true }}
//                 disabled={isDropdownDisabled} // 드롭다운 비활성화 여부
//             >
//                 <a onClick={(e) => e.preventDefault()}>
//                     <div>
//                         <Badge dot={isDotVisible}>
//                             <Bell size="24" style={{ cursor: isBellClickable ? "pointer" : "default", marginLeft: '20px' }} />
//                         </Badge>
//                     </div>
//                 </a>
//             </Dropdown>
//             <Dropdown
//                 menu={{ items }}
//                 placement="bottomRight"
//                 trigger={['click']}
//                 arrow={{ pointAtCenter: true }}
//             >
//                 <a onClick={(e) => e.preventDefault()}>
//                     <PersonCircle size="24" style={{ cursor: "pointer", marginLeft: '20px' }} />
//                 </a>
//             </Dropdown>
//         </>
//     );
// }




// import React, { useState, useEffect } from "react";
// import { useRouter } from 'next/router';
// import { Bell, PersonCircle } from 'react-bootstrap-icons';
// import { Badge, Dropdown } from 'antd';
// import axios from 'axios';

// export default function Notification() {
//     const router = useRouter();
//     const [notifications, setNotifications] = useState([]);
//     const [isBellClickable, setIsBellClickable] = useState(true);

//     const moveMyPage = () => {
//         router.push("/mypage");
//     };

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
//         },
//     ];
//     // 알림 전체 읽기
//     const handleReadAllNotifications = async () => {
//         try {

//             const data = { msg_id: '0' }; // 전송할 데이터 객체
//             const config = {
//                 headers: {
//                     Authorization:
//                         'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg4NTQ2MDEyLCJpYXQiOjE2ODcyNTAwMTIsImp0aSI6IjYxNmFkNDdiYzYxODQ0ODdiZmUwOGVmOWI0YTdkMjEzIiwidXNlcl9pZCI6MiwidXNlcm5hbWUiOiJcdWQxNGNcdWMyYTRcdWQyYjgwMyJ9.b7B0bXuErh5znc32FkAEln2MbX3k8bouqYX0nnjb3TM',
//                     'Content-Type': 'application/json',
//                 },
//             }

//             const response = await axios.put('http://kt-aivle.iptime.org:40170/api/notice/', data, config);

//             if (response.status === 200) {
//                 setIsBellClickable(false); // Bell 아이콘 클릭 비활성화
//                 console.log(response.status) //확인용
//                 setNotifications([]);
//             }
//             else {
//                 console.log(response.status);
//             }
//         } catch (error) {
//             console.error('알림 전체 읽음 처리에 실패', error);
//         }

//     };

//     useEffect(() => {
//         const fetchNotifications = async () => {
//             try {
//                 const config = {
//                     headers: {
//                         Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg4NTQ2MDEyLCJpYXQiOjE2ODcyNTAwMTIsImp0aSI6IjYxNmFkNDdiYzYxODQ0ODdiZmUwOGVmOWI0YTdkMjEzIiwidXNlcl9pZCI6MiwidXNlcm5hbWUiOiJcdWQxNGNcdWMyYTRcdWQyYjgwMyJ9.b7B0bXuErh5znc32FkAEln2MbX3k8bouqYX0nnjb3TM',
//                     },
//                 };

//                 const response = await axios.get('http://kt-aivle.iptime.org:40170/api/notice/', config);
//                 if (response.status === 200) {
//                     setIsBellClickable(true); // Bell 아이콘 클릭 활성화
//                     const data = response.data;
//                     const storeData = data.map((notification) => ({
//                         key: String(notification.id),
//                         label: (
//                             <div onClick={moveMyPage}>
//                                 {notification.content}
//                             </div>
//                         ),
//                     }));
//                     setNotifications(storeData);
//                 } else {
//                     console.log(response.status);
//                 }
//             } catch (error) {
//                 console.error('알림을 불러오는 데 실패했습니다:', error);
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
//             <Dropdown
//                 menu={{ items: notifications, }}
//                 onClick={handleReadAllNotifications}
//                 placement="bottomRight"
//                 trigger={['click']}
//                 arrow={{ pointAtCenter: true }}
//             >
//                 <a onClick={(e) => e.preventDefault()}>
//                     <div>
//                         <Badge dot>
//                             <Bell size="24" style={{ cursor: isBellClickable ? "pointer" : "default", marginLeft: '20px' }} />
//                         </Badge>
//                     </div>
//                 </a>
//             </Dropdown>
//             <Dropdown
//                 menu={{ items }}
//                 placement="bottomRight"
//                 trigger={['click']}
//                 arrow={{ pointAtCenter: true }}
//             >
//                 <a onClick={(e) => e.preventDefault()}>
//                     <PersonCircle size="24" style={{ cursor: "pointer", marginLeft: '20px' }} />
//                 </a>
//             </Dropdown>
//         </>
//     );
// }







// import React, { useState, useEffect } from "react";
// import { useRouter } from 'next/router';
// import { Bell, PersonCircle } from 'react-bootstrap-icons';
// import { Badge, Dropdown } from 'antd';
// import axios from 'axios';

// export default function Notification() {
//     const router = useRouter();
//     const [notifications, setNotifications] = useState();


//     const moveMyPage = () => {
//         router.push("/mypage");
//     };

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
//         },
//     ];

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

//                     const storeData = data.map((notification) => ({
//                         key: String(notification.id),
//                         label: (
//                             <div onClick={moveMyPage}>
//                                 {notification.content}
//                             </div>),
//                     }));
//                     setNotifications(storeData);
//                 } else {
//                     console.log(response.status);
//                 }
//             } catch (error) {
//                 console.error('알림을 불러오는 데 실패했습니다:', error);
//             }
//         };

//         const interval = setInterval(fetchNotifications, 5000);

//         fetchNotifications();

//         return () => {
//             clearInterval(interval);
//         };
//     }, []);


//     return (
//         <>
//             < Dropdown
//                 menu={{ items: notifications }}
//                 placement="bottomRight"
//                 trigger={['click']}
//                 arrow={{
//                     pointAtCenter: true,
//                 }}
//             >
//                 <a onClick={(e) => e.preventDefault()}>
//                     <div>
//                         <Badge dot>
//                             <Bell size="24" style={{ cursor: "pointer", marginLeft: '20px' }} />
//                         </Badge>
//                     </div>
//                 </a>
//             </Dropdown >
//             <Dropdown
//                 menu={{ items }}
//                 placement="bottomRight"
//                 trigger={['click']}
//                 arrow={{
//                     pointAtCenter: true,
//                 }}
//             >
//                 <a onClick={(e) => e.preventDefault()}>
//                     <PersonCircle size="24" style={{ cursor: "pointer", marginLeft: '20px' }} />
//                 </a>
//             </Dropdown >
//         </>
//     );
// }


