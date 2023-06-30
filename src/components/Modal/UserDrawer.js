import React, { useState, useEffect } from 'react';
import { Drawer, Spin, Input, Avatar , Button, Modal, Form, Switch , Tooltip } from 'antd';
import FollowButton from '../Modal/FollowButton';
import usePOST from '../../AuthCommunicate/POST';


// id, email, username, profile_image, is_following, following_cnt, follower_cnt, bookmark_cnt 넘어옴
export default function UserDrawer({ isOpen, onClose, userProfile, urls, urlList }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { fetchData: postFetchData, data: postData, error: postError } = usePOST();
  const [form] = Form.useForm();
  const handleAddButtonClick = (url) => {
    setSelectedUrl(url);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setSelectedUrl('');
    setModalVisible(false);
  };

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    const formData = {
      type: 'string',
      title: values.title,
      url: selectedUrl,
      is_public: values.is_public,
    };
    
  
    await postFetchData('/bookmark/', formData);
    form.resetFields(); // Reset the form fields
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
                    <Button onClick={() => handleAddButtonClick(url)} type="primary" size="small" disabled={isUrlInList}>
                      Add
                    </Button>
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
      <Modal
        visible={modalVisible}
        onCancel={handleModalClose}
        onOk={handleSubmit}
        onFinish={handleSubmit}
        title="Add Data"
        
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
                message: 'Please enter a title',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="url" label="URL">
            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              <Input value={selectedUrl} disabled addonAfter={selectedUrl} />
            </div>
          </Form.Item>
          <Form.Item name="is_public" label="Is Public" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
      {isSubmitting && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: 'rgba(0, 0, 0, 0.1)',
                        zIndex: 9999,
                    }}
                >
                    <Spin size="large" />
                </div>
            )}
    </>
  );
};


