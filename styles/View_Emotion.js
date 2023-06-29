import React from 'react';
import { Table, Tag } from 'antd';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const CustomTag = styled(Tag)`
  .ant-tag {
    border-radius: 20px;
    height: 24px;
    /* 원하는 색상으로 변경하세요 */
    background-color: #5eacf2;
    color: #5eacf2;
  }
`;





export const BgLayout = styled.div`
  height: calc(100vh - 76px); /* 뷰포트의 높이에서 NavBar의 높이(76px)를 뺀 값으로 높이 설정 */
`
