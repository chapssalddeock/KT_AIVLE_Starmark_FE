import { useState, useEffect, useRef } from 'react';
import { Menu } from 'antd';
import { Search } from 'react-bootstrap-icons';
import { MailOutlined, SettingOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Network } from 'vis-network/';
import { DataSet } from 'vis-data/';


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
    const [profileImage, setProfileImage] = useState(null);
    const [selectedItem, setSelectedItem] = useState('Navigation One');
    const handleProfileImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
    
        reader.onloadend = () => {
          setProfileImage(reader.result);
        };
    
        if (file) {
          reader.readAsDataURL(file);
        }
    };
    const items = [
      getItem('Profile', 'sub1', <MailOutlined />),
      getItem('Follow', 'sub2', <AppstoreOutlined />),
      getItem('Interest', 'sub3', <SettingOutlined />),
    ];
  
    const handleMenuItemClick = (key) => {
      setSelectedItem(key);
    };
    const networkRef = useRef();
    useEffect(() => {
        const container = document.getElementById('mynetwork');
        const container2 = document.getElementById('mynetwork_2');
      
        if (selectedItem === 'sub1') {
          const nodes = new DataSet([
            { id: 1, label: 'Node 1' },
            { id: 2, label: 'Node 2' },
            { id: 3, label: 'Node 3' },
            { id: 4, label: 'Node 4' },
            { id: 5, label: 'Node 5' },
          ]);
      
          const edges = new DataSet([
            { from: 1, to: 3 },
            { from: 1, to: 2 },
            { from: 2, to: 4 },
            { from: 2, to: 5 },
            { from: 3, to: 3 },
          ]);
      
          const data = {
            nodes: nodes,
            edges: edges,
          };
      
          const options = {};
      
          if (container) {
            if (!networkRef.current) {
              networkRef.current = new Network(container, data, options);
            } else {
              networkRef.current.setData(data);
            }
          }
      
          if (container2 && networkRef.current) {
            networkRef.current.destroy();
          }
        } else if (selectedItem === 'sub2') {
          const nodes = new DataSet([
            { id: 1, label: 'Node 1' },
            { id: 2, label: 'Node 2' },
            { id: 3, label: 'Node 3' },
            { id: 4, label: 'Node 4' },
            { id: 5, label: 'Node 5' },
          ]);
      
          const edges = new DataSet([
            { from: 1, to: 3 },
            { from: 1, to: 2 },
            { from: 2, to: 4 },
            { from: 2, to: 5 },
            { from: 3, to: 3 },
          ]);
      
          const data = {
            nodes: nodes,
            edges: edges,
          };
      
          const options = {};
      
          if (container2) {
            if (!networkRef.current) {
              networkRef.current = new Network(container2, data, options);
            } else {
              networkRef.current.setData(data);
            }
          }
      
          if (container && networkRef.current) {
            networkRef.current.destroy();
          }
        } else {
          if (container && networkRef.current) {
            networkRef.current.destroy();
          }
      
          if (container2 && networkRef.current) {
            networkRef.current.destroy();
          }
        }
      }, [selectedItem]);
    
    
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
            <p> 여기가 무엇일까요?</p>
          {selectedItem === 'sub1' && (
            <div>
              <p>Navigation One의 내용입니다.</p>
              {profileImage ? (
              <img src={profileImage} alt="프로필 사진" />
                ) : (
              <div>
                <svg class="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="var(--bs-secondary-color)"></rect></svg>
                <p>프로필 사진을 업로드하세요.</p>
                <input type="file" onChange={handleProfileImageUpload} />
              </div>
                )}
              <div id="mynetwork"></div>
            </div>
          )}
          {selectedItem === 'sub2' && (
            <div>
              <p>Navigation Two의 내용입니다.</p>
              <div id="mynetwork_2"></div>
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