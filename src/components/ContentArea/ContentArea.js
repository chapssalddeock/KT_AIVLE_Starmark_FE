import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import React from 'react';
const { Header, Content, Sider } = Layout;
import ThumbnailView from '../ThumbnailView/ThumbnailView'
import SideBar from '../SideBar/SideBar'
import MenuBar from '../MenuButton/MenuButton';


export default function ContentArea() {


    return (
        <Layout style={{
            margin: 0,
            height: "calc(100vh - 76px)"//"calc(100vh - 153px)",

        }}>

            <Layout>
                {/* 찬규님 파트 */}
                <Sider
                    width={300}
                    style={{
                        color: "white",
                    }}
                >
                    <SideBar />

                </Sider>
                <Layout
                    style={{
                        padding: '0 24px 24px',
                    }}
                >
                    <div
                        style={{
                            margin: '16px 0  ',
                        }}
                    >
                        {/* 민성님 파트 */}
                        <MenuBar />
                    </div>
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            //height: "calc(100vh - 153px)",
                        }}
                    >
                        <ThumbnailView></ThumbnailView>

                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};
