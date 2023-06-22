import React, { useState } from 'react';
import { Drawer, Avatar } from 'antd';
import FollowButton from '../Modal/FollowButton';



// id, email, username, profile_image, is_following, following_cnt, follower_cnt, bookmark_cnt 넘어옴
export default function UserDrawer({ isOpen, onClose, userProfile }) {


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


