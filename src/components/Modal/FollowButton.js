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
    }, [user_id]);


    const handleFollowToggle = async () => {
        try {
            const config = {
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg4NTQyMzU4LCJpYXQiOjE2ODcyNDYzNTgsImp0aSI6ImI2YTU0OWJkOWQxYTQzMWFhNDE3NmFmMmFmMjVjYjQ2IiwidXNlcl9pZCI6MiwidXNlcm5hbWUiOiJcdWQxNGNcdWMyYTRcdWQyYjgwMyJ9.cTZokEPKCxNTo6S-BXdv2pRakGRlnIBqzWAGHQKI6Nk',
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({ user_id: user_id })
                // body: {
                //     user_id: user_id
                // }
            };
            console.log(config)

            if (isFollowing) {
                // 언팔로우 API 호출
                const response = await axios.delete('http://kt-aivle.iptime.org:40170/api/follows/', config);
                console.log(response.data.message);
                setIsFollowing(false);
            } else {
                // 팔로우 API 호출
                const response = await axios.post('http://kt-aivle.iptime.org:40170/api/follows/', config);
                console.log(response.data.message);
                setIsFollowing(true);

            }
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <Button onClick={handleFollowToggle}>
            {isFollowing ? 'Following' : 'Follow'}
        </Button>
    );
};



            // state로 처리하면 되니까 굳이 통신할 필요 없는듯.....이 코드는 원래 fetchFollowStatus안에 들어가는 코드였음.
            // try {
            //     const config = {
            //         headers: {
            //             Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg4NTQyMzU4LCJpYXQiOjE2ODcyNDYzNTgsImp0aSI6ImI2YTU0OWJkOWQxYTQzMWFhNDE3NmFmMmFmMjVjYjQ2IiwidXNlcl9pZCI6MiwidXNlcm5hbWUiOiJcdWQxNGNcdWMyYTRcdWQyYjgwMyJ9.cTZokEPKCxNTo6S-BXdv2pRakGRlnIBqzWAGHQKI6Nk',
            //         },

            //     };

            //     const response = await axios.get('http://kt-aivle.iptime.org:40170/api/follows/', config);
            //     if (response.status === 200) {
            //         // const followingList = response.data.following;
            //         // const isUserFollowing = followingList.some(item => item.id === user_id);
            //         setIsFollowing(user_isFollowing);

            //     }
            //     else {
            //         console.error('Failed to fetch user profile');
            //     }
            // } catch (error) {
            //     console.error(error);
            // }