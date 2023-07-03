import React, { useState, useEffect } from 'react';
import { Drawer, Spin, Input, Avatar , Button, Modal, Form, Switch , Tooltip } from 'antd';
import FollowButton from '../Modal/FollowButton';
import usePOST from '../../AuthCommunicate/POST';
import SubmitForm from '../Modal/SubmitForm';

// id, email, username, profile_image, is_following, following_cnt, follower_cnt, bookmark_cnt 넘어옴
export default function UserDrawer({ isOpen, onClose, userProfile, urls, urlList }) {
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
        bodyStyle={{
          paddingBottom: 80,
        }}
      >
        {userProfile && (
          <div>
            <div className="site-description-item-profile-p">
              <Avatar src={userProfile.profile_image} size={80} />
              <span style={{ marginLeft: 10 }}>{userProfile.username}</span>
            </div>
            <div>
              <strong>UserName:</strong> {userProfile.username}
            </div>
            <div>
              <strong>Email:</strong> {userProfile.email}
              <div>
                <FollowButton user_isFollowing={userProfile.is_following} user_id={userProfile.id} />
              </div>
              <strong>Url:</strong>
              {urls.map((url, index) => {
                const isUrlInList = urlList.includes(url);
                return (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '20px',
                      opacity: isUrlInList ? 0.5 : 1,
                      pointerEvents: isUrlInList ? 'none' : 'auto',
                    }}
                  >
                    <div style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{url}</div>
                    <Button onClick={() => handleOpenDrawer(url)} type="primary" size="small" disabled={isUrlInList}>
                      Add
                    </Button>
                    <SubmitForm url={url} isOpen={isDrawerOpen} onClose={handleCloseDrawer} />
                  </div>
                );
              })}
            </div>
            {/* 추가적인 유저 정보를 표시하는 코드를 작성하세요 */}
          </div>
        )}

        {!userProfile && (
          <p className="site-description-item-profile-p">유저 정보를 불러오는 중입니다...</p>
        )}
      </Drawer>

      
    </>
  );
};


