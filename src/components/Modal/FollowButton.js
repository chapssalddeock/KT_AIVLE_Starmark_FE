import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'antd';

const FollowButton = ({ userId, isFollowing, toggleFollow }) => {
    const [isFollowingState, setIsFollowingState] = useState(isFollowing);
  
    const handleFollowToggle = async (e) => {
      e.preventDefault();
      console.log('팔로우 함수 호출');
  
      try {
        const config = {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg3MjQzMjU3LCJpYXQiOjE2ODcyMzcyNTcsImp0aSI6ImE0ZTRmOWU0ZTIxYTRhODU5NGFjZDZhYzE3MDJhNmEzIiwidXNlcl9pZCI6MiwidXNlcm5hbWUiOiJcdWM3NzRcdWM1OGZcdWQ2MzgifQ.ac9t8q2uJ9ddor756qa-y1sAIljmCN_LilEv13Yde18',
          },
          params: {
            user_id: userId,
          },
        };
  
        if (isFollowingState) {
          // 언팔로우
          await axios.delete('http://kt-aivle.iptime.org:40170/api/follows/', config);
          setIsFollowingState(false);
        } else {
          // 팔로우
          await axios.post('http://kt-aivle.iptime.org:40170/api/follows/', config);
          setIsFollowingState(true);
        }
  
        // 팔로우 상태 변경 후, toggleFollow 함수를 호출하여 부모 컴포넌트의 상태를 업데이트합니다.
        toggleFollow();
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <Button onClick={handleFollowToggle}>
        {isFollowingState ? 'UnFollow' : 'Follow'}
      </Button>
    );
  };
  
  export default FollowButton;