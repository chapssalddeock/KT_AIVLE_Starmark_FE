import React, { useState } from 'react';
import MpSideBar from '../MyPageSideBar/MpSideBar';
import MpMain from '../MypageMain/MpMain';

import { Layout } from 'antd';
const { Content, Sider } = Layout;
import MyInfo from '../MypageMain/MyInfo'
import MyFollows from '../MypageMain/MyFollows';
import MyDashBoard from '../MypageMain/MyDashBoard';


export default function MpContentArea() {
    const [selectedItem, setSelectedItem] = useState('sub1');
    const handleMenuClick = (key) => {
        setSelectedItem(key);
    };


    return (
        <Layout style={{ marginTop: 2 }}>
            <Layout>
                <Sider width={300} style={{ color: "white", boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.1)' }}>
                    <MpSideBar handleMenuItemClick={handleMenuClick} />
                </Sider>
                <Layout style={{ padding: '0 24px 24px', backgroundColor: "white" }}>
                    <Content style={{ padding: 4, margin: 0, }}>
                        {selectedItem === 'sub1' && <MyInfo style={{ padding: 4, margin: 0, }} />}
                        {selectedItem === 'sub2' && <MyFollows style={{ padding: 4, margin: 0, }} />}
                        {selectedItem === 'sub4' && <MyDashBoard style={{ padding: 4, margin: 0, }} />}
                        {/* selectedItem에 따라 메뉴 이동 */}
                    </Content>
                </Layout>
            </Layout>
        </Layout >
    );
};


{/* <div style={{ marginTop: '-125px', width: '60%', height: '60%' }}>
                        {selectedItem === 'sub1' && (
                            <img src='img/UserProfile.png' style={{ width: '100%', height: '100%' }} />
                        )}
                        {selectedItem === 'sub3' && (
                            <img src='img/PassWordModify.png' style={{ width: '100%', height: '100%' }} />
                        )}
                    </div>
                    <Content style={{ padding: 24, marginTop: '-150px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {selectedItem === 'sub1' && (

                            <div className='Box_user' style={{ border: '10px outset skyblue', borderRadius: '15px', width: '70%', height: '90%', overflow: 'hidden' }}>
                                <MpMain selectedItem={selectedItem} />
                            </div>
                        )}

                        {selectedItem === 'sub3' && (
                            <div className='Box_user' style={{ border: '10px outset skyblue', borderRadius: '15px', width: '70%', height: '90%' }}>
                                <MpMain selectedItem={selectedItem} />
                            </div>
                        )}

                        {selectedItem !== 'sub1' && selectedItem !== 'sub3' && (
                            <MpMain selectedItem={selectedItem} />
                        )}
                    </Content> */}