import { useState, useEffect, useRef } from 'react';
import { Menu, Modal } from 'antd';
import { Search, PlusCircle } from 'react-bootstrap-icons';
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
export default function MpSideBar({ handleMenuItemClick }) {

  const items = [
    getItem('User', 'sub1', <UserOutlined />),
    getItem('Follow', 'sub2', <TeamOutlined />),
    getItem('Modify', 'sub3', <LockOutlined />),
    getItem('DashBoard', 'sub4', <PieChartOutlined />),
  ];
  const [selectedItem, setSelectedItem] = useState('sub1');
  const handleMenuClick = (key) => {
    setSelectedItem(key);
    handleMenuItemClick(key);
  };

  return (
    <div className="mpsidebar">
      <Menu
        mode="inline"
        defaultSelectedKeys={['sub1']}
        selectedKeys={[selectedItem]}
        onClick={({ key }) => handleMenuClick(key)}
        style={{ width: 300, backgroundColor: '#363739' }}
      >
        {items.map((item) => (
          <Menu.Item key={item.key} icon={item.icon} style={{ fontSize: '18px', height: 80, color: 'white' }}>
            {item.label}
          </Menu.Item>
        ))}
      </Menu>


      <div className="mpsidebar-main">
        <footer className="mpsidebar-footer">
          <div className="additional_menu mt-4 p-3">
            <div className="links">
              <a href="#">About</a>
              <a href="#">개인정보보호방침</a>
            </div>
            <hr className="my-2 py-0 w-100" />
            <span>&copy; 2023 Aivle, 11, 42</span>
          </div>
        </footer>
      </div>
    </div>

  );
}