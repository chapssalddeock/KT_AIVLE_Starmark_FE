import { Avatar, List, message, Tag, Button } from 'antd';
import VirtualList from 'rc-virtual-list';
import { useEffect, useState } from 'react';
import axios from 'axios'; import FollowButton from '../Modal/FollowButton';
import UserDrawer from '../Modal/UserDrawer';

const fakeDataUrl = 'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';
const ContainerHeight = 750;


export default function SocialListView() {

    // 유저 리스트 불러오기 관련
    // const [data, setData] = useState([]);

    // const appendData = () => {
    //     fetch(fakeDataUrl)
    //         .then((res) => res.json())
    //         .then((body) => {
    //             setData(data.concat(body.results));
    //             message.success(`${body.results.length} more items loaded!`);
    //         });
    // };


    // useEffect(() => {
    //     appendData();
    // }, []);


    // const onScroll = (e) => {
    //     if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
    //         appendData();
    //     }
    // };


    // 유저 프로필 보기 관련 (View Profile)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [userProfile, setUserProfile] = useState(null);

    const handleOpenDrawer = async (user_id) => {
        try {
            const config = {
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg4NTQyMzU4LCJpYXQiOjE2ODcyNDYzNTgsImp0aSI6ImI2YTU0OWJkOWQxYTQzMWFhNDE3NmFmMmFmMjVjYjQ2IiwidXNlcl9pZCI6MiwidXNlcm5hbWUiOiJcdWQxNGNcdWMyYTRcdWQyYjgwMyJ9.cTZokEPKCxNTo6S-BXdv2pRakGRlnIBqzWAGHQKI6Nk'
                },
                params: {
                    user_id: user_id
                }
            };

            const response = await axios.get('http://kt-aivle.iptime.org:40170/api/userinfo/', config);

            if (response.status === 200) {
                console.log(response.data)
                setUserProfile(response.data);
                setIsDrawerOpen(true);
            } else {
                console.error('Failed to fetch user profile');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
    };



    // 받는 데이터는 리스트 안의 json 형태임, 그래서 data를 태그에 줘야함 (더미 데이터)
    const data = [{
        user_id: '2'
    },
    {
        user_id: '1'
    },

    ]

    return (
        <>
            <List bordered size='large' style={{ marginLeft: 40, marginRight: 30, width: 1050 }}>
                <VirtualList
                    data={data}
                    height={ContainerHeight}
                    itemHeight={80}
                    itemKey="email"
                // onScroll={onScroll}
                >
                    {(item) => (
                        <List.Item key={item.email} actions={[
                            // <a onClick={handleOpenDrawer} key={`a-${item.email}`}> 원본
                            < a onClick={() => handleOpenDrawer(item.user_id)} key={`a-${item.user_id}`}>
                                View Profile
                            </a>,

                        ]}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.profile_image} size={80} />}
                                    title={<div style={{ fontSize: '20px', marginTop: 2 }}>{item.username}</div>}
                                    description={<div style={{ fontSize: '16px' }}>{item.email}</div>}
                                />

                                <div style={{ marginLeft: 400 }}>
                                    <div>주요 태그</div>
                                    {/* (item.tags.map((tag) => (<Tag key={tag} style={{ borderRadius: 20, height: 25 }}>{tag}</Tag>))) */}
                                </div>
                                <div style={{ marginLeft: 30 }}>
                                    <div>북마크 수</div>
                                </div>
                                <div style={{ marginLeft: 30 }}>
                                    <div>구독자 수</div>
                                </div>
                                <div style={{ marginLeft: 30 }}>
                                    <FollowButton userId={item.user_id} />
                                </div>
                            </div>
                        </List.Item>
                    )}
                </VirtualList >
            </List >
            <UserDrawer isOpen={isDrawerOpen} onClose={handleCloseDrawer} userProfile={userProfile} />
        </>
    );
};
