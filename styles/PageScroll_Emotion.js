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
`

export const UnderNavInner = styled(BasicInner)`
  background-color: '#fffff';
  height: calc(100vh - 76px); // 76
`

export const PageBackGround = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #04fafd, 5%, #119dff, 50%, #030423);  
`

export const Temp = styled.div`
  width: 100%;
  height: 68%;
`

export const Wave = styled.div`
  // position : relative;
  // top: 66%;
`

export const PageDark = styled.div`
  position : relative;
  bottom: 100%;
  width: 100%;
  height: 100%;;
  background-color: rgba(0, 0, 0, 0.0);
`

export const Title = styled.div`
  font-family: 'KOTRA_BOLD-Bold';
  color : white;
  font-size: 7vmin;
  text-align: center;

  width: 100%;
  height: 15%;
  margin: 0;
  
  position: relative;
  left: 0%;
  top: 30%;
`

export const Content = styled.div`
  ${normalFontStyles}
  font-family: 'KOTRA_GOTHIC';
  color : white;
  font-size: 3vmin;

  position: relative;
  top: 40%;
  text-align: center;
`

export const ActiveInner2 = styled(BasicInner)`
  height: 100vh;
`

export const ImgFrame = styled.div`
  width: 50%;
  height: 100vh;
  display : flex;
	justify-content: center;
  align-items : center;
`

export const FrameWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
`;

export const TitleFrame = styled.div`
  width: 100%;
  height: 50vh;

  position: relative;
`

export const ContentFrame = styled.div`
  width: 100%;
  height: 50vh;
`

export const SecondImg = styled.div`
  width: 60vh;
  height: 70vh;
  
  background-image: url(/img/Search_IMG.png);
  background-size: 100% 100%;
`


export const SecondTitle = styled.div`
  font-family: 'KOTRA_BOLD-Bold';
  font-size: 7vmin;
  text-align: right;
  color: #0080d7;
  
  width: 60vh;
  height: 30vh;

  position: absolute;
  bottom: 0%; /* 아래에 위치하도록 설정 */
  left: 15%; 

`

export const SecondContent = styled.div`
  ${normalFontStyles}
  font-family: 'KOTRA_GOTHIC';
  font-size: 2vmin;
  text-align: right;

  width: 60vh;
  height: 15vh;

  position: relative;
  left: 15%;
  top: 25%;
`

export const ActiveInner3 = styled(BasicInner)`
  height: 100vh;
  
`
export const ThirdImg = styled.div`
  width: 60vh;
  height: 70vh;
  
  background-image: url(/img/Social_Media.png);
  background-size: cover;

  border-radius: 5%;

`

export const ThirdTitle = styled.div`
  ${fontFaceStyles}
  font-family: 'KOTRA_BOLD-Bold';
  color : #0080d7;
  font-size: 7vmin;  

  width: 60vh;
  height: 30vh;

  position: absolute;
  bottom: 0;
  left: 25%;

`

export const ThirdContent = styled.div`
  ${normalFontStyles}
  font-family: 'KOTRA_GOTHIC';
  font-size: 2vmin;

  width: 60vh;
  height: 15vh;

  position: relative;
  left: 25%;
  top: 25%;
`


export const ActiveInner4 = styled(BasicInner)`
  height: 100vh;
  background-image: url(/img/BG.jpg);
  background-size: cover; /* 이미지를 가능한 한 크게 확대하여 채움 */
  background-position: center; /* 이미지를 가운데로 정렬 */
  display: flex;
 ` 



export const TagImgFrame = styled.div`
  width: 60%;
  height: 100%;
`

export const TagImg = styled.div`
  width: 30vw;
  height: 20vh;
  background-image: url(/img/Group_61.png);
  background-size: 100% 100%; /* 이미지를 가능한 한 크게 확대하여 채움 */
  background-position: center; /* 이미지를 가운데로 정렬 */
  margin: 0;

  position : relative;
  left : 10%; 
  top : 10%;
`

export const Square = styled.div`
  position: relative;
  left: 0%;
  width: 70%;
  height: 100vh;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #bde0f2;
    transform-origin: left bottom; /* 회전 중심을 왼쪽 아래로 지정 */
    transform: skew(-20deg); /* 왼쪽 편을 기울이는 회전 효과 */
  }

`

export const RectangleImg = styled.div`
  width: 40vw;
  height: 55vh;
  background-image: url(/img/Rectangle.png);
  background-size: 100% 100%; /* 이미지를 가능한 한 크게 확대하여 채움 */
  background-position: center; /* 이미지를 가운데로 정렬 */
  
  position: absolute;
  left: 20%;
  top: 40%;
  z-index: 0;
`

export const Bubble = styled.div`
  width: 15vw;
  height: 25vh;
  background-image: url(/img/bubble.png);
  background-size: 100% 100%; /* 이미지를 가능한 한 크게 확대하여 채움 */
  background-position: center; /* 이미지를 가운데로 정렬 */

  position: absolute;
  left: 70%;
  top: 12%;
`

export const Divider = styled.div`
  width : 100%;
  height : 3px;
  background-color : white;
`