import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'antd';

export default function FollowButton({ user_isFollowing, user_id }) {
    const [isFollowing, setIsFollowing] = useState([]);

    useEffect(() => {
        const fetchFollowStatus = async () => {
            setIsFollowing(user_isFollowing);
        };
        fetchFollowStatus();
    }, [user_isFollowing]);

    const handleFollow = async (user_id) => {
        try {
            const config = {
                headers: {
                    Authorization:
                        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg4NTQyMzU4LCJpYXQiOjE2ODcyNDYzNTgsImp0aSI6ImI2YTU0OWJkOWQxYTQzMWFhNDE3NmFmMmFmMjVjYjQ2IiwidXNlcl9pZCI6MiwidXNlcm5hbWUiOiJcdWQxNGNcdWMyYTRcdWQyYjgwMyJ9.cTZokEPKCxNTo6S-BXdv2pRakGRlnIBqzWAGHQKI6Nk',
                    'Content-Type': 'application/json',
                },
            };

            // 팔로우 API 호출
            const response = await axios.post(
                'http://kt-aivle.iptime.org:40170/api/follows/',
                { user_id: user_id },
                config
            );
            console.log(response.data.message);
            setIsFollowing(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleUnfollow = async (user_id) => {
        try {
            const config = {
                headers: {
                    Authorization:
                        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg4NTQyMzU4LCJpYXQiOjE2ODcyNDYzNTgsImp0aSI6ImI2YTU0OWJkOWQxYTQzMWFhNDE3NmFmMmFmMjVjYjQ2IiwidXNlcl9pZCI6MiwidXNlcm5hbWUiOiJcdWQxNGNcdWMyYTRcdWQyYjgwMyJ9.cTZokEPKCxNTo6S-BXdv2pRakGRlnIBqzWAGHQKI6Nk',
                    'Content-Type': 'application/json',
                },
            };

            // 언팔로우 API 호출
            const response = await axios.delete(
                'http://kt-aivle.iptime.org:40170/api/follows/',
                { ...config, data: { user_id: user_id } }
            );
            console.log(response.data.message);
            setIsFollowing(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Button onClick={isFollowing ? () => handleUnfollow(user_id) : () => handleFollow(user_id)}>
            {isFollowing ? 'Following' : 'Follow'}
        </Button>
    );
};




