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
  height: calc(100vh - 85.6px); // 76
  background-color : #f7f6cf;
`

export const ActiveInner = styled(BasicInner)`
  height: 100vh;
  background-color : ${(props) => props.bgColor};
`

export const Divider = styled.div`
  width : 100%;
  height : 1px;
  background-color : white;
`