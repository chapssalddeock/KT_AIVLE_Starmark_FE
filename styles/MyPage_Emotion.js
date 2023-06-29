import styled from '@emotion/styled';


export const MainFrame = styled.div`
  width: 100%;
  height: 100%;
  /* border: solid; */
  position : relative;
`
export const ImgFrame = styled.div`
  width :  300px;
  height : 300px;
  border: solid red;
  position : sticky;
  left: 75%;
  bottom: 30%;

`


export const ImgChangeButton = styled.button`
  width :  300px;
  height: 50px;
  position : sticky;
  left: 75%;
  bottom: 15%;
  border: solid blue;

  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  
`


export const TitleFrame = styled.div`
  width: 60%;
  height: 20%;
  position : sticky;
  bottom: 30%;
  left: 25%;
  //border: solid blue;

  display: flex;
  align-items: flex-end;
  text-align: left;

  //justify-content: center;
  font-weight : bold;
  font-size: 28px;
`



export const ContentFrame = styled.div`
  width: 60%;
  height: 60%;
  position : sticky;
  bottom: 20%;
  left: 25%;
  border: solid yellow;
`
