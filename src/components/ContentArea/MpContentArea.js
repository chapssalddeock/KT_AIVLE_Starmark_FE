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
import { Layout } from 'antd';
const { Content, Sider } = Layout;
export default function MpContentArea() {
    const [selectedItem, setSelectedItem] = useState('sub1');
    const handleMenuClick  = (key) => {
      setSelectedItem(key);
    };


    return (
        <Layout style={{ margin: 0, height: "calc(100vh - 76px)", }}>
            <Layout>
                <Sider width={300} style={{ color: "white", }}>
                    <MpSideBar handleMenuItemClick={handleMenuClick} />
                </Sider>
                <Layout style={{ padding: '0 24px 24px', }}>
                    <div style={{ margin: '16px 0  ', }}>
                        {/* 메뉴바 필요없으니 날림 */}
                    </div>
                    <Content style={{ padding: 24, margin: 0, }}>
                        
                        <MpMain selectedItem={selectedItem} />
                        {/* 컨텐츠 영역에 들어갈 것은 소셜 리스트뷰로 따로 파야함 */}
                        {/* 소셜 리스트뷰에 유저 프사나 닉네임 누르면 Drawer 뜨게 하기 */}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};
