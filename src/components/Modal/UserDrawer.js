import React, { useState } from 'react';
import { Drawer } from 'antd';



export default function UserDrawer({ isOpen, onClose, userProfile }) {


  return (
    <>
      <Drawer
        width={720}
        onClose={onClose}
        open={isOpen}
        bodyStyle={{
          paddingBottom: 80,
        }}
      >
        {userProfile && (
          <div>
            <div className="site-description-item-profile-p">
              <Avatar src={userProfile.picture.large} size={80} />
              <span style={{ marginLeft: 10 }}>{userProfile.name.last}</span>
            </div>
            <div>
              <strong>UserName:</strong> {userProfile.name}
            </div>
            <div>
              <strong>Email:</strong> {userProfile.email}
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


