import React, { useEffect, useState, useRef } from 'react';
import { Avatar, Tag,  Card, Button } from 'antd';
import UserDrawer from '../Modal/UserDrawer';
import useGET from '../../AuthCommunicate/GET';
import FollowButton from '../Modal/FollowButton';
const ContainerHeight = 750;
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Mousewheel } from "swiper";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "swiper/css/effect-coverflow";
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
  
    const extractUrls = () => {
      if (MyBookData && MyBookData.bookmark_list) {
        const newUrlList = [];
        const bookmarkList = MyBookData.bookmark_list;
        for (const item of bookmarkList) {
          const url = item.url;
          newUrlList.push(url);
        }
        setUrlList(newUrlList);
      }
    };
    
    useEffect(() => {
      extractUrls();
    }, [MyBookData]);
    
    
  
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
    const swiperRef = useRef(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [userProfile, setUserProfile] = useState(null);
    const [urls, setUrls] = useState([]);
    const [userBookMark, setUserBookMark] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const handleOpenDrawer = async (id, index, event) => {
      const isFollowButtonClicked = event.target.closest('.follow-button');
      if (isFollowButtonClicked) {
        return; // Do nothing if FollowButton is clicked
      }
      const config = {
        params: {
          user_id: id,
        },
      };
      if (index !== activeIndex) {
        setActiveIndex(index); // 선택한 슬라이드의 인덱스를 활성화
        swiperRef.current.swiper.slideTo(index); // 선택한 슬라이드를 중앙으로 이동
      } else {
        setIsDrawerOpen(true);
      }
  
      try {
        await fetchData('/userinfo/', config);
      } catch (error) {
        console.error(error);
      }
      };
  
    
    useEffect(() => {
      if (data && searchResult && searchResult.length > 0) {
        const urls = [];
        const tagName = searchResult[0]; // Assuming you want to use the first tag from searchResult
  
        data.bookmark_list.forEach((bookmark) => {
      
          const tags = Object.values(bookmark)[9];
          if (tags && tags.includes(tagName)) {
            const url = Object.values(bookmark)[3];
            urls.push(url);
          }

        });
  
        setUrls(urls);
        setUserProfile(data);
        
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
    const handleFollowButtonClick = (event, user_id) => {
      // Prevent the event from bubbling up to the Card and triggering handleOpenDrawer
      event.stopPropagation();
  
      
      // Add your logic for handling the FollowButton click
    };

    return (
      <>
        <div
        style={{
          marginTop: '8%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
          position: 'relative',
        }}
      >
        {users.length > 0 && searchResult.length > 0 ? (
          <Swiper
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            ref={swiperRef}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={2}
            coverflowEffect={{
              rotate: 50,
              stretch: 10,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            mousewheel={true}
            pagination={{
              el: '.swiper-pagination',
              clickable: true,
              renderBullet: function (index, className) {
                return '<span class="' + className + '">' + (index + 1) + '</span>';
              },
            }}
            className="mySwiper"
            modules={[Mousewheel, Pagination, EffectCoverflow]}
            style={{ marginTop: '0%', height: '150%', width: '100%' }}
          >
            {users.map((item, index) => (
              <SwiperSlide key={item.email}>
                <Card
                  onClick={(event) => handleOpenDrawer(item.id, index, event)}
                  onMouseEnter={() => handleMouseEnter(item)}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    width: '80%',
                    marginLeft: '5%',
                    borderRadius: '10px',
                    marginTop: '10%',
                    height: '80%',
                    background: '#fff',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10%' }}>
                    <Avatar size={128} src={'http://kt-aivle.iptime.org:40170' + item.profile_image}/>
                  </div>
                  <div style={{ marginTop: '5%', textAlign: 'center' }}>
                    <h3 style={{ color: '#777', textAlign: 'center',  marginBottom: '2%' }}>{item.username}</h3>
                    <p style={{ color: '#777' }}>{item.email}</p>
                  </div>
                  {userBookMark.id === item.id ? (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '10%',
                        padding: '8px',
                        background: '#007aff',
                        color: '#fff',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                    >
                      View Bookmarks
                    </div>
                  ) : (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '0', padding: '8px' }}>
                      <div
                        style={{
                          flex: 1,
                          display: 'flex',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          background: 'white',
                          color: '#777',
                          cursor: 'pointer',
                          marginBottom: '10px',
                          width: '300px'
                        }}
                      >
                        Search Tag :
                        {searchResult.map((tag) => (
                          <Tag key={tag} color="geekblue" style={{ marginLeft: '18%' }}>
                            {tag}
                          </Tag>
                        ))}
                        
                      </div>
                      <div
                        style={{
                          flex: 1,
                          display: 'flex',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          background: 'white',
                          color: '#777',
                          cursor: 'pointer',
                          marginBottom: '10px',
                          width: '300px',
                          
                        }}
                      >
                        
                        All Bookmark :
                         
                          <Tag  color="geekblue" style={{ marginLeft: '18%' }}>
                            {item.bookmark_cnt}
                          </Tag>
                      </div>
                      <div
                        style={{
                          flex: 1,
                          display: 'flex',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          background: 'white',
                          color: '#777',
                          cursor: 'pointer',
                          marginBottom: '10px',
                          width: '300px',
                          
                        }}
                      >
                        count of tags :
                        {item.tag_list.map((tag) => (
                          searchResult.includes(tag.name) && (
                            
                            <Tag key={tag.name} color="geekblue" style={{ marginLeft: '18%' }}>
                              {tag.num_bookmarks}
                            </Tag>
                          )
                        ))}
                      </div>
                      <div
                        style={{
                          flex: 1,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          background: 'white',
                          cursor: 'pointer',
                          marginBottom: '10px',
                          width: '300px'
                        }}
                      >
                       
                      <div className="follow-button">
                        <FollowButton user_isFollowing={item.is_following} user_id={item.id} onClick={(event) => handleFollowButtonClick(event, item.id)} />
                      </div>
                     
                      </div>
                    </div>
                    
                  )}
                  
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div style={{ textAlign: 'center', fontSize: '20px' }}>
            {users.length === 0 ? 'Please Search Tag' : 'No users found'}
          </div>
        )}
        <div className="swiper-pagination" style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          height: '20px',
          width: '100%',
          bottom: '-30%',
          left: '-2%',
        }} />
        <style>
          {`
            .swiper-pagination-bullet {
              width: 20px;
              height: 20px;
              text-align: center;
              line-height: 20px;
              font-size: 12px;
              color: #000;
              opacity: 1;
              background: rgba(0, 0, 0, 0.2);
              background: rgba(0, 0, 0, 0.2);
              display: inline-block;
              margin: 0 5px;
              cursor: pointer;
            }

            .swiper-pagination-bullet-active {
              color: #fff;
              background: #007aff;
            }
          `}
        </style>
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