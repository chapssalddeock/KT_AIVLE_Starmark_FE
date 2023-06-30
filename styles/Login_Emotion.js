import styled from '@emotion/styled';
import {  Form } from 'antd';
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
    width :  35%;
    height : 55vh;
    position : relative;
    left : 30%; 
    top : 20%;
    background-color: white; /* 배경을 흰색으로 설정 */
    border-radius: 30px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); /* 그림자 스타일을 설정합니다 */

`

export const TitleSpace = styled.div`

    width : 100%;
    height : 30%;
    
    // border : solid yellow;
`
export const LoginTitle = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
    font-family: 'KOTRA_BOLD-Bold';
    color : #5eacf2;
    font-size: 3vmin;
    
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
    height : 70%;
    float : right;
    display: flex;
    justify-content: center;
    align-items: center;
    // border : solid red;
    
`

export const CustomForm = styled(Form)`
  width: 90%; /* 원하는 너비로 조정 */
  height: 100%;
  // border: solid green;
`

export const GoRegister = styled.div`
  font-family: 'KOTRA_GOTHIC';
  font-size: 1.9vmin;
`
