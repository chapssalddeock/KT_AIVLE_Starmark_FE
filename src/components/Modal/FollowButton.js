import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'antd';


// 팔로우 여부 정보가 API에서 완성이 아직 안됨, 이걸 받고 END 시키기
const FollowButton = ({ userId }) => {
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        // 팔로우 상태를 서버에서 가져오는 API 호출
        fetchFollowStatus();
    }, []);

    const fetchFollowStatus = async () => {
        try {


            const config = {
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg4NTQyMzU4LCJpYXQiOjE2ODcyNDYzNTgsImp0aSI6ImI2YTU0OWJkOWQxYTQzMWFhNDE3NmFmMmFmMjVjYjQ2IiwidXNlcl9pZCI6MiwidXNlcm5hbWUiOiJcdWQxNGNcdWMyYTRcdWQyYjgwMyJ9.cTZokEPKCxNTo6S-BXdv2pRakGRlnIBqzWAGHQKI6Nk'
                },
                params: {
                    user_id: userId
                }
            }
            const response = await axios.get('http://kt-aivle.iptime.org:40170/api/follows/', config);
            const followStatus = response.data.isFollowing;
            setIsFollowing(followStatus);

        } catch (error) {
            console.error(error);
        }
    };




    const handleFollowToggle = async () => {
        try {
            const config = {
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg4NTQyMzU4LCJpYXQiOjE2ODcyNDYzNTgsImp0aSI6ImI2YTU0OWJkOWQxYTQzMWFhNDE3NmFmMmFmMjVjYjQ2IiwidXNlcl9pZCI6MiwidXNlcm5hbWUiOiJcdWQxNGNcdWMyYTRcdWQyYjgwMyJ9.cTZokEPKCxNTo6S-BXdv2pRakGRlnIBqzWAGHQKI6Nk',
                },
                params: {
                    user_id: userId,
                },
            };

            if (isFollowing) {
                // 언팔로우 API 호출
                await axios.delete('http://kt-aivle.iptime.org:40170/api/follows/', config);
                setIsFollowing(false);
            } else {
                // 팔로우 API 호출
                await axios.post('http://kt-aivle.iptime.org:40170/api/follows/', config);
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