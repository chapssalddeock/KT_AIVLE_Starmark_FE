import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import usePOST from '../../AuthCommunicate/POST';
import useDELETE from '../../AuthCommunicate/DELETE';

export default function FollowButton({ user_isFollowing, user_id }) {
    const [isFollowing, setIsFollowing] = useState([]);
    const { fetchData : postFetchData, data: postData, error: postError } = usePOST();
    const { fetchData : deleteFetchData, data: deleteData, error: deleteError } = useDELETE();


    useEffect(() => {
        const fetchFollowStatus = async () => {
            setIsFollowing(user_isFollowing);
        };
        fetchFollowStatus();
    }, [user_isFollowing]);

    const handleFollow = async (user_id) => {
        console.log(user_id);
        await postFetchData('/follows/', { user_id:  user_id});
    };

    useEffect(() => {
        if (postData) {
            console.log(postData);
            setIsFollowing(true);
        } else if (postError) {
            console.error(postError);
        }
    }, [postData, postError]);

    const handleUnfollow = async (user_id) => {
        const config = { data: { user_id: user_id } };
        await deleteFetchData('/follows/', config);
    };

    useEffect(() => {
        if (deleteData) {
            console.log(deleteData);
            setIsFollowing(false);
        } else if (deleteError) {
            console.log(deleteError);
        }
    }, [deleteData, postError]);


    return (
        <Button onClick={isFollowing ? () => handleUnfollow(user_id) : () => handleFollow(user_id)}>
            {isFollowing ? 'Following' : 'Follow'}
        </Button>
    );
};