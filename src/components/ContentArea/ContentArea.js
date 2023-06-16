import { Layout, Menu, theme } from 'antd';
import React from 'react';
const { Content, Sider } = Layout;
import ThumbnailView from '../ThumbnailView/ThumbnailView'
import ListView from '../ListView/ListView'
import SideBar from '../SideBar/SideBar'
import MenuBar from '../MenuButton/MenuButton';


export default function ContentArea() {


    return (
        <Layout style={{ margin: 0, height: "calc(100vh - 76px)", }}>
            <Layout>
                <Sider width={300} style={{ color: "white", }}>
                    <SideBar />
                </Sider>
                <Layout style={{ padding: '0 24px 24px', }}>
                    <div style={{ margin: '16px 0  ', }}>
                        <MenuBar />
                    </div>
                    <Content style={{ padding: 24, margin: 0, }}>
                        <ThumbnailView></ThumbnailView>
                        {/* <ListView></ListView> */}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};
