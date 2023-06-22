import { useState, useEffect, useRef } from 'react';
import { Menu, Modal } from 'antd';
import { Search, PlusCircle  } from 'react-bootstrap-icons';
import { UserOutlined, LockOutlined, TeamOutlined, PieChartOutlined } from '@ant-design/icons';
import { Network } from 'vis-network/';
import { DataSet } from 'vis-data/';
import { Button, Form, Input } from 'antd';
import { useSpring, animated, config } from 'react-spring';

function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  export default function MpSideBar ( { handleMenuItemClick } ) {
    
    const items = [
      getItem('User', 'sub1', <UserOutlined />),
      getItem('Follow', 'sub2', <TeamOutlined />),
      getItem('Modify', 'sub3', <LockOutlined />),
      getItem('DashBoard', 'sub4', <PieChartOutlined />),
    ];
    const [selectedItem, setSelectedItem] = useState('sub1');
    const handleMenuClick  = (key) => {
      setSelectedItem(key); 
      handleMenuItemClick(key);
    };

    return (
      <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
        <div className="mpsidebar">
          <div className="mpsidebar-menu" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          
            <Menu
              mode="inline"
              defaultSelectedKeys={['sub1']}
              selectedKeys={[selectedItem]}
              onClick={({ key }) => handleMenuClick(key)}
              style={{ width: 300,  borderTop: '3px solid #f2f2f2' }}
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
              
              <div>개인정보 취급방침</div>
              
              <div>@ KT aivle  3rd, big-pjt, team 42</div>
            </footer>
          </div>
        </div>
      </div>
    );
  }