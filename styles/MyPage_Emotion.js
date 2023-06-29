import styled from '@emotion/styled';


// export const MainFrame = styled.div`
//   height: calc(100vh - 100px); /* 뷰포트의 높이에서 NavBar의 높이(76px)를 뺀 값으로 높이 설정 */
//   /* background-color: #5eacf2; */
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border: solid red;
// `

// export const ImgFrame = styled.div`

//   border : solid blue;
//   position : relative;
//   width :  300px;
//   height : 300px;
//   left : 50vh; 
//   bottom: 10vh;

// `

// export const TitleFrame = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border: solid;


// `



export const MainFrame = styled.div`
  width: 100%;
  height: 100%;
  border: solid;
  position : relative;

`
export const ImgFrame = styled.div`
  width :  300px;
  height : 300px;
  border: solid red;
  position : sticky;
  left: 70%;
  bottom: 30%;

`
export const TitleFrame = styled.div`
  width: 70%;
  height: 20%;
  position : sticky;
  bottom: 30%;
  border: solid blue;
`

export const ContentFrame = styled.div`
  width: 60%;
  height: 60%;
  position : sticky;
  bottom: 20%;
  border: solid yellow;
`
