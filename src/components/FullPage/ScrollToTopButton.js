import React from 'react';
import { Button } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';

const ScrollToTopButton = ({ visible, scrollToTop }) => {

  return (
    <div>
      {visible && (
        <Button type="primary" shape="circle" size="large" onClick={scrollToTop} 
        style={{ position: 'fixed', right: '40px', bottom: '40px', zIndex: 9999, borderColor: '#5eacf2', backgroundColor: 'white' }}>
          <ArrowUpOutlined style={{ color: '#5eacf2', fontSize: '24px' }}/>
        </Button>
      )}
    </div>
  );
};

export default ScrollToTopButton;