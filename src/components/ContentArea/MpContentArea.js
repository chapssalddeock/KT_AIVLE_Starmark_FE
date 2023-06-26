import { useState, useEffect, useRef } from 'react';
import { Menu, Modal } from 'antd';
import { Search, PlusCircle  } from 'react-bootstrap-icons';
import { Network } from 'vis-network/';
import { DataSet } from 'vis-data/';
import { Button, Form, Input } from 'antd';
import { useSpring, animated, config } from 'react-spring';
import SocialListView from '../SocialListView/SocialListView';
import MpSideBar  from '../MyPageSideBar/MpSideBar';
import MpMain from '../MypageMain/MpMain';
import NavBar from '../navbar/NavBar2';
import MenuBar from '../MenuButton/MenuButton';
import { Layout } from 'antd';
const { Content, Sider } = Layout;
export default function MpContentArea() {
    const [selectedItem, setSelectedItem] = useState('sub1');
    const handleMenuClick  = (key) => {
      setSelectedItem(key);
    };


    return (
        <Layout style={{ marginTop: 0, height: "calc(100vh - 0px)", }}>
            <NavBar></NavBar>
            <Layout>
                <Sider width={300} style={{ color: "white", }}>
                    <MpSideBar handleMenuItemClick={handleMenuClick} />
                </Sider>
                <Layout style={{ padding: '0 25px 25px', }}>
                    <div style={{ marginTop:'-125px', width:'60%', height:'60%'}}>
                        {/* 메뉴바 필요없으니 날림 */}
                        {selectedItem === 'sub1' && (
                            <img src='img/UserProfile.png' style={{ width: '100%', height: '100%' }} />
                        )}
                        {selectedItem === 'sub3' && (
                            <img src='img/PassWordModify.png' style={{ width: '100%', height: '100%' }} />
                        )}
                    </div>
                    <Content style={{ padding: 24, marginTop: '-150px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {selectedItem === 'sub1' && (
                        
                        <div className='Box_user' style={{border: '10px outset skyblue', borderRadius: '15px', width: '70%', height: '90%', overflow: 'hidden'}}>
                            <MpMain selectedItem={selectedItem} />
                        </div>
                    )}

                    {selectedItem === 'sub3' && (
                        <div className='Box_user' style={{border: '10px outset skyblue', borderRadius: '15px', width: '70%', height: '90%'}}>
                            <MpMain selectedItem={selectedItem} />
                        </div>
                    )}

                    {selectedItem !== 'sub1' && selectedItem !== 'sub3' && (
                        <MpMain selectedItem={selectedItem} />
                    )}
                    
                        {/* 컨텐츠 영역에 들어갈 것은 소셜 리스트뷰로 따로 파야함 */}
                        {/* 소셜 리스트뷰에 유저 프사나 닉네임 누르면 Drawer 뜨게 하기 */}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};
