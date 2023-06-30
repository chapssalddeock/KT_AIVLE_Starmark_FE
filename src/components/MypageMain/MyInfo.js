import { useState, useEffect, useRef } from 'react';
import { MainFrame, ImgFrame, TitleFrame, ContentFrame, ImgChangeButton, Frame } from '../../../styles/MyPage_Emotion';
import useGET from '../../AuthCommunicate/GET';
import usePUT from '../../AuthCommunicate/PUT';
import usePOST from '../../AuthCommunicate/POST';
import { List, Button, Input, Form } from 'antd';

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
                    <TitleFrame>My Information</TitleFrame>
                    <ImgFrame>
                        <img src={info.profile_image} style={{ width: 300, height: 300, borderRadius: 150 }} alt="Profile" />
                    </ImgFrame>
                    <ImgChangeButton>
                        <input type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef} style={{ display: 'none' }} />
                        <Button onClick={handleButtonClick}>Change Profile Picture</Button>
                    </ImgChangeButton>
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
                                <Button type="primary" onClick={handleSaveClick}>Save</Button>
                                <Button onClick={handleCancelClick}>Cancel</Button>
                            </div>
                        ) : (
                            <div>
                                <List
                                    dataSource={dataList}
                                    renderItem={({ label, key }) => (
                                        <List.Item key={key}>
                                            <p>
                                                {label}<br />
                                                {info[key]}
                                            </p>
                                        </List.Item>
                                    )}
                                />
                                <Button type="primary" onClick={handleEditClick}>Edit</Button>
                            </div>
                        )}
                    </ContentFrame>
                </MainFrame>
            </Frame>
        </>
    );
}

