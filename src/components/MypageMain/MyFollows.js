import { useState, useEffect } from 'react';
import { MainFrame, Frame, FollowerFrame, FollowingFrame } from '../../../styles/MyPage_Emotion';
import { List, Avatar } from 'antd';
import useGET from '../../AuthCommunicate/GET';

export default function MyFollows() {
    const [info, setInfo] = useState([]); // 나의 기본 소셜관련 불러오기 
    const { fetchData: getFetchData, data: getData, error: getError } = useGET();


    // 기본적으로 나의 팔로우 팔로잉을 불러오는 부분
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

    // 언팔로우 및 팔로우가 가능하도록 통신하는 부분





    return (
        <>
            <Frame>
                <MainFrame>
                    <FollowerFrame>
                        <List
                            dataSource={info.follower}
                            renderItem={follower => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src={follower.profile_image} />}
                                        title={follower.username}
                                    />
                                </List.Item>
                            )}
                        />
                    </FollowerFrame>
                    <FollowingFrame>
                        <List
                            dataSource={info.following}
                            renderItem={following => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src={following.profile_image} />}
                                        title={following.username}
                                    />
                                </List.Item>
                            )}
                        />
                    </FollowingFrame>
                </MainFrame>
            </Frame>
        </>

    )

};