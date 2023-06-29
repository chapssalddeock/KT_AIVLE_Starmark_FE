// 필요한 기능
// 1. 현재 자기가 가진 프사, 닉네임, 이메일, 팔로워수, 북마크수 등 표시
// 2. 이미지랑 닉네임은 수정이 가능하도록 서버와 통신
import { useState, useEffect } from 'react';
import { MainFrame, ImgFrame, TitleFrame, ContentFrame, ImgChangeButton } from '../../../styles/MyPage_Emotion';
import useGET from '../../AuthCommunicate/GET';

export default function MyInfo() {

    const [data, setData] = useState([]);
    const { fetchData: getFetchData, data: getData, error: getError } = useGET();

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


    return (

        <>
            <MainFrame>
                <TitleFrame>
                    My Infomation
                </TitleFrame>
                <ImgFrame>
                    <img src={data.profile_image} style={{ width: 300, height: 300 }}></img>
                </ImgFrame>
                <ImgChangeButton></ImgChangeButton>
                <ContentFrame></ContentFrame>
            </MainFrame>

        </>

    );
}