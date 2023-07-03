import React from 'react';
import { Button } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';

const ScrollToTopButton = ({ visible, scrollToTop }) => {

  return (
    <div>
      {visible && (
        <Button type="primary" shape="circle" size="large" onClick={scrollToTop} 
        style={{ position: 'fixed', right: '40px', bottom: '40px', zIndex: 9999, 
        justifyContent: 'center', alignItems: 'center',
        borderColor: '#3170c7', backgroundColor: 'white' }}>
          <ArrowUpOutlined style={{ color: '#3170c7', fontSize: '24px' }}/>
        </Button>
      )}
    </div>
  );
};

export default ScrollToTopButton;