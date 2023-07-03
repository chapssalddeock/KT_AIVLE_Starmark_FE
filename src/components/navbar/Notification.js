import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { Bell, PersonCircle } from 'react-bootstrap-icons';
import { Badge, Dropdown } from 'antd';
import usePUT from '../../AuthCommunicate/PUT';
import useGET from '../../AuthCommunicate/GET';
import AuthManager from "../../AuthContext/AuthManager";




// PersonCircle 대신에 프사 넣기, 알림 확인하면 수정하기

export default function Notification() {
    const router = useRouter();
    const [notifications, setNotifications] = useState([]);
    const [isBellClickable, setIsBellClickable] = useState(true);
    const [isDropdownDisabled, setIsDropdownDisabled] = useState(false);
    const [isDotVisible, setIsDotVisible] = useState(true);
    const { fetchData: putFetchData, data: putData, error: putError } = usePUT();
    const { fetchData: getFetchData, data: getData, error: getError } = useGET();
    const { LogOut } = AuthManager();

    const moveMyPage = () => {
        router.push("/mypage");
    };

    const moveLogOut = () => {
        LogOut();
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
                <div onClick={moveLogOut}>
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
                            {notification.title}
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
                            <Bell style={{ cursor: isBellClickable ? "pointer" : "default", marginLeft: '20px', fontSize: '24px' }} />
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
                    <PersonCircle style={{ cursor: "pointer", marginLeft: '20px', color: '#5eacf2', fontSize: '24px' }} />
                </a>
            </Dropdown>
        </>
    );
}
