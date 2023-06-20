import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'antd';

const FollowButton = ({ userId, isFollowing, toggleFollow }) => {
    const [isFollowing, setIsFollowing] = useState(false);

    const handleFollowToggle = async (e) => {
        e.preventDefault();
        console.log('팔로우 함수 호출');

        try {
            if (isFollowing) {
                // 이미 팔로우한 상태라면 언팔로우 요청을 보냅니다.
                await axios.delete(`/api/follows/${userId}`);
                setIsFollowing(false);
            } else {
                // 아직 팔로우하지 않은 상태라면 팔로우 요청을 보냅니다.
                await axios.post(`/api/follows/${userId}`);
                setIsFollowing(true);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Button onClick={handleFollowToggle}>
            {isFollowing ? 'UnFollow' : 'Follow'}
        </Button>
    );
};

export default FollowButton;
