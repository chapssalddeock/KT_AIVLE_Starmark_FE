import styled from '@emotion/styled';
import { css } from '@emotion/react';
import {  Form, Input, Badge } from 'antd';

const fontFaceStyles = css`
  @font-face {
    font-family: 'KOTRA_BOLD-Bold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10-21@1.1/KOTRA_BOLD-Bold.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
`

const normalFontStyles = css`
  @font-face {
    font-family: 'KOTRA_GOTHIC';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10-21@1.0/KOTRA_GOTHIC.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
`

export const BackgroundPage = styled.div`
  height: 100vh;
  background-image: url(/img/BG.jpg);
  background-size: cover; /* 이미지를 가능한 한 크게 확대하여 채움 */
  background-position: center; /* 이미지를 가운데로 정렬 */
  display: flex;
`

export const IMGFrame = styled.div`
  width: 50%;
  height: 100%;

  // border: solid;
`

export const RegisterFrame = styled.div`
  width: 50%;
  height: 100%;

  // border: solid yellow;
`

export const InputImg = styled.div`
  width: 30vw;
  height: 20vh;
  background-image: url(/img/Group_59.png);
  background-size: 100% 100%; /* 이미지를 가능한 한 크게 확대하여 채움 */
  background-position: center; /* 이미지를 가운데로 정렬 */
  margin: 0;

  position : relative;
  left : 10%; 
  top : 10%;

`

export const LeftRibbonBadge = styled(Badge.Ribbon)`
  // transform: scaleX(-1); /* 리본을 반전시킴 */

  display: flex;
  flex-direction: column; // 수직 방향으로 정렬
  align-items: center; // 세로 중앙 정렬
  justify-content: center; // 가로 중앙 정렬

  background-color: #4db4ff;

  width: 8vw;
  height: 5vh;
`;

export const RibbonText = styled.span`
  display: inline-block;
  color: white;
  font-size: 3vmin;
`;

export const SignUpFrame = styled.div`
  background-color: white; /* 배경을 흰색으로 설정 */
  border-radius: 30px;
  width :  30vw;
  height : 75vh;
  position : relative;
  left : 25%; 
  top : 5%;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* 그림자 효과 추가 */
`

export const TitleSpace = styled.div`
    width : 100%;
    height : 15%;
    float : right;
    align-items: center;
    
    // border : solid yellow;
`

export const AlertSpace = styled.div`
  width : 100%;
  height : 40%;
  padding: 0 10% 0 10%;
  float : right;
  align-items: center;
  
  // border: solid;
`

export const SingUpTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items : center;

  font-weight : bold;
  font-size: 4vmin;
  position : relative;

  width: 100%;
  height: 70%;
  position : relative;
  bottom: 20%;

  // border: solid green;
    
`

export const InputSpace = styled.div`
  width: 100%;
  height: 85%;
  display: flex;
  flex-direction: column; // 수직 방향으로 정렬
  align-items: center; // 세로 중앙 정렬
  justify-content: center; // 가로 중앙 정렬
  
  // border : solid red;
    
`

export const CustomForm = styled(Form)`
  height: 100%;
  
  // border: solid blue;
`;

export const CustomInput = styled(Input)`
  ${({ inputBackgroundColor }) => css`
    input {
      background-color: ${inputBackgroundColor};
    }
  `}
 `

export const CustomInputPassword = styled(Input.Password)`
  ${({ inputBackgroundColor }) => css`
    input {
      background-color: ${inputBackgroundColor};
    }
  `}
 `

export const OtherText = styled.span`
    font-size: 2vmin;
 `

export const GoHome = styled.div`
  width: 10vw;
  height: 5vh;
  position: relative;
  top: 7%;
  left: 65%;
`

export const GoButton = styled.button`
  font-size : 2.5vmin;
  font-weight : bold;

  border: none;
  background-color: transparent;
`
