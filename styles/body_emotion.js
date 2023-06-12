import styled from '@emotion/styled';

export const Outer = styled.div`
  height: 100vh;
  overflow-y: auto;
  `

export const Inner = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color : ${(props) => props.bgColor};
`

export const InnerNav = styled.div`
  height: calc(100vh - 85.6px);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color : #f7f6cf;
`

export const Divider = styled.div`
  width : 100%;
  height : 1px;
  background-color : gray;
`