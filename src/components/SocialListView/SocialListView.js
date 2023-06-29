import React, { useEffect, useState } from 'react';
import { Avatar, List, Table, Tag } from 'antd';
import VirtualList from 'rc-virtual-list';
import UserDrawer from '../Modal/UserDrawer';
import useGET from '../../AuthCommunicate/GET';

const ContainerHeight = 750;

export default function SocialListView({ searchResult }) {
    // 유저 리스트 불러오기 관련, tag를 빈 리스트로 보내면 전체 유저가 불러짐 (초기 화면)
    // 태그를 토글선택하면 tag : []에 추가하도록 로직을 짜면 될듯함
    // 즉, 사이드바에서 이벤트 발생하면 SocialListView로 넘어오도록!
    // 공통되는 통신 부분 및 config 함수화 필요
    
    const [users, setUsers] = useState([]);
    const { fetchData, data, error } = useGET();
    const { fetchData : AllfetchData, data: userListData, error: userListError } = useGET();
    const { fetchData : BookfetchData, data : userBookData, error: userBookError } = useGET();
    const { fetchData : getFetchBookData, data: getBookData, error: getBookError } = useGET();
    useEffect(() => {
        const fetchBookMark = async () => {
            await getFetchBookData('/bookmark');
        };
    
        fetchBookMark();
      }, []);
    
    //   useEffect(() => {
    //     if (getBookData) {
    //         const tags = getTagData.map(item => item.tags);
    //         const uniqueTags = [...new Set(tags)];
    //         setTags(uniqueTags);
    //         console.log('Tags:', tags);
    //     } else if (getTagError) {
    //         console.error(getTagError);
    //     }
    // }, [getTagData, getTagError]);
    
    
    
    
    const fetchUserList = async (searchResult) => {
        // console.log('tag', searchResult)
        const config = {};

        if (searchResult && searchResult.length > 0) {
            config.params = {};
            searchResult.forEach((item, index) => {
                config.params['data'] = item;
            });
        }
       
        await AllfetchData('/search/', config);
    };
    useEffect(() => {
        
        if (userListData) {
            console.log('userListData', userListData)
            setUsers(userListData);
            
        } else if (userListError) {
            console.error(userListError);
        }
    }, [userListData, userListError]);
    useEffect(() => {
        fetchUserList(searchResult);
    }, [searchResult]);
    // useEffect(() => {
    //     fetchUserBook();
    // }, []);
    
    
    // const fetchUserBook = async () => {
    //     const config = {
    //         params: {
    //             tag: []
    //         }
    //     }
    //     await BookfetchData('/bookmark', config);
    // };  추후에 일치하는 Tag들을 고를ㄸ ㅐ사용
    
    
    
    

    // 유저 프로필 보기 관련 (View Profile)
    // user_id를 기준으로 작동
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [userProfile, setUserProfile] = useState(null);
    const [userBookMark, setUserBookMark] = useState([]);
    const handleOpenDrawer = async (id) => {
        const config = {
            params: {
                user_id: id,
            },
        };
        await fetchData('/userinfo', config);
    };
    const config_2 = {
        params: {
          tags: [],
        },
      };
      
      if (data && data.bookmark_list) {
        const bookmarkList = data.bookmark_list;
        // bookmark_list를 사용하는 추가 작업 수행
        const tags = bookmarkList.map((item) => item.tags);
        const urls = bookmarkList.map((item) => item.url);
      }
      
    
    
    useEffect(() => {
        if (data) {
          setUserProfile(data);
          setIsDrawerOpen(true);
        } else if (error) {
          console.error(error);
        }
      }, [data, error]);
    

    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
    };
    const handleItemClick = (item) => {
        
        handleOpenDrawer(item.id);
      };
    
    
    const [hoveredItem, setHoveredItem] = useState(null);

    const handleMouseEnter = (item) => {
        setHoveredItem(item);
    };

    const handleMouseLeave = () => {
        setHoveredItem(null);
    };



    return (
        <>
            <List bordered size='large' style={{ marginLeft: 40, marginRight: 30, width: 1050 }}>
                <List.Item>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontSize: '20px' }}>NickName(email)</div>
                        <div style={{ marginLeft: '585px', fontSize: '20px' }}>Tags</div>
                    </div>
                </List.Item>
                <VirtualList
                    data={users}
                    height={ContainerHeight}
                    itemHeight={80}
                    itemKey="email"
                    
                >
                    {(item) => (
                        <List.Item key={item.email} actions={[
                            < a >
                                Follow
                            </a>,

                            ]}
                            onClick={() => handleOpenDrawer(item.id)}
                            onMouseEnter={() => handleMouseEnter(item)}
                            onMouseLeave={handleMouseLeave}
                            className={hoveredItem === item ? 'active' : ''}
                            style={{ backgroundColor: hoveredItem === item ? 'skyblue' : 'inherit', transition: 'background-color 0.3s ease', }}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={'http://kt-aivle.iptime.org:40170' + item.profile_image} size={80} />}
                                title={
                                    <div style={{ fontSize: '24px', marginTop: '8px', marginRight: 'auto' }}>
                                        {item.username}
                                        
                                    </div>
                                }
                                description={<div style={{ fontSize: '16px', marginTop: 0 }}>{item.email}</div>}
                            />
                            {hoveredItem === item && (
                                <div
                                    style={{
                                    position: 'absolute',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    color: 'Black',
                                    background: 'rgba(W, 0, 0, 0.7)',
                                    padding: '5px 10px',
                                    borderRadius: '4px',
                                    }}
                                >
                                    View Tag
                                </div>
                            )}
                            
                            <div style={{ position: 'fixed', marginLeft: '750px', display: 'flex', alignItems: 'center', marginRight: '75px' }}>
                                {searchResult && searchResult.map((tag) => (
                                    <Tag key={tag} style={{ marginRight: '10px', borderRadius: 20, height: 25 }}>{tag}</Tag>
                                ))}
                            </div>
                            
                        </List.Item>
                    )}
                </VirtualList >
            </List >
            <UserDrawer isOpen={isDrawerOpen} onClose={handleCloseDrawer} userProfile={userProfile} />
        </>
    );
};




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// import { Avatar, List } from 'antd';
// import VirtualList from 'rc-virtual-list';
// import UserDrawer from '../Modal/UserDrawer';

// const ContainerHeight = 750;


// export default function SocialListView() {

//     // 유저 리스트 불러오기 관련, tag를 빈 리스트로 보내면 전체 유저가 불러짐 (초기 화면)
//     // 태그를 토글선택하면 tag : []에 추가하도록 로직을 짜면 될듯함
//     // 즉, 사이드바에서 이벤트 발생하면 SocialListView로 넘어오도록!
//     // 공통되는 통신 부분 및 config 함수화 필요

//     const [users, setUsers] = useState([]);

//     useEffect(() => {
//         fetchUserList();
//     }, []);

//     const fetchUserList = async () => {
//         try {
//             const config = {
//                 headers: {
//                     Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg4NTQyMzU4LCJpYXQiOjE2ODcyNDYzNTgsImp0aSI6ImI2YTU0OWJkOWQxYTQzMWFhNDE3NmFmMmFmMjVjYjQ2IiwidXNlcl9pZCI6MiwidXNlcm5hbWUiOiJcdWQxNGNcdWMyYTRcdWQyYjgwMyJ9.cTZokEPKCxNTo6S-BXdv2pRakGRlnIBqzWAGHQKI6Nk'
//                 },
//                 params: {
//                     tag: []
//                 }
//             }
//             const response = await axios.get('http://kt-aivle.iptime.org:40170/api/search/', config);
//             // api/search/에서는 id, email, username, profile_image, following_cnt, follower_cnt, bookmark_cnt 리턴

//             if (response.status === 200) {
//                 const userList = response.data;
//                 setUsers(userList);

//             } else {
//                 console.error('Failed to fetch user list');
//             }
//         } catch (error) {
//             console.error('Error fetching user list:', error);
//         }
//     };



//     // 유저 프로필 보기 관련 (View Profile)
//     // user_id를 기준으로 작동
//     const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//     const [userProfile, setUserProfile] = useState(null);

//     const handleOpenDrawer = async (id) => {
//         try {
//             const config = {
//                 headers: {
//                     Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg4NTQyMzU4LCJpYXQiOjE2ODcyNDYzNTgsImp0aSI6ImI2YTU0OWJkOWQxYTQzMWFhNDE3NmFmMmFmMjVjYjQ2IiwidXNlcl9pZCI6MiwidXNlcm5hbWUiOiJcdWQxNGNcdWMyYTRcdWQyYjgwMyJ9.cTZokEPKCxNTo6S-BXdv2pRakGRlnIBqzWAGHQKI6Nk'
//                 },
//                 params: {
//                     user_id: id
//                 }
//             };

//             const response = await axios.get('http://kt-aivle.iptime.org:40170/api/userinfo/', config);
//             // api/userinfo/에서는 id, email, username, profile_image, is_following, following_cnt, follower_cnt, bookmark_cnt 리턴

//             if (response.status === 200) {
//                 setUserProfile(response.data);
//                 setIsDrawerOpen(true);
//             } else {
//                 console.error('Failed to fetch user profile');
//             }
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const handleCloseDrawer = () => {
//         setIsDrawerOpen(false);
//     };




//     return (
//         <>
//             <List bordered size='large' style={{ marginLeft: 40, marginRight: 30, width: 1050 }}>
//                 <VirtualList
//                     data={users}
//                     height={ContainerHeight}
//                     itemHeight={80}
//                     itemKey="email"
//                 >
//                     {(item) => (
//                         <List.Item key={item.email} actions={[
//                             < a onClick={() => handleOpenDrawer(item.id)}  >
//                                 View Profile
//                             </a>,

//                         ]}>
//                             <List.Item.Meta
//                                 avatar={<Avatar src={'http://kt-aivle.iptime.org:40170' + item.profile_image} size={80} />}
//                                 title={<div style={{ fontSize: '24px', marginTop: '8px' }}>{item.username}</div>}
//                                 description={<div style={{ fontSize: '16px', marginTop: 0 }}>{item.email}</div>}
//                             />
//                             <div>
//                                 <div>주요 태그</div>
//                                 {/* (item.tags.map((tag) => (<Tag key={tag} style={{ borderRadius: 20, height: 25 }}>{tag}</Tag>))) */}
//                             </div>
//                             <div style={{ marginLeft: 30 }}>
//                                 <div>{item.following_cnt}</div>
//                             </div>
//                             <div style={{ marginLeft: 30 }}>
//                                 <div>{item.follower_cnt}</div>
//                             </div>
//                         </List.Item>
//                     )}
//                 </VirtualList >
//             </List >
//             <UserDrawer isOpen={isDrawerOpen} onClose={handleCloseDrawer} userProfile={userProfile} />
//         </>
//     );
// };





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