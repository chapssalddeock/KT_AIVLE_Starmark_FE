import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Popover, Button, Collapse  } from 'antd';

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

export const Title = styled.div`
    ${normalFontStyles}
    font-family: 'KOTRA_GOTHIC';
    font-size: 2.5vmin;
`

export const TitleContent = styled.div`
    font-family: 'KOTRA_GOTHIC';
    font-size: 2vmin;
`

export const StylePanel = styled(Collapse.Panel)`
  ${normalFontStyles}
  font-family: 'KOTRA_GOTHIC';
  font-size: 1.9vmin;

  &&& .ant-collapse-header {
    &:hover {
      background-color: #d1ebfe;
      color: blue;
    }
  }
`

export const StyledScrollbar = styled(Collapse)`
  /* 스크롤바 전체 스타일 */
  &::-webkit-scrollbar {
    width: 5px;
  }

  /* 스크롤 막대 스타일 */
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 4px;
  }

  /* 스크롤 막대 외부 스타일 */
  &::-webkit-scrollbar-track {
    background-color: none;
    border-radius: 4px;
  }
`

