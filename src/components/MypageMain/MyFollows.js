import React from 'react';
import { useState, useEffect } from 'react';
import { MainFrame, Frame, FollowerFrame, FollowingFrame } from '../../../styles/MyPage_Emotion';
import { List, Avatar, Button } from 'antd';
import useGET from '../../AuthCommunicate/GET';
import usePOST from '../../AuthCommunicate/POST';
import useDELETE from '../../AuthCommunicate/DELETE';

export default function MyFollows() {
    const [info, setInfo] = useState([]);
    const { fetchData: getFetchData, data: getData, error: getError } = useGET();
    const { fetchData: postFetchData, data: postData, error: postError } = usePOST();
    const { fetchData: deleteFetchData, data: deleteData, error: deleteError } = useDELETE();

    const fetchData = async () => {
        await getFetchData('/follows/');
    };

    useEffect(() => {
        if (getData) {
            setInfo(getData);
            // console.log("get 데이터 확인", getData);
            // console.log("팔로워 데이터 확인", getData.follower[0]['id']); // 이게 맞는 문법
        } else if (getError) {
            console.error(getError);
        }
    }, [getData, getError]);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (postData) {
            setInfo(postData);
        } else if (postError) {
            console.error('팔로우 중 오류 발생:', postError);
        }
    }, [postData, postError]);

    useEffect(() => {
        if (deleteData) {
            setInfo(deleteData);
        } else if (deleteError) {
            console.error('언팔로우 중 오류 발생:', deleteError);
        }
    }, [deleteData, deleteError]);


    const handleFollow = async (user_id) => {

        const followingIds = info.following.map(f => f.id);
        // 그냥 주면 무조건 false임...
        if (followingIds.includes(user_id)) {
            try {
                const config = {
                    user_id: user_id,
                };
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
                                    <Button onClick={() => handleFollow(follower.id)}>
                                        {info.following.map(f => f.id).includes(follower.id) ? '언팔로우' : '팔로우'}
                                    </Button>
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
                                    <Button onClick={() => handleFollow(following.id)}>
                                        {info.following.map(f => f.id).includes(following.id) ? '언팔로우' : '팔로우'}
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



///////////////////////////////////////////////////////////////////////////////////////////////////


// import React from 'react';
// import { useState, useEffect } from 'react';
// import { MainFrame, Frame, FollowerFrame, FollowingFrame } from '../../../styles/MyPage_Emotion';
// import { List, Avatar, Button } from 'antd';
// import useGET from '../../AuthCommunicate/GET';
// import usePOST from '../../AuthCommunicate/POST';
// import useDELETE from '../../AuthCommunicate/DELETE';


// export default function MyFollows() {
//     const [info, setInfo] = useState([]);
//     const { fetchData: getFetchData, data: getData, error: getError } = useGET();
//     const { fetchData: postFetchData, data: postData, error: postError } = usePOST();
//     const { fetchData: deleteFetchData, data: deleteData, error: deleteError } = useDELETE();


//     // 여긴 팔로잉 팔로워 목록 불러오는 부분
//     const fetchData = async () => {
//         await getFetchData('/follows/');
//     };

//     useEffect(() => {
//         if (getData) {
//             setInfo(getData);
//         } else if (getError) {
//             console.error(getError);
//         }
//     }, [getData, getError]);

//     useEffect(() => {
//         fetchData();
//     }, []);


//     // 여긴 특정유저 팔로우 하는 부분

//     // 여긴 특정유저 언팔로우 하는 부분




//     return (
//         <>
//             <Frame>
//                 <MainFrame>
//                     <FollowerFrame>
//                         <h2 style={{ marginBottom: '20px' }}>Followers</h2>
//                         <div style={{ borderBottom: '1px solid #ccc', marginBottom: '10px' }}></div>
//                         <List
//                             dataSource={info.follower}
//                             renderItem={follower => (
//                                 <List.Item style={{ height: '100px', marginLeft: '28px' }}>
//                                     <List.Item.Meta
//                                         avatar={<Avatar src={follower.profile_image} style={{ width: '60px', height: '60px' }} />}
//                                         title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>{follower.username}</span>}
//                                         description={<span>{follower.email}</span>}
//                                     />
//                                     <Button style={{ marginRight: '40px' }}>임시</Button>
//                                 </List.Item>
//                             )}
//                             style={{ overflowY: 'scroll', height: 'calc(100% - 72px)', padding: '10px' }}
//                         />
//                     </FollowerFrame>
//                     <FollowingFrame>
//                         <h2 style={{ marginBottom: '20px' }}>Following</h2>
//                         <div style={{ borderBottom: '1px solid #ccc', marginBottom: '10px' }}></div>
//                         <List
//                             dataSource={info.following}
//                             renderItem={following => (
//                                 <List.Item style={{ height: '100px', marginLeft: '28px' }}>
//                                     <List.Item.Meta
//                                         avatar={<Avatar src={following.profile_image} style={{ width: '60px', height: '60px' }} />}
//                                         title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>{following.username}</span>}
//                                         description={<span>{following.email}</span>}
//                                     />
//                                     <Button style={{ marginRight: '40px' }}>임시</Button>
//                                 </List.Item>
//                             )}
//                             style={{ overflowY: 'scroll', height: 'calc(100% - 72px)', padding: '10px' }}
//                         />
//                     </FollowingFrame>
//                 </MainFrame>
//             </Frame>
//         </>
//     );
// }
