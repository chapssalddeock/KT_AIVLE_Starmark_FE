import { useState, useEffect, useRef } from 'react';
import { Menu, Modal } from 'antd';
import { Search, PlusCircle, SlCamera } from 'react-bootstrap-icons';
import { BsCamera } from 'react-icons/bs';
import { Network } from 'vis-network/';
import { DataSet } from 'vis-data/';
import { Button, Form, Input, Drawer, Radio, Space } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useSpring, animated, config } from 'react-spring';
import MpFollowView from '../MyPageFollow/MpFollow';
import MpSideBar from '../MyPageSideBar/MpSideBar';
import useGET from '../../axios/GET';

export default function MpMain({ selectedItem }) {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState('right');
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState('John Doe Han');
  const [editedUserName, setEditedUserName] = useState('');
  const { fetchData : getfetchData, data: getTagData, error: getTagError } = useGET();

  const handleEditButtonClick = () => {
    if (isEditing) {
      setUserName(editedUserName);
    }
    setIsEditing(!isEditing);
  };

  const handleUserNameChange = (e) => {
    setEditedUserName(e.target.value);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onChange = (e) => {
    setPlacement(e.target.value);
  };

  const onClose = () => {
    setOpen(false);
  };

  // 추가: 편집 버튼을 눌렀을 때 Drawer를 활성화
  const [userImage, setUserImage] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [tags, setTags] = useState([]);
  const [wordCounts, setWordCounts] = useState({});
  const handleProfileImageUpload = () => {
    const fileInput = document.getElementById('profileImageUpload');
    fileInput.click(); // 파일 선택 대화상자 열기
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setUserImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

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
  const networkRef = useRef();
  const springProps = useSpring({ opacity: 1, from: { opacity: 0 } });

  useEffect(() => {
    const container = document.getElementById('mynetwork');

    if (selectedItem === 'sub4') {
      const tags = Object.keys(wordCounts);
      const maxCount = Math.max(...Object.values(wordCounts));

      const nodesData = Object.keys(wordCounts).map((tag, index) => ({
        id: index + 1,
        label: tag,
        value: wordCounts[tag] / maxCount // 빈도수에 따라 Node의 크기 조절
      }));

      const nodes = new DataSet(nodesData);
      const edges = new DataSet([]);
      const data = { nodes, edges };
      const options = {};

      const network = new Network(container, data, options);
      networkRef.current = network;
      networkRef.current.on('click', (event) => {
        if (event.nodes.length > 0) {
          const nodeId = event.nodes[0];
          const selectedNode = nodes.get(nodeId);
          setSelectedNode(selectedNode);
          setIsModalOpen(true);
        }
      });

    } else {
      networkRef.current = null;
    }

  }, [selectedItem, wordCounts]);

  useEffect(() => {
    const fetchData = async () => {
      await getfetchData('/bookmark');
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (getTagData) {
      const tags = getTagData.map(item => item.tags).flat();
      const wordCounts = {};

      tags.forEach((tag) => {
        if (wordCounts[tag]) {
          wordCounts[tag] += 1;
        } else {
          wordCounts[tag] = 1;
        }
      });
      setWordCounts(wordCounts);
      setTags(tags);
      console.log('Tags:', tags);
    } else if (getTagError) {
      console.error(getTagError);
    }
  }, [getTagData, getTagError]);

  return (
    <>
      <div className="main-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '45%', height: '100vh' }} >

        {selectedItem === 'sub1' && (
          <div className='main' style={{ display: 'flex', marginLeft:'1000px', marginTop: '-300px', width: '100%', height: '90vh', justifyContent: 'center', alignItems: 'center' }}>

            <div className='user_container' style={{ flex: '1' }}>

              <div className='image_container' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                <div className='user_image' style={{ position: 'relative', height: '250px', width: '250px' }}>
                  <div style={{ position: 'relative', width: '200px', height: '200px' }}>
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
                      }}
                    >

                      <title>Placeholder</title>
                      <rect width="100%" height="100%" fill="skyblue"></rect>
                      {userImage && (
                        <image
                          href={userImage}
                          width="100%"
                          height="100%"
                          preserveAspectRatio="xMidYMid slice"
                        />
                      )}
                    </svg>
                    {profileImage && (
                      <img
                        src={profileImage}
                        alt="프로필 사진"
                        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', border: '2px solid var(--bs-primary-color)' }}
                      />
                    )}
                    <label htmlFor="profileImageUpload" style={{ position: 'absolute', bottom: '8px', right: '8px', cursor: 'pointer' }}>
                      <span
                        style={{
                          backgroundColor: 'white',
                          borderRadius: '50%',
                          display: 'inline-flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: '48px',
                          height: '48px',
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: 'white',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}

                        >
                          <BsCamera size={24} color="black" />
                        </div>
                      </span>
                      <input
                        id="profileImageUpload"
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleImageUpload}
                      />


                    </label>
                    <div className="user_info" style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
                      <div style={{ flex: '1', textAlign: 'center' }}>
                        {isEditing ? (
                          <Input value={editedUserName} onChange={handleUserNameChange} style={{ width: '120px' }} />
                        ) : (
                          <h4>{userName}</h4>
                        )}

                      </div>
                      <div className="edit_button" style={{ marginLeft: 'auto' }}>
                        <EditOutlined style={{ fontSize: '16px', color: 'black', cursor: 'pointer' }} onClick={handleEditButtonClick} />
                      </div>
                    </div>
                  </div>


                </div>
              </div>

            </div>
            <div className='userinfo' style={{ flex: '1.5' }}>
              <div>
                <div className='email' style={{ width: '800px' }}>



                  <Form
                    name="changePassword"
                    onFinish={handlePasswordChange}
                    labelCol={{
                      flex: '150px',
                    }}
                    labelAlign="left"
                    labelWrap
                    wrapperCol={{
                      flex: 1,
                    }}
                    colon={false}
                    style={{
                      maxWidth: 450,
                      marginTop: '50px',
                      height: '50%'
                    }}
                  >

                    <Form.Item
                      label="email"
                      name="currentPassword"
                      rules={[
                        {
                          required: true,

                        },
                      ]}
                    >

                    </Form.Item>

                    <Form.Item
                      label="북마크 수"
                      name="newPassword"
                      rules={[
                        {
                          required: true,

                        },
                      ]}
                    >

                    </Form.Item>

                    <Form.Item
                      label="팔로워 수"
                      name="confirmPassword"
                      dependencies={['newPassword']}
                      rules={[
                        {
                          required: true,

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

                    </Form.Item>

                    <Form.Item label=" ">
                      <div style={{ marginTop: '30px', display: 'flex', marginLeft: '-110px', justifyContent: 'center', alignItems: 'center' }}>

                      </div>
                    </Form.Item>
                  </Form>
                </div>
              </div>

            </div>
          </div>








        )}
        {selectedItem === 'sub2' && (
          <div style={{ marginLeft: '-150px', marginTop: '120px' }}>
            <MpFollowView></MpFollowView>
            {/* <p>표시 되나여?</p> */}
          </div>
        )}
        {selectedItem === 'sub3' && (
          <div>
            <div className='PM_container' style={{ marginLeft: '800px', marginTop: '870px', height: '1400px', width: '800px' }}>



              <Form
                name="changePassword"
                onFinish={handlePasswordChange}
                labelCol={{
                  flex: '150px',
                }}
                labelAlign="left"
                labelWrap
                wrapperCol={{
                  flex: 1,
                }}
                colon={false}
                style={{
                  maxWidth: 450,
                  marginTop: '50px',
                  height: '50%'
                }}
              >

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
                  <div style={{ marginTop: '30px', display: 'flex', marginLeft: '-150px', justifyContent: 'center', alignItems: 'center' }}>
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
        {selectedItem === 'sub4' && (

          <div className='user_container' style={{ marginLeft: '0px', marginTop: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div className='image_container' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <animated.div style={springProps}>
                <div id="mynetwork" style={{ border: '1px solid black', marginTop: '30px', position: 'relative', width: '1000px', height: '500px' }}></div>
              </animated.div>
            </div>
          </div>



        )}
      </div>
      <Drawer
        title="Drawer with extra actions"
        placement={placement}
        width={500}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >


        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
      <Modal
        visible={isModalOpen}
        onCancel={closeModal}
        onOk={closeModal}
        title={selectedNode ? selectedNode.label : ''}
      >
        {selectedNode && <p>Node ID: {selectedNode.id}</p>}
      </Modal>
    </>

  );
}