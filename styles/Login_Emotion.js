import styled from '@emotion/styled';
import { Button } from 'antd';

// 메인 테두리
export const CustomerPage = styled.div`
    //border : solid;
    width :  30%;
    height : 55%;
    position : relative;
    left : 25%; 
    top : 20%;
    background-color: white; /* 배경을 흰색으로 설정 */
    border-radius: 30px;
`

export const TitleSpace = styled.div`

    width : 100%;
    height : 25%;
    align-items: center;
    // border : solid yellow;
`
export const LoginTitle = styled.div`

    display: flex;
    justify-content: center;
    font-weight : bold;
    position : relative;
    top : 40%;
`


export const ButtonDesign = styled(Button)`

    width : 100%;
    float : right;
`

export const InputSpace = styled.div`

    width : 80%;
    height : 60%;
    float : right;
    // border : solid red;
    
`

export const TopScroll = styled.div`

    width : 100%;
    height : 15%;
    float : right;
    // border : solid green;

`

export const ClickToTop = styled.button`

    background-color: transparent;
    border: none;
    cursor: pointer;
    float : right;
`
