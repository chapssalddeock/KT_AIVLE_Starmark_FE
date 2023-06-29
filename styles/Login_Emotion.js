import styled from '@emotion/styled';
import { Button, Form, Input } from 'antd';
import { css } from '@emotion/react';

const normalFontStyles = css`
  @font-face {
    font-family: 'KOTRA_GOTHIC';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10-21@1.0/KOTRA_GOTHIC.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
`


// 메인 테두리
export const CustomerPage = styled.div`
    //border : solid;
    width :  35%;
    height : 60%;
    position : relative;
    left : 50vh; 
    top : 20%;
    background-color: white; /* 배경을 흰색으로 설정 */
    border-radius: 30px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); /* 그림자 스타일을 설정합니다 */

`

export const TitleSpace = styled.div`

    width : 100%;
    height : 20%;
    align-items: center;
    border : solid yellow;
`
export const LoginTitle = styled.div`
    ${normalFontStyles}
    font-family: 'KOTRA_GOTHIC';
    color : #5eacf2;
    font-size: 20px;
    
    display: flex;
    justify-content: center;
    font-weight : bold;
    position : relative;
    top : 40%;

    // border: solid blue;
`

export const InputSpace = styled.div`

    width : 100%;
    height : 60%;
    float : right;
    display: flex;
    justify-content: center;
    align-items: center;
    border : solid red;
    
`

export const CustomForm = styled(Form)`
  width: 80%; /* 원하는 너비로 조정 */

`;

export const ButtonDesign = styled(Button)`

    width :100%;
    float : right;
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
