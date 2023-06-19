import { useState, useEffect, useRef } from 'react';
import { Menu } from 'antd';
import { Search, PlusCircle  } from 'react-bootstrap-icons';
import { MailOutlined, SettingOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Network } from 'vis-network/';
import { DataSet } from 'vis-data/';
import { Button, Form, Input } from 'antd';

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
    const handlePasswordChange = (values) => {
      const { currentPassword, newPassword, confirmPassword } = values;
    
      // 현재 비밀번호, 새로운 비밀번호, 비밀번호 확인을 확인하고 로직을 구현합니다.
      if (currentPassword === '현재 비밀번호' && newPassword === confirmPassword) {
        // 비밀번호 변경 로직을 여기에 구현합니다.
        // 현재 비밀번호와 새로운 비밀번호를 사용하여 비밀번호를 변경하는 API 호출이나
        // 기타 비밀번호 변경 관련 작업을 수행합니다.
    
        // 비밀번호 변경이 성공적으로 완료되었을 때 사용자에게 알림을 보여줄 수 있습니다.
        message.success('비밀번호가 성공적으로 변경되었습니다.');
      } else {
        // 현재 비밀번호가 일치하지 않거나 새로운 비밀번호와 확인 비밀번호가 일치하지 않을 때 에러 처리를 수행합니다.
        message.error('비밀번호 변경에 실패했습니다. 입력한 정보를 확인해주세요.');
      }
    };
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
      <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
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
  
        <div className="main-content" >
            <div></div>
          {selectedItem === 'sub1' && (
            <div className='user_profile' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <p>Navigation One의 내용입니다.</p>
              <div>
                <div style={{ position: 'relative', width: '140px', height: '140px'}}>
                  <svg
                    className="bd-placeholder-img rounded-circle"
                    width="140"
                    height="140"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-label="Placeholder"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                    style={{
                      borderRadius: '50%',
                      border: '2px solid var(--bs-primary-color)',
                    }}
                  >
                    <title>Placeholder</title>
                    <rect width="100%" height="100%" fill="var(--bs-secondary-color)"></rect>
                  </svg>
                  {profileImage && (
                    <img
                      src={profileImage}
                      alt="프로필 사진"
                      style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', border: '2px solid var(--bs-primary-color)'}}
                    />
                  )}
                  <label htmlFor="profileImageUpload" style={{ position: 'absolute', bottom: '8px', right: '8px', cursor: 'pointer' }}>
                    <PlusCircle size={24} color="#ffffff" />
                  </label>
                  <input type="file" id="profileImageUpload" onChange={handleProfileImageUpload} style={{ display: 'none' }} />
                </div>
              </div>
              
              <div id="mynetwork" ></div>
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
              <div className ='PM_container' style={{marginLeft: '170px', marginTop:'150px', height: '1400px', width: '450px'}}>
                
              
                <div className= 'profile_modify' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <div className = 'profile_image' style={{ position: 'relative', height: '200px', width: '200px'}}>
                    <svg
                      className="bd-placeholder-img rounded-circle"
                      width="100%"
                      height="100%"
                      xmlns="http://www.w3.org/2000/svg"
                      role="img"
                      aria-label="Placeholder"
                      preserveAspectRatio="xMidYMid slice"
                      focusable="false"
                      style={{
                        borderRadius: '50%',
                        border: '2px solid var(--bs-primary-color)',
                        fill: 'black',
                      }}
                    >
                      <title>Placeholder</title>
                      <rect width="100%" height="100%" fill="skyblue"></rect>
                    </svg>
                    {profileImage && (
                      <img
                        src={profileImage}
                        alt="프로필 사진"
                        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', border: '2px solid var(--bs-primary-color)'}}
                      />
                    )}
                    <label htmlFor="profileImageUpload" style={{ position: 'absolute', bottom: '8px', right: '8px', cursor: 'pointer' }}>
                      <PlusCircle size={24} color="black" />
                    </label>
                    <input type="file" id="profileImageUpload" onChange={handleProfileImageUpload} style={{ display: 'none' }} />
                  </div>
                </div>
                <Form
                  name="changePassword"
                  onFinish={handlePasswordChange}
                  labelCol={{
                    flex: '110px',
                  }}
                  labelAlign="left"
                  labelWrap
                  wrapperCol={{
                    flex: 1,
                  }}
                  colon={false}
                  style={{
                    maxWidth: 600,
                    marginTop: '50px',
                    height: '50%'
                  }}
                >
                  <Form.Item
                    label="닉네임"
                    name="nickname"
                    rules={[
                      {
                        required: true,
                        message: '닉네임을 입력해주세요.',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="현재 비밀번호"
                    name="currentPassword"
                    rules={[
                      {
                          required: true,
                          message: '현재 비밀번호를 입력해주세요.',
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    label="새로운 비밀번호"
                    name="newPassword"
                    rules={[
                      {
                        required: true,
                        message: '새로운 비밀번호를 입력해주세요.',
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    label="비밀번호 확인"
                    name="confirmPassword"
                    dependencies={['newPassword']}
                    rules={[
                      {
                        required: true,
                        message: '비밀번호 확인을 입력해주세요.',
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('newPassword') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('비밀번호가 일치하지 않습니다.'));
                        },
                      }),
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item label=" ">
                    <div style={{ marginTop: '30px', display: 'flex', marginLeft: '-110px', justifyContent: 'center', alignItems: 'center' }}>
                      <Button type="primary" htmlType="submit" style={{ marginRight: '30px' }}>
                        modify
                      </Button>
                      <Button type="primary" htmlType="submit">
                        cancel
                      </Button>
                    </div>
                  </Form.Item>
                </Form>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }