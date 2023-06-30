import React from 'react';
import { useState, useEffect } from 'react';
import { MainFrame, Frame, FollowerFrame, FollowingFrame } from '../../../styles/MyPage_Emotion';
import { List, Avatar, Button } from 'antd';
import useGET from '../../AuthCommunicate/GET';

export default function MyFollows() {
    const [info, setInfo] = useState([]);
    const { fetchData: getFetchData, data: getData, error: getError } = useGET();

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




    return (
        <>
            <Frame>
                <MainFrame>
                    <FollowerFrame>
                        <h2 style={{ marginBottom: '20px' }}>Followers</h2>
                        <div style={{ borderBottom: '1px solid #ccc', marginBottom: '10px' }}></div>
                        <List
                            dataSource={info.follower}
                            renderItem={follower => (
                                <List.Item style={{ height: '100px', marginLeft: '28px' }}>
                                    <List.Item.Meta
                                        avatar={<Avatar src={follower.profile_image} style={{ width: '60px', height: '60px' }} />}
                                        title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>{follower.username}</span>}
                                        description={<span>{follower.email}</span>}
                                    />
                                    <Button style={{ marginRight: '40px' }}>임시</Button>
                                </List.Item>
                            )}
                            style={{ overflowY: 'scroll', height: 'calc(100% - 72px)', padding: '10px' }}
                        />
                    </FollowerFrame>
                    <FollowingFrame>
                        <h2 style={{ marginBottom: '20px' }}>Following</h2>
                        <div style={{ borderBottom: '1px solid #ccc', marginBottom: '10px' }}></div>
                        <List
                            dataSource={info.following}
                            renderItem={following => (
                                <List.Item style={{ height: '100px', marginLeft: '28px' }}>
                                    <List.Item.Meta
                                        avatar={<Avatar src={following.profile_image} style={{ width: '60px', height: '60px' }} />}
                                        title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>{following.username}</span>}
                                        description={<span>{following.email}</span>}
                                    />
                                    <Button style={{ marginRight: '40px' }}>임시</Button>
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
