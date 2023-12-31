import React from 'react';
import { useState, useEffect } from 'react';
import { MainFrame, Frame, FollowerFrame, FollowingFrame, titleStyles, descriptionStyles } from '../../../styles/MyPage_Emotion';
import { List, Avatar, Button } from 'antd';
import useGET from '../../AuthCommunicate/GET';
import usePOST from '../../AuthCommunicate/POST';
import useDELETE from '../../AuthCommunicate/DELETE';
import { css } from '@emotion/react';




export default function MyFollows() {
    const [info, setInfo] = useState([]);
    const { fetchData: getFetchData, data: getData, error: getError } = useGET();
    const { fetchData: postFetchData, data: postData, error: postError } = usePOST();
    const { fetchData: deleteFetchData, data: deleteData, error: deleteError } = useDELETE();

    // 기본적인 팔로잉, 팔로워 정보 불러오기
    const fetchData = async () => {
        await getFetchData('/follows/');
    };

    useEffect(() => {
        if (getData) {
            setInfo(getData);
        } else if (getError) {
            console.error(getError);
        }
    }, [getData, getError]);

    useEffect(() => {
        fetchData();
    }, []);

    // 여기서부턴 팔로우 언팔로우 로직
    useEffect(() => {
        if (postData) {
            //setInfo(postData);
            console.log("팔로우 성공");
            // 요청이 성공한 후에 fetchData 호출
            fetchData();
        } else if (postError) {
            console.error('팔로우 중 오류 발생:', postError);
        }
    }, [postData, postError]);

    useEffect(() => {
        if (deleteData) {
            //setInfo(deleteData);
            console.log("언팔로우 성공");
            // 요청이 성공한 후에 fetchData 호출
            fetchData();
        } else if (deleteError) {
            console.error('언팔로우 중 오류 발생:', deleteError);
        }
    }, [deleteData, deleteError]);

    const handleFollow = async (user_id) => {
        const followingIds = info.following.map(f => f.id); // 배열 형태라서 이렇게 줘야함.
        if (followingIds.includes(user_id)) {
            try {
                const config = { data: { user_id: user_id } }; // 언팔로우는 data 형식 필수 
                await deleteFetchData('/follows/', config);
                setInfo(prevState => ({
                    ...prevState,
                    following: prevState.following.filter(id => id !== user_id)
                }));
            } catch (error) {
                console.error('사용자 언팔로우 중 오류 발생:', error);
            }
        } else {
            try {
                const config = {
                    user_id: user_id,
                };
                await postFetchData('/follows/', config);
                setInfo(prevState => ({
                    ...prevState,
                    following: [...prevState.following, user_id]
                }));
            } catch (error) {
                console.error('사용자 팔로우 중 오류 발생:', error);
            }
        }
    };

    return (
        <>
            <Frame>
                <MainFrame>
                    <FollowerFrame>
                        <h2 style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>Followers</h2>
                        <div style={{ borderBottom: '1px solid #ccc', marginBottom: '10px', }}></div>

                        <List
                            dataSource={info.follower}
                            renderItem={follower => (
                                <List.Item style={{ height: '100px', marginLeft: '28px' }}>
                                    <List.Item.Meta
                                        avatar={<Avatar src={follower.profile_image} style={{ width: '60px', height: '60px' }} />}
                                        title={<span style={{ fontSize: '18px', fontWeight: 'bold', fontFamily: 'KOTRA_GOTHIC' }}>{follower.username}</span>}
                                        description={<span style={{ fontFamily: 'KOTRA_GOTHIC' }}>{follower.email}</span>}
                                    />

                                    <Button style={{ borderRadius: 30, marginRight: 30, fontFamily: 'KOTRA_GOTHIC' }} onClick={() => handleFollow(follower.id)}>
                                        {info.following.map(f => f.id).includes(follower.id) ? '팔로잉' : '팔로우하기'}
                                    </Button>
                                </List.Item>
                            )}
                            style={{ overflowY: 'scroll', height: 'calc(100% - 72px)', padding: '10px' }}
                        />

                    </FollowerFrame>
                    <FollowingFrame >
                        <h2 style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}> Following </h2>
                        <div style={{ borderBottom: '1px solid #ccc', marginBottom: '10px' }}></div>
                        <List
                            dataSource={info.following}
                            renderItem={following => (
                                <List.Item style={{ height: '100px', marginLeft: '28px' }}>
                                    <List.Item.Meta
                                        avatar={<Avatar src={following.profile_image} style={{ width: '60px', height: '60px' }} />}
                                        title={<span style={{ fontSize: '18px', fontWeight: 'bold', fontFamily: 'KOTRA_GOTHIC' }}>{following.username}</span>}
                                        description={<span style={{ fontFamily: 'KOTRA_GOTHIC' }}>{following.email}</span>}
                                    />

                                    <Button style={{ borderRadius: 30, marginRight: 30, fontFamily: 'KOTRA_GOTHIC' }} onClick={() => handleFollow(following.id)}>
                                        {info.following.map(f => f.id).includes(following.id) ? '팔로잉' : '팔로우하기'}
                                    </Button>
                                </List.Item>
                            )}
                            style={{ overflowY: 'scroll', height: 'calc(100% - 72px)', padding: '10px' }}
                        />
                    </FollowingFrame>
                </MainFrame>
            </Frame>
        </>
    );
}

