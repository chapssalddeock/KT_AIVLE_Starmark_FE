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
export const MainBlock = styled.div`
  width: 40%;
  height: 50%;
  border-radius: 30px;
  //border: solid;
  background-color: white; /* 배경을 흰색으로 설정 */
  position : relative;
  left : 32%; 
  top : 15%;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* 그림자 효과 추가 */
`
export const AlertPart = styled.div`
  width: 100%;
  height: 30%;
  /* border: solid red; */
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight : bold;
  font-size: 24px;

`
export const Content = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  position : relative;
  top : 10%;
  text-align: center;
  /* display: flex;
  align-items: center;
  justify-content: center; */
  /* border: solid yellow; */
`
export const ButtonBlock = styled.div`
  width: 20%;
  height: 20%;
  position : relative;
  left:40%;
  display: flex;
  align-items: center;
  justify-content: center;

  /* border: solid blue; */
`