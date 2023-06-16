import { useState, useEffect, useRef } from 'react';
import { Menu } from 'antd';
import { Search } from 'react-bootstrap-icons';

import { MailOutlined, SettingOutlined, AppstoreOutlined } from '@ant-design/icons';
function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  export default function Mpsidebar() {
    const [selectedItem, setSelectedItem] = useState('Navigation One');
    const items = [
      getItem('Navigation One', 'sub1', <MailOutlined />),
      getItem('Navigation Two', 'sub2', <AppstoreOutlined />),
      getItem('Navigation Three', 'sub3', <SettingOutlined />),
    ];
  
    const handleMenuItemClick = (key) => {
      setSelectedItem(key);
    };
  
    return (
      <div style={{ display: 'flex' }}>
        <div className="mpsidebar">
          <div className="mpsidebar-menu" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['sub1']}
              selectedKeys={[selectedItem]}
              onClick={({ key }) => handleMenuItemClick(key)}
              style={{ width: 300 }}
            >
              {items.map((item) => (
                <Menu.Item key={item.key} icon={item.icon} style={{ fontSize: '18px', height: 100 }}>
                  {item.label}
                </Menu.Item>
              ))}
            </Menu>
          </div>
  
          <div className="mpsidebar-main">
            <footer className="mpsidebar-footer">
              <div>Information</div>
              <div>ABOUT US</div>
              <div>이용약관</div>
              <div>개인정보 취급방침</div>
              <div>이메일 무단수집거부</div>
              <div>CONTACT US</div>
            </footer>
          </div>
        </div>
  
        <div className="main-content" style={{ flex: 1 }}>
          {selectedItem === 'sub1' && (
            <div>
              <p>Navigation One의 내용입니다.</p>
            </div>
          )}
          {selectedItem === 'sub2' && (
            <div>
              <p>Navigation Two의 내용입니다.</p>
            </div>
          )}
          {selectedItem === 'sub3' && (
            <div>
              <p>Navigation Three의 내용입니다.</p>
            </div>
          )}
        </div>
      </div>
    );
  }