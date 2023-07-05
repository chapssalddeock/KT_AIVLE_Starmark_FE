import React, { useState, useEffect } from 'react';
import { Drawer, Spin, Input, Avatar , Button, Modal, Form, Tag} from 'antd';
import FollowButton from '../Modal/FollowButton';
import usePOST from '../../AuthCommunicate/POST';
import SubmitForm_Social from '../Modal/SubmitForm_Social';
import { StyledScrollbar } from '../../../styles/HelpButton_Emotion';

// id, email, username, profile_image, is_following, following_cnt, follower_cnt, bookmark_cnt 넘어옴
export default function UserDrawer({ isOpen, onClose, userProfile, urls, urlList, allurls, userdataProfile }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { fetchData: postFetchData, data: postData, error: postError } = usePOST();
  const [form] = Form.useForm();
  
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleOpenDrawer = (url) => {
    setSelectedUrl(url);
    setIsDrawerOpen(true);
  };
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    
    
  };
  
  // const valuesList = Object.values(allurls)
  
  useEffect(() => {
    if (postData) {
        console.log('전송 성공', postData);
        setIsSubmitting(false); // Reset the submission state
    } else if (postError) {
        console.log('전송 실패', postError);
        setIsSubmitting(false); // Reset the submission state
    }
}, [postData, postError]);

  return (
    <>
      <Drawer
        width={500}
        onClose={onClose}
        open={isOpen}
        style={{
          maxHeight:'100vh',
          overflowY: 'hidden'
      }}
        
      >
        {userProfile && (
          <div style ={{  display: 'flex', justifyContent: 'center', alignItems: 'center',flexDirection: 'column',  height: '80vh'}}>
            <div className="site-description-item-profile-p" style= {{display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
              <Avatar src={userProfile.profile_image} size={80} />
              
            </div>
            <div style= {{display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
              <strong>UserName:</strong> {userProfile.username}
            </div>
            <div  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <strong>Email:</strong> {userProfile.email}
              <div >
              <FollowButton user_isFollowing={userProfile.is_following} user_id={userProfile.id} />
                
              </div>
              <strong>Url:</strong>
              <StyledScrollbar style={{overflowY:'scroll', height:'30vh', width: '450px'}}>
                <div>
                  {urls.map((url, index) => {
                    const isUrlInList = urlList.includes(url);
                    
                    return (
                      <div
                        key={index}
                        style={{
                          marginLeft:'2vw',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginTop: '3vh',
                          marginBottom: '3vh',
                          opacity: isUrlInList ? 0.5 : 1,
                          pointerEvents: isUrlInList ? 'none' : 'auto',
                          width: '90%',
                        }}
                      >
                        <div style={{ flex: 1, overflowX: 'hidden', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{url}</div>
                        <Button onClick={() => handleOpenDrawer(url)} type="primary" size="small" disabled={isUrlInList} style={{ width: '25%', height: '100%', backgroundColor: 'white',
                                color: 'black', fontSize: '1.5vh', fontWeight: 'bold', borderRadius: '20px', padding: '0.5vh 0.5vw',
                                boxShadow: '2px 2px 2px rgba(11, 153, 255, 0.7)'
                            }}>
                          Add
                        </Button>
                        <SubmitForm_Social url={url} isOpen={isDrawerOpen} onClose={handleCloseDrawer} />
                      </div>
                    );
                  })}
                </div>
               
              </StyledScrollbar>
              
            </div>
            {/* 추가적인 유저 정보를 표시하는 코드를 작성하세요 */}
          </div>
        )}

        {!userProfile && userdataProfile && (
          <div style ={{  display: 'flex', justifyContent: 'center', alignItems: 'center',flexDirection: 'column',  height: '80vh'}}>
            <div className="site-description-item-profile-p" style= {{display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
              <Avatar src={userdataProfile.profile_image} size={80} />
              
            </div>
            <div style= {{display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
              <strong>UserName:</strong> {userdataProfile.username}
            </div>
            <div  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <strong>Email:</strong> {userdataProfile.email}
              <div >
              <FollowButton user_isFollowing={userdataProfile.is_following} user_id={userdataProfile.id} />
                
                
              </div>
              <div style={{ width:'100%',display: 'flex', flexDirection: 'row' }}>
                <div style={{ fontWeight: 'bold',marginLeft:'5%' }}>Main Tag</div>
                <div style={{ fontWeight: 'bold', marginLeft:'30%' }}>Url</div>
              </div>
              <StyledScrollbar style={{overflowY:'scroll', height:'30vh', width: '450px'}}>
                <div>
                  {Object.entries(allurls).map(([key, value]) => {
                    const isUrlInList_2 = urlList.includes(value);
                    const handleButtonClick = () => {
                      handleOpenDrawer(value);
                      
                    };
                    
                    return (
                      <div
                        
                        style={{
                          marginLeft:'2vw',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginTop: '3vh',
                          marginBottom: '3vh',
                          opacity: isUrlInList_2 ? 0.5 : 1,
                          pointerEvents: isUrlInList_2 ? 'none' : 'auto',
                          width: '90%',
                        }}
                      >
                        <div key={key} style={{ fontFamily: 'KOTRA_GOTHIC', flex: 1, overflowX: 'hidden', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {key}: {value}
                        </div>
                        
                       
                      </div>
                    );
                  })}
                </div>
               
              </StyledScrollbar>
              
            </div>
            
          </div>
        )}
      </Drawer>

      
    </>
  );
};


