import styled from '@emotion/styled';
import {  Form, Input, Badge } from 'antd';
import { css } from '@emotion/react';

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

// 메인 테두리
export const CustomerPage = styled.div`
    width :  28vw;
    height : 50vh;
    position : relative;
    left : 35%; 
    top : 25%;
    background-color: white; /* 배경을 흰색으로 설정 */
    border-radius: 30px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); /* 그림자 스타일을 설정합니다 */

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

export const TitleSpace = styled.div`

    width : 100%;
    height : 25%;
    
    // border : solid yellow;
`
export const LoginTitle = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
    font-size: 4vmin;
    font-weight : bold;
    
    width: 100%;
    height: 60%;
    position : relative;
    top: 20%;

    // border: solid blue;
`

export const AlertSpace = styled.div`
  width : 100%;
  height : 30%;
  padding: 0 10% 0 10%;
  float : right;
  align-items: center;
  // border: solid;
`

export const InputSpace = styled.div`

    width : 100%;
    height : 75%;
    float : right;
    display: flex;
    justify-content: center;
    align-items: center;

    // border : solid red;
    
`

export const CustomForm = styled(Form)`
  width: 80%; /* 원하는 너비로 조정 */
  height: 100%;
  // border: solid green;
`

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

export const GoRegister = styled.div`
  ${normalFontStyles}
  font-family: 'KOTRA_GOTHIC';
  font-size: 1.9vmin;
`
