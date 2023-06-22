import styled from '@emotion/styled';

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
  
  background-image: url(/img/Intro_BG1.jpg);
  background-size: 1400px;
  height: calc(100vh - 76px); // 76
`

export const ActiveInner2 = styled(BasicInner)`
  height: 100vh;
  background-image: url(/img/Intro_BG2.jpg);
  background-size: 100% ;
  
`

export const ActiveInner3 = styled(BasicInner)`
  height: 100vh;
  background-image: url(/img/Intro_BG3.png);
  background-size: 100% ;
`

export const ActiveInner4 = styled(BasicInner)`
  height: 100vh;
  background-image: url(/img/Login_BG.png);
  background-size: 1550px ;
  
`

export const Divider = styled.div`
  width : 100%;
  height : 1px;
  background-color : white;
`