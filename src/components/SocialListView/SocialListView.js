import React, { useEffect, useState, useRef } from 'react';
import { Avatar, Tag,  Card, Button } from 'antd';
import UserDrawer from '../Modal/UserDrawer';
import useGET from '../../AuthCommunicate/GET';
import { Frame} from '../../../styles/MyPage_Emotion';
const ContainerHeight = 750;
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Mousewheel } from "swiper";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "swiper/css/effect-coverflow";
import { Wave } from "../../../styles/PageScroll_Emotion";
import 'animate.css';
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
        return; 
      }
      const config = {
        params: {
          user_id: id,
        },
      };
      if (index !== activeIndex) {
        setActiveIndex(index); 
        swiperRef.current.swiper.slideTo(index); 
      } else {
        setIsDrawerOpen(true);
      }
  
      try {
        await fetchData('/userinfo/', config);
      } catch (error) {
        console.error(error);
      }
      };
  
    const [allurls, setallUrls] = useState([]);
    useEffect(() => {
      if (data) {
        const urls = {};
        
  
        data.bookmark_list.forEach((bookmark) => {
          
          const tags = Object.values(bookmark)[10];
          const url = Object.values(bookmark)[3];
          
          if (tags) {
              urls[tags[0]] = url;
          } else {
              urls['No tag'] = url;
          }
          
          

        });
  
        setallUrls(urls);
        
      } else if (error) {
        console.error(error);
      }
    }, [data]);
   
    
    const [userdataProfile, setuserdataProfile] = useState(null);
    useEffect(() => {
      if (data && searchResult && searchResult.length > 0) {
        const urls = [];
        const tagName = searchResult[0]; 
  
        data.bookmark_list.forEach((bookmark) => {
          
          const tags = Object.values(bookmark)[10];
          
          if (tags && tags.includes(tagName)) {
            const url = Object.values(bookmark)[3];
            urls.push(url);
          }

        });
        setUrls(urls);
        setUserProfile(data);
        
        
      } else if (error) {
        console.error(error);
      } else if (data) {
        setuserdataProfile(data);
      }
    }, [data, error, searchResult]);

    const handleCloseDrawer = async () => {
      setIsDrawerOpen(false);
    
  
      await fetchUserList(searchResult);
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
      event.stopPropagation();
  
      
     
    };
    const [followButtonHovered, setFollowButtonHovered] = useState(false);

  
    const handleFollowButtonMouseEnter = () => {
      setFollowButtonHovered(true);
    };

    const handleFollowButtonMouseLeave = () => {
      setFollowButtonHovered(false);
    };
    return (
      <>
        <Frame
        style={{
          
       
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '80vh',
          position: 'relative',
        }}
        >
        
        
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
            style={{ marginTop: '-8%', width: '100%' }}
          >
            {users.map((item, index) => (
              <SwiperSlide key={item.email}>
                <Card
                  onClick={(event) => handleOpenDrawer(item.id, index, event)}
                  onMouseEnter={() => handleMouseEnter(item)}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                  
                    alignItems: 'center',
                    width: '80%',
                    marginLeft: '5%',
                    borderRadius: '10px',
                     
                    transition: 'background-color 0.3s ease',
                    height: '60vh',
                    background: '#fff',
                    boxShadow: '0px 4px 6px rgba(94, 172, 242, 0.2)',
                    overflow: 'hidden',
                  }}
                  className = "Card_Users"
                >
                  <Wave style={{position: 'absolute', zIndex:'0', bottom:0, left:0, width:'100%', height:'30%'}}>
                    <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                      <defs>
                        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                      </defs>
                      <g className="parallax">
                        <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(94, 172, 242, 0.2)" />
                        <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(94, 172, 242, 0.2)" />
                        <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(94, 172, 242, 0.3)" />
                        <use xlinkHref="#gentle-wave" x="48" y="7" fill="rgba(94, 172, 242, 0.1)" />
                      </g>
                    </svg>
                  </Wave>
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10%' }}>
                    <Avatar size={128} src={item.profile_image}/>
                  </div>
                  <div style={{ marginTop: '5%', textAlign: 'center' }}>
                    <h3 style={{ color: '#777', textAlign: 'center',  marginBottom: '2%',fontFamily: 'KOTRA_GOTHIC' }}>{item.username}</h3>
                    <p style={{ color: '#777',fontFamily: 'KOTRA_GOTHIC' }}>{item.email}</p>
                  </div>
                  {hoveredItem === item ? (
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
                        width: '300px',
                        fontFamily: 'KOTRA_GOTHIC'
                      }}
                    >
                      Search Tag :
                      {searchResult && searchResult.map((tag) => (
                        <Tag key={tag} color="white" style={{ marginLeft: '18%', borderRadius: 20, height: 24, marginBottom: 4, color: '#5eacf2', border: 'solid #5eacf2 0.5px' }}>
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
                        fontFamily: 'KOTRA_GOTHIC'
                      }}
                    >
                      
                      All Bookmark :
                       
                        <Tag  color="white" style={{ zIndex:'1', marginLeft: '18%',borderRadius: 20, height: 24, marginBottom: 4, color: '#5eacf2', border: 'solid #5eacf2 0.5px' }}>
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
                        marginBottom: '5px',
                        width: '300px',
                        fontFamily: 'KOTRA_GOTHIC'
                      }}
                    >
                      count of tags :
                      {item.tag_list.map((tag) => (
                        searchResult.includes(tag.name) && (
                          
                          <Tag key={tag.name} color="white" style={{ marginLeft: '18%',borderRadius: 20, height: 24, marginBottom: 4, color: '#5eacf2', border: 'solid #5eacf2 0.5px' }}>
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
                        marginBottom: '0px',
                        width: '300px'
                      }}
                    >
                    
                    <div 
                        className = 'follow-button'
                    >
                      
                      <Tag style = {{display: 'flex', justifyContent: 'center', alignItems: 'center', height:'25px', width:'100%', borderRadius: 20, height: 24, marginBottom: 4, color: '#5eacf2', border: 'solid #5eacf2 0.5px', backgroundColor: item.is_following ? 'white' : '#8a3df5',}} color="white">
                        {item.is_following ? 'Following' : 'Follow'}
                      </Tag>
                    </div>
                   
                    </div>
                  </div>
                    
                  ) : (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '10%',
                        padding: '8px',
                        background: 'white',
                        color: '#5eacf2',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontFamily: 'KOTRA_GOTHIC'
                        
                      }}
                    >
                      <div>
                      Click View for Bookmarks
                    </div>
                    <div>
                      or Mouse Hover for users
                    </div>
                    </div>
                    
                    
                  )}
                  
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
       
        <div className="swiper-pagination" style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          height: '20px',
          width: '100%',
          bottom: '5%', 
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
      </Frame>
        <UserDrawer isOpen={isDrawerOpen} onClose={handleCloseDrawer} userdataProfile = {userdataProfile} userProfile={userProfile} urls={urls} urlList={urlList} allurls = {allurls}/>
      </>
    );
  };

  