// 필요한 기능
// 1. 현재 자기가 가진 프사, 닉네임, 이메일, 팔로워수, 북마크수 등 표시
// 2. 이미지랑 닉네임은 수정이 가능하도록 서버와 통신
import { useState, useEffect, useRef } from 'react';
import {
    MainFrame, ImgFrame, TitleFrame, ContentFrame, ImgChangeButton, Frame,
    GridContainer, FirstRow, SecondRow, ThirdRow, FourthRow
} from '../../../styles/MyPage_Emotion';
import useGET from '../../AuthCommunicate/GET';
import { List, Button, Input, Form } from 'antd';





const dataList = [
    { label: 'Username', key: 'username' },
    { label: 'Email', key: 'email' },
    { label: 'Bookmark Count', key: 'bookmark_cnt' },
    { label: 'Follower Count', key: 'follower_cnt' },
    { label: 'Following Count', key: 'following_cnt' },
];



export default function MyInfo() {

    const [data, setData] = useState([]); // 여기에 기본 정보가 들어감
    const [isEditing, setIsEditing] = useState(false); // 이건 기본정보 수정시에 필요한 state
    const { fetchData: getFetchData, data: getData, error: getError } = useGET();

    // 기본 정보 받아오는 파트
    const fetchData = async () => {
        //const config = {};
        //토큰은 자동이라 get에선 config가 필요없음
        const config = {
            params: {
                user_id: 0,
            },
        };
        await getFetchData('/userinfo/', config);
    };

    useEffect(() => {
        if (getData) {
            setData(getData);
        } else if (getError) {
            console.error(getError);
        }
    }, [getData, getError]);

    useEffect(() => {
        fetchData();
    }, []);

    console.log("확인용", data);


    ////// 기본 정보 수정 파트
    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        // put 통신 요청해서 수정한 뒤에 setIsEditing을 통해서 수정이 완료됨을 알림
        setIsEditing(false);
    };

    const handleInputChange = (e) => {
        setData(e.target.value);
    };

    // 수정 취소
    const handleCancelClick = () => {
        setIsEditing(false);
    };



    /////////////////// 프로필 이미지 변경
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
        formData.append('image', image);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const imageUrl = await response.text();
                // 이미지 업로드 성공 후 필요한 로직 처리
                console.log('Image uploaded successfully:', imageUrl);
            } else {
                // 이미지 업로드 실패 처리
                console.error('Image upload failed.');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };





    return (

        <>
            <Frame>
                <MainFrame>
                    <TitleFrame>
                        My Infomation
                    </TitleFrame>
                    <ImgFrame>
                        <img src={data.profile_image} style={{ width: 300, height: 300, borderRadius: 50 }}></img>
                    </ImgFrame>
                    <ImgChangeButton>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                        />
                        <Button onClick={handleButtonClick}>프로필 사진 변경</Button>
                    </ImgChangeButton>
                    <ContentFrame>
                        {isEditing ? (
                            <div>
                                <Form layout="vertical">
                                    {dataList.map(({ label, key }) => (
                                        <Form.Item key={key} label={label} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                            {key === 'username' ? (
                                                <Input defaultValue={data[key]} onChange={(e) => handleInputChange(key, e.target.value)} />
                                            ) : (
                                                <span>{data[key]}</span>
                                            )}
                                        </Form.Item>
                                    ))}
                                </Form>
                                <Button type="primary" onClick={handleSaveClick}>Submit</Button>
                                <Button onClick={handleCancelClick}>Cancel</Button>
                            </div>
                        ) : (
                            <div>
                                <List
                                    dataSource={dataList}
                                    renderItem={({ label, key }) => (
                                        <List.Item key={key}>
                                            <p>{label}<br />
                                                {data[key]}</p>
                                        </List.Item>
                                    )}
                                />
                                <Button type="primary" onClick={handleEditClick}>Edit</Button>
                            </div>
                        )}
                    </ContentFrame>
                </MainFrame >
            </Frame>
        </>

    );
}