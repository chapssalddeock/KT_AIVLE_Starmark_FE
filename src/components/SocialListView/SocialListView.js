import React, { useEffect, useState } from 'react';
import { Avatar, List, Table, Tag,  Card } from 'antd';
import VirtualList from 'rc-virtual-list';
import UserDrawer from '../Modal/UserDrawer';
import useGET from '../../AuthCommunicate/GET';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
const ContainerHeight = 750;

export default function SocialListView({ searchResult }) {
    const [users, setUsers] = useState([]);
    const { fetchData, data, error } = useGET();
    const { fetchData: AllfetchData, data: userListData, error: userListError } = useGET();
    const { fetchData: fetchMydata, data: MyBookData, error: MyBookError } = useGET();
  
    const fetchMyBookList = async () => {
      const config = {
        params: {
          user_id: 0,
        },
      };
      await fetchMydata('/userinfo/', config);
    };
  
    useEffect(() => {
      fetchMyBookList();
    }, []);
  
    const [urlList, setUrlList] = useState([]);
  
    useEffect(() => {
      const extractUrls = () => {
        if (MyBookData && MyBookData.bookmark_list) {
          const newUrlList = [];
          const bookmarkList = MyBookData['bookmark_list'];
          for (const item of bookmarkList) {
            const url = item.url;
            newUrlList.push(url);
          }
          setUrlList(newUrlList);
        }
      };
  
      extractUrls();
    }, []);
  
    const [config, setConfig] = useState({});
  
    const fetchUserList = async (searchResult) => {
      const newConfig = {};
  
      if (searchResult && searchResult.length > 0) {
        newConfig.params = {};
        searchResult.forEach((item, index) => {
          newConfig.params['data'] = item;
        });
      }
  
      await AllfetchData('/search/', newConfig);
      setConfig(newConfig);
    };
  
    useEffect(() => {
      if (userListData) {
        setUsers(userListData);
      } else if (userListError) {
        console.error(userListError);
      }
    }, [userListData, userListError]);
  
    useEffect(() => {
      fetchUserList(searchResult);
    }, [searchResult]);
  
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [userProfile, setUserProfile] = useState(null);
    const [urls, setUrls] = useState([]);
    const [userBookMark, setUserBookMark] = useState([]);
  
    const handleOpenDrawer = async (id) => {
      const config = {
        params: {
          user_id: id,
        },
      };
      await fetchData('/userinfo/', config);
    };
  
    useEffect(() => {
      if (data && searchResult && searchResult.length > 0) {
        const urls = [];
        const tagName = searchResult[0]; // Assuming you want to use the first tag from searchResult
  
        data.bookmark_list.forEach((bookmark) => {
          const tags = Object.values(bookmark)[10];
  
          if (tags && tags.includes(tagName)) {
            const url = Object.values(bookmark)[3];
            urls.push(url);
          }
        });
  
        setUrls(urls);
        setUserProfile(data);
        setIsDrawerOpen(true);
      } else if (error) {
        console.error(error);
      }
    }, [data, error, searchResult]);
  
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
  
    const [activeIndex, setActiveIndex] = useState(0);
  
    const handlePrev = () => {
      if (activeIndex > 0) {
        setActiveIndex(activeIndex - 1);
      }
    };
  
    const handleNext = () => {
      if (activeIndex < users.length - 1) {
        setActiveIndex(activeIndex + 1);
      }
    };
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3, // 한 번에 보여줄 아이템 수
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        arrows: true,
        onWheel: handleWheel,
        prevArrow: (
            <div className="slick-prev-wrapper" onClick={handlePrev}>
              <UpOutlined className="slick-prev" />
            </div>
          ),
          nextArrow: (
            <div className="slick-next-wrapper" onClick={handleNext}>
              <DownOutlined className="slick-next" />
            </div>
          ),
        responsive: [
          {
            breakpoint: 768, // 뷰포트 너비가 768px 이하인 경우
            settings: {
              slidesToShow: 1, // 한 번에 보여줄 아이템 수
            },
          },
        ],
      };
    
    const handleWheel = (e) => {
        const delta = Math.max(-1, Math.min(1, e.deltaY));
        if (delta < 0) {
          handleNext(); // 마우스 휠을 아래로 스크롤하면 다음 슬라이드로 이동
        } else if (delta > 0) {
          handlePrev(); // 마우스 휠을 위로 스크롤하면 이전 슬라이드로 이동
        }
      };
   
    
  
    return (
      <>
        <div style={{ marginLeft: 40, marginRight: 30, width: 1050 }}>
            <Slider {...settings}>
                {users.map((item, index) => (
                    <Card
                    key={item.email}
                    onClick={() => handleOpenDrawer(item.id)}
                    onMouseEnter={() => handleMouseEnter(item)}
                    onMouseLeave={handleMouseLeave}
                    className={hoveredItem === item ? 'active' : ''}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        left: index !== 0 ? '-100px' : 0,
                        zIndex: users.length - Math.abs(activeIndex - index),
                        transform: hoveredItem === item ? 'scale(1.05)' : 'scale(1)',
                        transition: 'transform 0.3s ease',
                        opacity: activeIndex === index ? 1 : 0.5,
                        filter: activeIndex === index ? 'none' : 'blur(2px)',
                        height: 350, // Adjust the height value as needed
                        width: 400,
                    }}
                    >
                    <Card.Meta
                        avatar={<Avatar src={'http://kt-aivle.iptime.org:40170' + item.profile_image} size={80} />}
                        title={<div style={{ fontSize: '24px', marginTop: '8px', marginRight: 'auto' }}>{item.username}</div>}
                        description={<div style={{ fontSize: '16px', marginTop: '8px' }}>{item.email}</div>}
                    />
                    {hoveredItem === item && (
                        <div
                        style={{
                            position: 'absolute',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            color: 'black',
                            background: 'rgba(255, 0, 0, 0.7)',
                            padding: '5px 10px',
                            borderRadius: '4px',
                        }}
                        >
                        View Tag
                        </div>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: 16 }}>
                        {searchResult &&
                        searchResult.map((tag) => (
                            <Tag key={tag} style={{ marginRight: '10px', borderRadius: 20, border: 'none' }}>
                            {tag}
                            </Tag>
                        ))}
                    </div>
                    </Card>
                ))}
            </Slider>
        </div>
        <UserDrawer isOpen={isDrawerOpen} onClose={handleCloseDrawer} userProfile={userProfile} urls={urls} urlList={urlList} />
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