import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import React from 'react';
const { Header, Content, Sider } = Layout;


export default function ContentArea() {


    return (
        <Layout>

            <Layout>
                <Sider
                    width={300}
                    style={{
                        color: "white",
                    }}
                >
                    여기가 찬규님

                </Sider>
                <Layout
                    style={{
                        padding: '0 24px 24px',
                    }}
                >
                    <div
                        style={{
                            margin: '16px 0',
                        }}
                    >
                        여기는 민성님

                    </div>
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: '568px',

                        }}
                    >
                        Content
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};
