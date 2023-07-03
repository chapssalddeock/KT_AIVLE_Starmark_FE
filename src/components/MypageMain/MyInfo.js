import { useState, useEffect, useRef } from 'react';
import { MainFrame, ImgFrame, ContentFrame, ImgChangeButton, Frame, ImgMainFrame, normalFontStyles } from '../../../styles/MyPage_Emotion';
import useGET from '../../AuthCommunicate/GET';
import usePUT from '../../AuthCommunicate/PUT';
import usePOST from '../../AuthCommunicate/POST';
import { List, Button, Input, Form } from 'antd';
import { Global } from "@emotion/react";

const dataList = [
    { label: 'Username', key: 'username' },
    { label: 'Email', key: 'email' },
    { label: 'Bookmark Count', key: 'bookmark_cnt' },
    { label: 'Follower Count', key: 'follower_cnt' },
    { label: 'Following Count', key: 'following_cnt' },
];

export default function MyInfo() {
    const [info, setInfo] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isImageUploaded, setIsImageUploaded] = useState(false);

    const { fetchData: getFetchData, data: getData, error: getError } = useGET();
    const { fetchData: putFetchData, data: putData, error: putError } = usePUT();
    const { fetchData: postFetchData, data: postData, error: postError } = usePOST();

    // 기본정보 불러오기
    const fetchData = async () => {
        const config = {
            params: {
                user_id: 0,
            },
        };
        await getFetchData('/userinfo/', config);
    };

    useEffect(() => {
        if (getData) {
            setInfo(getData);
        } else if (getError) {
            console.error(getError);
        }
    }, [getData, getError]);

    useEffect(() => {
        fetchData();
    }, []);


    // 기본정보 수정
    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        const updatedData = {
            target: 'username',
            username: info.username,
        };
        await putFetchData('/userinfo/', updatedData);
    };

    useEffect(() => {
        if (putData) {
            setIsEditing(false);
        } else if (putError) {
            console.log(putError);
        }
    }, [putData, putError]);

    const handleInputChange = (key, value) => {
        setInfo((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };


    /// 이미지
    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
            uploadImage(selectedImage);
        }
    };

    const uploadImage = async (image) => {
        const formData = new FormData();
        formData.append('profile_image', image);

        try {
            await postFetchData('/profile_img/', formData);
            setIsImageUploaded(true);
        } catch (error) {
            console.error('Image upload failed:', error);
        }
    };

    useEffect(() => {
        if (isImageUploaded) {
            window.location.reload(); // 프로필 사진이 업로드된 후 페이지 새로고침
        }
    }, [isImageUploaded]);

    return (
        <>
            <Frame>
                <MainFrame>
                    <Global styles={normalFontStyles} ></Global>
                    <ImgMainFrame>
                        <ImgFrame>
                            <img src={info.profile_image} style={{ width: 300, height: 300, borderRadius: 150 }} alt="Profile" />
                        </ImgFrame>
                        <ImgChangeButton>
                            <input type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef} style={{ display: 'none' }} />
                            <Button onClick={handleButtonClick} style={{ borderRadius: 30 }}>Change Profile Picture</Button>
                        </ImgChangeButton>
                    </ImgMainFrame>
                    <ContentFrame>

                        {isEditing ? (
                            <div>
                                <Form layout="vertical">
                                    {dataList.map(({ label, key }) => (
                                        <Form.Item key={key} label={label} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                            {key === 'username' ? (
                                                <Input value={info[key]} onChange={(e) => handleInputChange(key, e.target.value)} />
                                            ) : (
                                                <span>{info[key]}</span>
                                            )}
                                        </Form.Item>
                                    ))}
                                </Form>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 100 }}>
                                    <Button type="primary" onClick={handleSaveClick} style={{ borderRadius: 30, marginRight: 20 }}>Save</Button>
                                    <Button onClick={handleCancelClick} style={{ borderRadius: 30 }}>Cancel</Button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <List
                                    dataSource={dataList}
                                    renderItem={({ label, key }) => (
                                        <List.Item key={key}>
                                            <p>
                                                <strong style={{ fontWeight: 'bold' }}>{label}</strong> | <br />
                                                {info[key]}
                                            </p>
                                        </List.Item>
                                    )}
                                />
                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button type="primary" onClick={handleEditClick} style={{ borderRadius: 30 }}>Edit</Button>
                                </div>
                            </div>
                        )}
                    </ContentFrame>
                </MainFrame>
            </Frame>
        </>
    );
}

