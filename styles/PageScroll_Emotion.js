import styled from '@emotion/styled';
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

export const Outer = styled.div`
  height: 100vh;
  overflow-y: auto;
  `

const BasicInner = styled.div`
  display: flex;
  justify-content: center;
  // align-items: center;
`

export const UnderNavInner = styled(BasicInner)`
  background-color: '#fffff';
  height: calc(100vh - 76px); // 76
`

export const FirstImg = styled.div`
  width: 30%;
  height: 80%;
  
  position: relative;
  left: 50%;
  top: 10%;
  background-image: url(/img/Intro_IMG.jpg);
  background-size: 100% 100%;

  border-radius: 5%;

`

export const Title = styled.div`
  ${fontFaceStyles}
  font-family: 'KOTRA_BOLD-Bold';
  color : #5eacf2;
  font-size: 50px;  

  width: 400px;
  height: 250px;

  position: relative;
  right: 25%;
  top: 12%;

  // border : solid;
`

export const Content = styled.div`
  ${normalFontStyles}
  font-family: 'KOTRA_GOTHIC';
  font-size: 15px;

  width: 400px;
  height: 100px;

  position: relative;
  right: 51%;
  top: 65%;
  // text-align: center;

  // border: solid;
`

export const ActiveInner2 = styled(BasicInner)`
  height: 100vh;
  
`

export const SecondImg = styled.div`
  width: 30%;
  height: 75%;
  
  position: relative;
  top: 15%;
  background-image: url(/img/Intro_Search.png);
  background-size: 100% 100%;

  border-radius: 5%;

`

export const SecondTitle = styled.div`
  ${fontFaceStyles}
  font-family: 'KOTRA_BOLD-Bold';
  color : #5eacf2;
  font-size: 50px;  

  width: 400px;
  height: 250px;

  position: relative;
  left: 25%;
  top: 20%;

  // border : solid;
`

export const SecondContent = styled.div`
  ${normalFontStyles}
  font-family: 'KOTRA_GOTHIC';
  font-size: 15px;

  width: 400px;
  height: 100px;

  position: relative;
  top: 65%;
  // text-align: center;

  // border: solid;
`

export const ActiveInner3 = styled(BasicInner)`
  height: 100vh;
  
`
export const ThirdImg = styled.div`
  width: 30%;
  height: 75%;
  
  position: relative;
  left: 50%;
  top: 15%;
  background-image: url(/img/Social_Media.png);
  background-size: cover;

  border-radius: 5%;

`

export const ThirdTitle = styled.div`
  ${fontFaceStyles}
  font-family: 'KOTRA_BOLD-Bold';
  color : #5eacf2;
  font-size: 50px;  

  width: 400px;
  height: 250px;

  position: relative;
  right: 25%;
  top: 20%;

  // border : solid;
`

export const ThirdContent = styled.div`
  ${normalFontStyles}
  font-family: 'KOTRA_GOTHIC';
  font-size: 15px;

  width: 400px;
  height: 100px;

  position: relative;
  right: 51%;
  top: 65%;
  // text-align: center;

  // border: solid;
`


export const ActiveInner4 = styled(BasicInner)`
  height: 100vh;
  
`

export const Divider = styled.div`
  width : 100%;
  height : 3px;
  background-color : gray;
`
export const BgLayout = styled.div`
  background-image: url(/img/BG.jpg);
  background-size: cover; /* 이미지를 가능한 한 크게 확대하여 채움 */
  background-position: center; /* 이미지를 가운데로 정렬 */
  height: 100%/*calc(100vh - 76px); 뷰포트의 높이에서 NavBar의 높이(76px)를 뺀 값으로 높이 설정*/

// export const PageBackGround = styled.div`
//   // border: solid;
//   width: 100%;
//   height: 100%;
//   background-color: #63a3dc;

//   // position : relative;
//   // left: 10%;
  
// `
// export const Wave = styled.div`
//   position : relative;
//   top: 83%;
// `

// export const PageDark = styled.div`
//   // border: solid red;

//   position : relative;
//   bottom: 16%;
//   width: 100%;
//   height: 100%;;
//   background-color: rgba(0, 0, 0, 0.0);
// `

// export const Title = styled.div`
//   ${fontFaceStyles}
//   font-family: 'KOTRA_BOLD-Bold';
//   color : white;
//   font-size: 50px;

//   width: 60%;
//   height: 15%;
//   margin: 0;
  
//   position: relative;
//   left: 25%;
//   top: 30%;
  
// `

// export const Content = styled.div`
//   ${normalFontStyles}
//   font-family: 'KOTRA_GOTHIC';
//   color : white;
//   font-size: 20px;

//   position: relative;
//   // left: 40%;
//   top: 40%;
//   text-align: center;
// `