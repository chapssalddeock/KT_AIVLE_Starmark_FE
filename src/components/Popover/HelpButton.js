import React, { useState } from 'react';
import AuthManager from '../../AuthContext/AuthManager';
import { Popover, Button, Collapse } from 'antd';
import { QuestionCircleFilled } from '@ant-design/icons';
import { Title, TitleContent, StylePanel, StyledScrollbar } from '../../../styles/HelpButton_Emotion';


const HelpButton = ({ page }) => {
  const { UserInfo } = AuthManager();
  const [info, setInfo] = useState('');
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [popoverHeight, setPopoverHeight] = useState('30vh');

  const fetchData = () => {
    const value = UserInfo();
    setInfo(value);
  };

  const text = (
    <div>
      <Title>안녕하세요! {info}님 </Title>
      <TitleContent>함께 하게 되서 반갑습니다! <br />
        여기에서 필요할 때마다 도움말을 찾을 수 있습니다  </TitleContent>
    </div>
  );

  const CustomContent = () =>
  page === 'service' ? (
    <StyledScrollbar style={{ maxHeight: '40vh', maxWidth: '25vw', overflowY: 'auto' }}>
      <StylePanel header="이 서비스에 대해" key="1">
          사용자가 자신의 북마크를 등록하고 볼 수 있는 페이지입니다.<br/>
          북마크를 등록하면 각 북마크 별로 태그가 생성되고 <br/>어떤 내용인지 요약문을 볼 수 있습니다.
      </StylePanel>
      <StylePanel header="북마크 추가하기" key="2">
          (ADD)를 누르면 북마크를 추가할 수 있습니다. <br />
          북마크는 개별로 URL를 사용해 등록하거나 <br />각 브라우저에서 제공하는 '북마크 가져오기'를 <br />
          사용하여 HTML 파일을 받아서 등록할 수 있습니다.
      </StylePanel>
      <StylePanel header="북마크 사용하기" key="3">
        등록한 북마크는 태그와 요약이 생성됩니다. <br />
        각 북마크별 생성된 태그를 사용해서 검색 창에 태그를 <br/>검색하면 태그와 관련된 북마크가 분류되어 보여집니다. <br />
        목차나 썸네일로 보고 싶으면 오른쪽 위의 버튼으로 <br/>볼 수 있습니다.
      </StylePanel>
    </StyledScrollbar>
  ) : (
    <StyledScrollbar style={{ maxHeight: '40vh', maxWidth: '25vw', overflowY: 'auto' }}>
      <StylePanel header="이 서비스에 대해" key="1">
          사용자가 다른 사용자들을 찾을 수 있는 페이지 입니다.<br/>
          검색 창에 태그를 통해 다른 사용자들을 찾을 수 있습니다.
      </StylePanel>
      <StylePanel header="사용자 검색하기" key="2">
          사용자가 궁금해 하는 태그를 검색창에 검색하면 <br/>검색한 태그를 가지고 있는 다른 사용자들이 나타납니다<br/>
          다른 사용자들이 가지고 있는 북마크들을 확인해 보세요
      </StylePanel>
      <StylePanel header="다른 사용자 팔로우하기" key="3">
        찾은 다른 사용자들의 태그들을 빨리 찾고 확인해 보기 위해 <br/>팔로잉 해보세요!
        팔로잉 한 사용자들은 마이페이지에서도 <br/>볼 수 있습니다. 
        만약 팔로잉를 취소하고 싶다면 <br/>팔로잉 버튼을 눌러 취소하세요
      </StylePanel>
    </StyledScrollbar>
  );


  return (
    <Popover placement="topLeft" title={text} content={<CustomContent />}
      trigger="click"
      autoAdjustOverflow
    >
      <Button type="primary" shape="circle" onClick={fetchData}
        style={{
          position: 'fixed', right: '40px', bottom: '20px', zIndex: 5,
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          width: '5vh', height: '5vh',
          backgroundColor: '#3170c7',
        }}>
        <QuestionCircleFilled style={{ fontSize: '4vh' }} />
      </Button>
    </Popover>
  );
};

export default HelpButton