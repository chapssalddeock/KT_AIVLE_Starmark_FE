import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Avatar, List } from 'antd';
import VirtualList from 'rc-virtual-list';
import UserDrawer from '../Modal/UserDrawer';

const ContainerHeight = 750;


export default function SocialListView() {

    // 유저 리스트 불러오기 관련, tag를 빈 리스트로 보내면 전체 유저가 불러짐 (초기 화면)
    // 태그를 토글선택하면 tag : []에 추가하도록 로직을 짜면 될듯함
    // 즉, 사이드바에서 이벤트 발생하면 SocialListView로 넘어오도록!
    // 공통되는 통신 부분 및 config 함수화 필요

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUserList();
    }, []);

    const fetchUserList = async () => {
        try {
            const config = {
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg4NTQyMzU4LCJpYXQiOjE2ODcyNDYzNTgsImp0aSI6ImI2YTU0OWJkOWQxYTQzMWFhNDE3NmFmMmFmMjVjYjQ2IiwidXNlcl9pZCI6MiwidXNlcm5hbWUiOiJcdWQxNGNcdWMyYTRcdWQyYjgwMyJ9.cTZokEPKCxNTo6S-BXdv2pRakGRlnIBqzWAGHQKI6Nk'
                },
                params: {
                    tag: []
                }
            }
            const response = await axios.get('http://kt-aivle.iptime.org:40170/api/search/', config);
            // api/search/에서는 id, email, username, profile_image, following_cnt, follower_cnt, bookmark_cnt 리턴

            if (response.status === 200) {
                const userList = response.data;
                setUsers(userList);

            } else {
                console.error('Failed to fetch user list');
            }
        } catch (error) {
            console.error('Error fetching user list:', error);
        }
    };



    // 유저 프로필 보기 관련 (View Profile)
    // user_id를 기준으로 작동
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [userProfile, setUserProfile] = useState(null);

    const handleOpenDrawer = async (id) => {
        try {
            const config = {
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg4NTQyMzU4LCJpYXQiOjE2ODcyNDYzNTgsImp0aSI6ImI2YTU0OWJkOWQxYTQzMWFhNDE3NmFmMmFmMjVjYjQ2IiwidXNlcl9pZCI6MiwidXNlcm5hbWUiOiJcdWQxNGNcdWMyYTRcdWQyYjgwMyJ9.cTZokEPKCxNTo6S-BXdv2pRakGRlnIBqzWAGHQKI6Nk'
                },
                params: {
                    user_id: id
                }
            };

            const response = await axios.get('http://kt-aivle.iptime.org:40170/api/userinfo/', config);
            // api/userinfo/에서는 id, email, username, profile_image, is_following, following_cnt, follower_cnt, bookmark_cnt 리턴

            if (response.status === 200) {
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




    return (
        <>
            <List bordered size='large' style={{ marginLeft: 40, marginRight: 30, width: 1050 }}>
                <VirtualList
                    data={users}
                    height={ContainerHeight}
                    itemHeight={80}
                    itemKey="email"
                >
                    {(item) => (
                        <List.Item key={item.email} actions={[
                            < a onClick={() => handleOpenDrawer(item.id)}  >
                                View Profile
                            </a>,

                        ]}>
                            <List.Item.Meta
                                avatar={<Avatar src={'http://kt-aivle.iptime.org:40170' + item.profile_image} size={80} />}
                                title={<div style={{ fontSize: '24px', marginTop: '8px' }}>{item.username}</div>}
                                description={<div style={{ fontSize: '16px', marginTop: 0 }}>{item.email}</div>}
                            />
                            <div>
                                <div>주요 태그</div>
                                {/* (item.tags.map((tag) => (<Tag key={tag} style={{ borderRadius: 20, height: 25 }}>{tag}</Tag>))) */}
                            </div>
                            <div style={{ marginLeft: 30 }}>
                                <div>{item.following_cnt}</div>
                            </div>
                            <div style={{ marginLeft: 30 }}>
                                <div>{item.follower_cnt}</div>
                            </div>
                        </List.Item>
                    )}
                </VirtualList >
            </List >
            <UserDrawer isOpen={isDrawerOpen} onClose={handleCloseDrawer} userProfile={userProfile} />
        </>
    );
};





    //     if (response.status === 200) {
    //         const body = response.data;
    //         setData(data.concat(body.results));
    //         //setData((prevData) => prevData.concat(body.results));
    //         message.success(`${body.results.length} more user loaded!`);
    //     } else {
    //         console.error('Error fetching data:', response.status);
    //     }

    // } catch (error) {
    //     console.error('Error fetching data:', error);
    // }

    // fetch(fakeDataUrl)
    //     .then((res) => res.json())
    //     .then((body) => {
    //         setData(data.concat(body.results));
    //         message.success(`${body.results.length} more items loaded!`);
    //     });


    // useEffect(() => {
    //     appendData();
    // }, []);


    // const onScroll = (e) => {
    //     if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
    //         appendData();
    //     }
    // };