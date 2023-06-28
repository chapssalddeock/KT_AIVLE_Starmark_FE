import styled from '@emotion/styled';

export const BgLayout = styled.div`
  background-image: url(/img/BG.jpg);
  background-size: cover; /* 이미지를 가능한 한 크게 확대하여 채움 */
  background-position: center; /* 이미지를 가운데로 정렬 */
  height: calc(100vh - 76px); /* 뷰포트의 높이에서 NavBar의 높이(76px)를 뺀 값으로 높이 설정 */
`



export const BackgroundPage = styled.div`
  height: 100vh;
`

export const SignUpFrame = styled.div`
  background-color: white; /* 배경을 흰색으로 설정 */
  border-radius: 30px;
  width :  35%;
  height : 65%;
  position : relative;
  left : 55%; 
  top : 10%;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* 그림자 효과 추가 */
`

export const AlertSpace = styled.div`
  width : 100%;
  height : 10%;
  float : right;
  align-items: center;
`


export const TitleSpace = styled.div`
    width : 100%;
    height : 10%;
    float : right;
    align-items: center;
    // border : solid yellow;
`

export const SingUpTitle = styled.div`
    display: flex;
    justify-content: center;
    font-weight : bold;
    font-size: 24px;
    position : relative;
    top : 0%;
`

export const InputSpace = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column; // 수직 방향으로 정렬
  align-items: center; // 세로 중앙 정렬
  justify-content: center; // 가로 중앙 정렬
  //border : solid red;
    
`