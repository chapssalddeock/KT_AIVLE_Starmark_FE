import styled from '@emotion/styled';

// MainFrame 정중앙 위치용
export const Frame = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const MainFrame = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr; /* 2열로 설정 */
  grid-template-rows: auto; /* 1행으로 설정 */
  grid-gap: 0; /* border들이 딱 붙도록 0으로 설정 */
  width: calc(100vw - 400px);
  height: calc(100vh - 150px);
  border: solid;
  margin-top: 30px;
`;

export const ImgFrame = styled.div`
  grid-column: 1; /* 1열로 배치 */
  width: 300px;
  height: 300px;
  /* border: solid red; */
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  margin: auto; /* 중앙 정렬을 위한 margin 설정 */
  margin-bottom: 0; /* 하단 마진 제거 */
  margin-top: 10px; /* 상단 마진 추가 */
`;

export const ImgChangeButton = styled.div`
  grid-column: 1; /* 1열로 배치 */
  width: 300px;
  height: 50px;
  /* border: solid blue; */
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  margin-top: 10px; /* 상단 마진 추가 */
  margin-bottom: 0; /* 하단 마진 제거 */
  margin-left: auto; /* 왼쪽 마진을 auto로 설정하여 정중앙에 위치 */
  margin-right: auto; /* 오른쪽 마진을 auto로 설정하여 정중앙에 위치 */
`;

export const TitleFrame = styled.div`
  grid-column: 1; /* 1열로 배치 */
  width: 300px;
  height: 50px; /* TitleFrame의 내용에 맞게 자동 조정 */
  /* border: solid blue; */
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  font-weight: bold;
  font-size: 28px;
  margin-bottom: 0; /* 하단 마진 제거 */
  margin-top: 10px; /* 상단 마진 추가 */
  margin-left: auto; /* 왼쪽 마진을 auto로 설정하여 정중앙에 위치 */
  margin-right: auto; /* 오른쪽 마진을 auto로 설정하여 정중앙에 위치 */
`;




export const ContentFrame = styled.div`
  grid-column: 2; /* 2열로 배치 */
  grid-row: 1 / span 2; /* 1행부터 2행까지 확장 */
  width: 40vw;
  height: 40vh;
  /* border: solid yellow; */
  margin-top: 60px;
  //margin: auto; /* 중앙 정렬을 위한 margin 설정 */
  
`;



export const FollowerFrame = styled.div`
  grid-column: 1; /* 1열로 배치 */

`


export const FollowingFrame = styled.div`
  grid-column: 2; /* 2열로 배치 */

`