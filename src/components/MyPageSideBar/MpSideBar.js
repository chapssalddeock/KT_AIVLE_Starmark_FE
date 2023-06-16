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
    const [submenuHeight, setSubmenuHeight] = useState(150);
    const items = [
        getItem('Navigation One', 'sub1', <MailOutlined />),
        getItem('Navigation Two', 'sub2', <AppstoreOutlined />),
        getItem('Navigation Three', 'sub4', <SettingOutlined />),
    ];
    const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
    const handleMenuItemClick = (key) => {
        setSelectedItem(key);
    };
    const App = () => {
        const [openKeys, setOpenKeys] = useState(['sub1']);
        const onOpenChange = (keys) => {
            const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        
            if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
              setOpenKeys(keys);
            } else {
              setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
            }
          };
    

          return (
            <Menu
              mode="inline"
              openKeys={openKeys}
              onOpenChange={onOpenChange}
              style={{
                width: 300,
              }}
            >
              {items.map((item) => {
                if (item.children) {
                  return (
                    <Menu.SubMenu key={item.key} icon={item.icon} title={item.label} >
                      {item.children.map((child) => (
                        <Menu.Item key={child.key}>{child.label}</Menu.Item>
                      ))}
                    </Menu.SubMenu>
                  );
                }
        
                return (
                  <Menu.Item key={item.key} icon={item.icon} style={{  fontSize: '18px', height: 100 }}>
                    {item.label}
                  </Menu.Item>
                );
              })}
            </Menu>
          );
        };
    
        
    return (
        <div style = {{ display: 'flex' }}>
            <div className="mpsidebar">
                <div className="mpsidebar-menu" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <App />
                </div>

                <div className='mpsidebar-main'>
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
            <div class="main-content" style={{ flex: 1 }}>
                <div>
                    <p>여기는 임시로 만든 바디 영역입니다.</p>
                    <p>필요없고 보여주기 식입니다....</p>
                </div>
            </div> 
        </div>
    );
}